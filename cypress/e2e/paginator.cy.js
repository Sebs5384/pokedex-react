describe("Paginator interaction testing", () => {
    const localHost = "http://localhost:3000";
    const POKEMONS_PER_PAGE = 20;
    
    const getOffset = (currentPage, POKEMONS_PER_PAGE) => {
        return (currentPage - 1) * POKEMONS_PER_PAGE
    };
    const pageUrl = (limit, offset) => {
        return `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    };

    const requestUrl = (offset, limit, slash = "") => {
        return `https://pokeapi.co/api/v2/pokemon${slash}?offset=${offset}&limit=${limit}`  
    };

    beforeEach(() => {
        cy.visit(localHost);
        window.localStorage.clear();
    });
    
    it("Should paginate through the app back and forth", () => {
        cy.intercept("GET", pageUrl(POKEMONS_PER_PAGE, getOffset(1, POKEMONS_PER_PAGE)), (req) => {
            req.reply({
                fixture: "pokedexFirstPage.json"
            });
        }).as("paginatorFirstPage");

        cy.intercept("GET", pageUrl(POKEMONS_PER_PAGE, getOffset(2, POKEMONS_PER_PAGE)), (req) => {
            req.reply({
                fixture: "pokedexSecondPage.json"
            });
        }).as("paginatorSecondPage");

        cy.intercept("GET", pageUrl(POKEMONS_PER_PAGE, getOffset(3, POKEMONS_PER_PAGE)), (req) => {
            req.reply({
                fixture: "pokedexThirdPage.json"
            });
        }).as("paginatorThirdPage");

        cy.intercept("GET", pageUrl(POKEMONS_PER_PAGE, getOffset(4, POKEMONS_PER_PAGE)), (req) => {
            req.reply({
                fixture: "pokedexFourthPage.json"
            });
        }).as("paginatorFourthPage");

        cy.intercept("GET", pageUrl(POKEMONS_PER_PAGE, getOffset(5, POKEMONS_PER_PAGE)), (req) => {
            req.reply({
                fixture: "pokedexFifthPage.json"
            });
        }).as("paginatorFifthPage");

        cy.get("[data-cy='pagination-section']").should("exist").then(() => {
            cy.get("[data-cy='paginator-next-button']").as("paginatorNextButton").should("exist");
            cy.get("[data-cy='paginator-previous-button']").as("paginatorPreviousButton").should("exist");

            cy.get("[data-cy='page-1']").as("firstPage").should("exist");
            cy.get("[data-cy='page-2']").as("secondPage").should("exist");
            cy.get("[data-cy='page-3']").as("thirdPage").should("exist");
            cy.get("[data-cy='page-4']").as("fourthPage").should("exist");
            cy.get("[data-cy='page-5']").as("fifthPage").should("exist");
            cy.get("[data-cy='page-6']").as("sixthPage").should("exist");
            cy.get("[data-cy='page-7']").as("seventhPage").should("exist");

           
            cy.wait("@paginatorFirstPage").then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
                expect(interception.response.body.next).to.eq(requestUrl(getOffset(2, POKEMONS_PER_PAGE), POKEMONS_PER_PAGE, "/"));
                expect(interception.response.body.previous).to.eq(null);
                
                cy.get("@paginatorPreviousButton").should("have.class", "disabled");
                cy.get("@firstPage").should("be.visible");
                cy.get("@secondPage").should("be.visible");
                cy.get("@thirdPage").should("be.visible");
                cy.get("@fourthPage").should("not.be.visible");
                cy.get("@fifthPage").should("not.be.visible");
                cy.get("@sixthPage").should("not.be.visible");
                cy.get("@seventhPage").should("not.be.visible");
            }); 
        });

        cy.get("@paginatorNextButton").should("be.visible").then(() => {
            cy.get("@paginatorNextButton").click();

            cy.wait("@paginatorSecondPage").then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
                expect(interception.response.body.next).to.eq(requestUrl(getOffset(3, POKEMONS_PER_PAGE), POKEMONS_PER_PAGE, "/"));
                expect(interception.response.body.previous).to.eq(requestUrl(getOffset(1, POKEMONS_PER_PAGE), POKEMONS_PER_PAGE, "/"));
                
                cy.get("@paginatorPreviousButton").should("not.have.class", "disabled");
                cy.get("@firstPage").should("be.visible");
                cy.get("@secondPage").should("be.visible");
                cy.get("@thirdPage").should("be.visible");
                cy.get("@fourthPage").should("be.visible"); 
                cy.get("@fifthPage").should("not.be.visible");
                cy.get("@sixthPage").should("not.be.visible");
                cy.get("@seventhPage").should("not.be.visible");
            });

            cy.get("@paginatorNextButton").click();

            cy.wait("@paginatorThirdPage").then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
                expect(interception.response.body.next).to.eq(requestUrl(getOffset(4, POKEMONS_PER_PAGE), POKEMONS_PER_PAGE));
                expect(interception.response.body.previous).to.eq(requestUrl(getOffset(2, POKEMONS_PER_PAGE), POKEMONS_PER_PAGE));
                
                cy.get("@paginatorPreviousButton").should("not.have.class", "disabled");
                cy.get("@firstPage").should("be.visible");
                cy.get("@secondPage").should("be.visible");
                cy.get("@thirdPage").should("be.visible");
                cy.get("@fourthPage").should("be.visible"); 
                cy.get("@fifthPage").should("be.visible");
                cy.get("@sixthPage").should("not.be.visible");
                cy.get("@seventhPage").should("not.be.visible");
            });

            cy.get("@paginatorNextButton").click();
        
            cy.wait("@paginatorFourthPage").then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
                expect(interception.response.body.next).to.eq(requestUrl(getOffset(5, POKEMONS_PER_PAGE), POKEMONS_PER_PAGE));
                expect(interception.response.body.previous).to.eq(requestUrl(getOffset(3, POKEMONS_PER_PAGE), POKEMONS_PER_PAGE));
                
                cy.get("@paginatorPreviousButton").should("not.have.class", "disabled");
                cy.get("@firstPage").should("not.be.visible");
                cy.get("@secondPage").should("be.visible");
                cy.get("@thirdPage").should("be.visible");
                cy.get("@fourthPage").should("be.visible"); 
                cy.get("@fifthPage").should("be.visible");
                cy.get("@sixthPage").should("be.visible");
                cy.get("@seventhPage").should("not.be.visible");
            });

            cy.get("@paginatorNextButton").click();

            cy.wait("@paginatorFifthPage").then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
                expect(interception.response.body.next).to.eq(requestUrl(getOffset(6, POKEMONS_PER_PAGE), POKEMONS_PER_PAGE));
                expect(interception.response.body.previous).to.eq(requestUrl(getOffset(4, POKEMONS_PER_PAGE), POKEMONS_PER_PAGE));
                
                cy.get("@paginatorPreviousButton").should("not.have.class", "disabled");
                cy.get("@firstPage").should("not.be.visible");
                cy.get("@secondPage").should("not.be.visible");
                cy.get("@thirdPage").should("be.visible");
                cy.get("@fourthPage").should("be.visible"); 
                cy.get("@fifthPage").should("be.visible");
                cy.get("@sixthPage").should("be.visible");
                cy.get("@seventhPage").should("be.visible");
            });

            cy.get("@paginatorPreviousButton").click().then(() => {
                cy.window().its("localStorage").then((localStorage) => {
                    const fourthPageData = localStorage.getItem("pokemons_20_60");
                    const parsedFourthPageData = JSON.parse(fourthPageData);
                    expect(fourthPageData).not.to.be.null;
                    expect(parsedFourthPageData.next).to.eq(requestUrl(getOffset(5, POKEMONS_PER_PAGE), POKEMONS_PER_PAGE));
                    expect(parsedFourthPageData.previous).to.eq(requestUrl(getOffset(3, POKEMONS_PER_PAGE), POKEMONS_PER_PAGE));
                });

                cy.get("@paginatorPreviousButton").should("not.have.class", "disabled");
                cy.get("@firstPage").should("not.be.visible");
                cy.get("@secondPage").should("be.visible");
                cy.get("@thirdPage").should("be.visible");
                cy.get("@fourthPage").should("be.visible"); 
                cy.get("@fifthPage").should("be.visible");
                cy.get("@sixthPage").should("be.visible");
                cy.get("@seventhPage").should("not.be.visible");
            });

            cy.get("@paginatorPreviousButton").click().then(() => {
                cy.window().its("localStorage").then((localStorage) => {
                    const thirdPageData = localStorage.getItem("pokemons_20_40");
                    const parsedThirdPageData = JSON.parse(thirdPageData);
                    expect(thirdPageData).not.to.be.null;
                    expect(parsedThirdPageData.next).to.eq(requestUrl(getOffset(4, POKEMONS_PER_PAGE), POKEMONS_PER_PAGE));
                    expect(parsedThirdPageData.previous).to.eq(requestUrl(getOffset(2, POKEMONS_PER_PAGE), POKEMONS_PER_PAGE));
                });

                cy.get("@paginatorPreviousButton").should("not.have.class", "disabled");
                cy.get("@firstPage").should("be.visible");
                cy.get("@secondPage").should("be.visible");
                cy.get("@thirdPage").should("be.visible");
                cy.get("@fourthPage").should("be.visible"); 
                cy.get("@fifthPage").should("be.visible");
                cy.get("@sixthPage").should("not.be.visible");
                cy.get("@seventhPage").should("not.be.visible");
            });

            cy.get("@paginatorPreviousButton").click().then(() => {
                cy.window().its("localStorage").then((localStorage) => {
                    const secondPageData = localStorage.getItem("pokemons_20_20");
                    const parsedSecondPageData = JSON.parse(secondPageData);
                    expect(secondPageData).not.to.be.null;
                    expect(parsedSecondPageData.next).to.eq(requestUrl(getOffset(3, POKEMONS_PER_PAGE), POKEMONS_PER_PAGE, "/"));
                    expect(parsedSecondPageData.previous).to.eq(requestUrl(getOffset(1, POKEMONS_PER_PAGE), POKEMONS_PER_PAGE, "/"));
                });

                cy.get("@paginatorPreviousButton").should("not.have.class", "disabled");
                cy.get("@firstPage").should("be.visible");
                cy.get("@secondPage").should("be.visible");
                cy.get("@thirdPage").should("be.visible");
                cy.get("@fourthPage").should("be.visible"); 
                cy.get("@fifthPage").should("not.be.visible");
                cy.get("@sixthPage").should("not.be.visible");
                cy.get("@seventhPage").should("not.be.visible");
            });

            cy.get("@paginatorPreviousButton").click().then(() => {
                cy.window().its("localStorage").then((localStorage) => {
                    const firstPageData = localStorage.getItem("pokemons_20_0");
                    const parsedFirstPageData = JSON.parse(firstPageData);
                    expect(firstPageData).not.to.be.null;
                    expect(parsedFirstPageData.next).to.eq(requestUrl(getOffset(2, POKEMONS_PER_PAGE), POKEMONS_PER_PAGE, "/"));
                    expect(parsedFirstPageData.previous).to.eq(null);
                });
                
                cy.get("@paginatorPreviousButton").should("have.class", "disabled");
                cy.get("@firstPage").should("be.visible");
                cy.get("@secondPage").should("be.visible");
                cy.get("@thirdPage").should("be.visible");
                cy.get("@fourthPage").should("not.be.visible"); 
                cy.get("@fifthPage").should("not.be.visible");
                cy.get("@sixthPage").should("not.be.visible");
                cy.get("@seventhPage").should("not.be.visible");
            });
        });
    });

    it("Should jump from one page to another by using the page buttons", () => {
        cy.intercept("GET", pageUrl(POKEMONS_PER_PAGE, getOffset(1, POKEMONS_PER_PAGE)), (req) => {
            req.reply({
                fixture: "pokedexFirstPage.json"
            });
        }).as("paginatorFirstPage");

        cy.intercept("GET", pageUrl(POKEMONS_PER_PAGE, getOffset(3, POKEMONS_PER_PAGE)), (req) => {
            req.reply({
                fixture: "pokedexThirdPage.json"
            });
        }).as("paginatorThirdPage");

        cy.wait("@paginatorFirstPage").then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            expect(interception.response.body.next).to.eq(requestUrl(getOffset(2, POKEMONS_PER_PAGE), POKEMONS_PER_PAGE, "/"));
            expect(interception.response.body.previous).to.eq(null);
        });

        cy.get("[data-cy='pagination-section']").as("paginationSection").should("exist").then(() => {
            cy.get("[data-cy='paginator-next-button']").as("paginatorNextButton").should("exist");
            cy.get("[data-cy='paginator-previous-button']").as("paginatorPreviousButton").should("exist").and("have.class", "disabled");
            cy.get("[data-cy='page-1']").as("firstPage").should("exist").and("be.visible");
            cy.get("[data-cy='page-2']").as("secondPage").should("exist").and("be.visible");
            cy.get("[data-cy='page-3']").as("thirdPage").should("exist").and("be.visible");
            cy.get("[data-cy='page-4']").as("fourthPage").should("exist").and("not.be.visible");
            cy.get("[data-cy='page-5']").as("fifthPage").should("exist").and("not.be.visible");

            cy.get("@thirdPage").click();

            cy.wait("@paginatorThirdPage").then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
                expect(interception.response.body.next).to.eq(requestUrl(getOffset(4, POKEMONS_PER_PAGE), POKEMONS_PER_PAGE));
                expect(interception.response.body.previous).to.eq(requestUrl(getOffset(2, POKEMONS_PER_PAGE), POKEMONS_PER_PAGE));
                
                cy.get("@paginatorPreviousButton").should("not.have.class", "disabled");
                cy.get("@firstPage").should("be.visible");
                cy.get("@secondPage").should("be.visible");
                cy.get("@thirdPage").should("be.visible");
                cy.get("@fourthPage").should("be.visible"); 
                cy.get("@fifthPage").should("be.visible");
            });
            
            cy.get("@firstPage").click();

            cy.wait("@paginatorFirstPage").then((interception) => {
                const firstPageData = localStorage.getItem("pokemons_20_0");
                const parsedFirstPageData = JSON.parse(firstPageData);
                expect(firstPageData).not.to.be.null;
                expect(parsedFirstPageData.next).to.eq(requestUrl(getOffset(2, POKEMONS_PER_PAGE), POKEMONS_PER_PAGE, "/"));
                expect(parsedFirstPageData.previous).to.eq(null);
                
                cy.get("@paginatorPreviousButton").should("have.class", "disabled");
                cy.get("@firstPage").should("be.visible");
                cy.get("@secondPage").should("be.visible");
                cy.get("@thirdPage").should("be.visible");
                cy.get("@fourthPage").should("not.be.visible"); 
                cy.get("@fifthPage").should("not.be.visible");
            });
        })
    });

    it("Should jump to the last page using the paginator searchbox and then go back to the first page", () => {
        cy.intercept("GET", pageUrl(POKEMONS_PER_PAGE, getOffset(1, POKEMONS_PER_PAGE)), (req) => {
            req.reply({
                fixture: "pokedexFirstPage.json"
            });
        }).as("paginatorFirstPage");

        cy.intercept("GET", pageUrl(POKEMONS_PER_PAGE, getOffset(66, POKEMONS_PER_PAGE)), (req) => {
            req.reply({
                fixture: "pokedexLastPage.json"
            });
        }).as("paginatorLastPage");

        cy.get("[data-cy='pagination-section']").as("paginationSection").should("exist").then(() => {
            cy.get("[data-cy='paginator-searchbox']").as("paginatorSearchbox").should("exist");
            cy.get("[data-cy='paginator-previous-button']").as("paginatorPreviousButton").should("exist").and("have.class", "disabled");
            cy.get("[data-cy='paginator-next-button']").as("paginatorNextButton").should("exist").and("not.have.class", "disabled");
            cy.get("[data-cy='page-1']").as("firstPage").should("exist").and("be.visible");
            cy.get("[data-cy='page-64']").as("sixtyFourthPage").should("exist").and("not.be.visible");
            cy.get("[data-cy='page-65']").as("sixtyFifthPage").should("exist").and("not.be.visible");
            cy.get("[data-cy='page-66']").as("lastPage").should("exist").and("not.be.visible");

            cy.get("@paginatorSearchbox").click().then(() => {
                cy.get("@paginatorSearchbox").type("66{enter}");

                cy.wait("@paginatorLastPage").then((interception) => {
                    expect(interception.response.statusCode).to.eq(200);
                    expect(interception.response.body.next).to.eq(null);
                    expect(interception.response.body.previous).to.eq(requestUrl(getOffset(65, POKEMONS_PER_PAGE), POKEMONS_PER_PAGE, "/"));
                    expect(interception.response.body.results.length).to.eq(2);
                });

                cy.get("@paginatorPreviousButton").should("not.have.class", "disabled");
                cy.get("@paginatorNextButton").should("have.class", "disabled");
                cy.get("@firstPage").should("exist").and("not.be.visible");
                cy.get("@sixtyFourthPage").should("exist").and("be.visible");
                cy.get("@sixtyFifthPage").should("exist").and("be.visible");
                cy.get("@lastPage").should("exist").and("be.visible");
            })

            cy.get("@paginatorSearchbox").clear();

            cy.get("@paginatorSearchbox").click().then(() => {
                cy.get("@paginatorSearchbox").type("1{enter}");

                cy.wait("@paginatorFirstPage").then((interception) => {
                    expect(interception.response.statusCode).to.eq(200);
                    expect(interception.response.body.next).to.eq(requestUrl(getOffset(2, POKEMONS_PER_PAGE), POKEMONS_PER_PAGE, "/"));
                    expect(interception.response.body.previous).to.eq(null);
                    expect(interception.response.body.results.length).to.eq(20);
                });

                cy.get("@paginatorPreviousButton").should("have.class", "disabled");
                cy.get("@paginatorNextButton").should("not.have.class", "disabled");
                cy.get("@firstPage").should("exist").and("be.visible");
                cy.get("@sixtyFourthPage").should("exist").and("not.be.visible");
                cy.get("@sixtyFifthPage").should("exist").and("not.be.visible");
                cy.get("@lastPage").should("exist").and("not.be.visible");
            });
        });
    });

    it("Should display no pages and error card while the server responds with internal server errors", () => {
        cy.intercept("GET", pageUrl(POKEMONS_PER_PAGE, getOffset(1, POKEMONS_PER_PAGE)), (req) => {
            req.reply({
                statusCode: 500
            });
        }).as("paginatorFirstPageError");

        cy.intercept("GET", pageUrl(POKEMONS_PER_PAGE, getOffset(2, POKEMONS_PER_PAGE)), (req) => {
            req.reply({
                statusCode: 500 
            });
        }).as("paginatorSecondPageError");

        cy.wait("@paginatorFirstPageError").then((interception) => {
            expect(interception.response.statusCode).to.eq(500);
            expect(interception.response.body).to.eq('');
            expect(interception.response.body.results).to.eq(undefined);
        });

        cy.intercept("GET", pageUrl(POKEMONS_PER_PAGE, getOffset(1, POKEMONS_PER_PAGE)), (req) => {
            req.reply({
                fixture: "pokedexFirstPage.json"
            });
        }).as("paginatorFirstPage");

        cy.get("[data-cy='error-message-modal']").as("errorMessage").should("exist").and("be.visible");
        cy.get("@errorMessage").find("button").then(($button) => {
            cy.wrap($button).click({force: true});
        });

        cy.get("[data-cy='grid-section']").as("gridSection").should("exist").and("be.visible");
        cy.get("[data-cy='grid-board']").as("gridBoard").should("exist").then(() => {
            cy.get("[data-cy='grid-error-card']").as("errorCard").should("exist").and("be.visible");
            cy.get("@errorCard").find("strong").should("have.length", 1);
            cy.get("@errorCard").find("strong").should("not.have.text", "#1 Bulbasaur");
        });

        cy.get("[data-cy='pagination-section']").as("paginationSection").should("exist").then(() => {
            cy.get("[data-cy='paginator-previous-button']").as("previousButton").should("exist").and("be.visible");
            cy.get("[data-cy='paginator-next-button']").as("nextButton").should("exist").and("be.visible");
            cy.get("@previousButton").should("have.class", "disabled");
            cy.get("@nextButton").should("not.have.class", "disabled");
            cy.get("@paginationSection").find("a").should("have.length", 2);
            cy.get("[data-cy='page-1']").should("not.exist");
            cy.get("[data-cy='page-2']").should("not.exist");
            cy.get("[data-cy='page-3']").should("not.exist");
        });

        cy.get("@nextButton").click({force: true});

        cy.wait("@paginatorSecondPageError").then((interception) => {
            expect(interception.response.statusCode).to.eq(500);
            expect(interception.response.body).to.eq('');
            expect(interception.response.body.results).to.eq(undefined);
        });

        cy.get("@errorMessage").should("exist").and("be.visible");
        cy.get("@errorMessage").find("button").then(($button) => {
            cy.wrap($button).click();
        });

        cy.get("@gridBoard").should("exist").then(() => {
            cy.get("@errorCard").should("exist").and("be.visible");
            cy.get("@errorCard").find("strong").should("have.length", 1);
            cy.get("@errorCard").find("strong").should("not.have.text", "#21 Spearow");
        });

        cy.get("@paginationSection").should("exist").then(() => {
            cy.get("@previousButton").should("exist").and("be.visible");
            cy.get("@nextButton").should("exist").and("be.visible");
            cy.get("@previousButton").should("not.have.class", "disabled");
            cy.get("@nextButton").should("not.have.class", "disabled");
            cy.get("@paginationSection").find("a").should("have.length", 2);
            cy.get("[data-cy='page-1']").should("not.exist");
            cy.get("[data-cy='page-2']").should("not.exist");
            cy.get("[data-cy='page-3']").should("not.exist");
        });

        cy.get("@previousButton").click({force: true});

        cy.wait("@paginatorFirstPage").then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            expect(interception.response.body.next).to.eq(requestUrl(getOffset(2, POKEMONS_PER_PAGE), POKEMONS_PER_PAGE, "/"));
            expect(interception.response.body.previous).to.eq(null);
            expect(interception.response.body.results).not.to.eq(undefined);
            expect(interception.response.body.results.length).to.eq(20);
        });

        cy.get("@errorMessage").should("not.exist");
        cy.get("@gridBoard").should("exist").then(() => {
            cy.get("@errorCard").should("not.exist");
        });

        cy.get("@previousButton").should("have.class", "disabled");
        cy.get("@nextButton").should("not.have.class", "disabled");
        cy.get("@paginationSection").find("a").should("have.length", 68);
        cy.get("[data-cy='page-1']").should("exist").and("be.visible");
        cy.get("[data-cy='page-2']").should("exist").and("be.visible");
        cy.get("[data-cy='page-3']").should("exist").and("be.visible");
    });

    it("Should display the loading components when the server response is slwo", () => {
        cy.intercept("GET", pageUrl(POKEMONS_PER_PAGE, getOffset(1, POKEMONS_PER_PAGE)), (req) => {
            req.reply({
                delay: 4000,
                fixture: "pokedexFirstPage.json"
            });
        }).as("paginatorFirstPage");

        cy.get("[data-cy='loading-grid-spinner']").should("exist").and("be.visible");
        cy.get("[data-cy='loading-grid-text']").should("exist").and("be.visible");
        cy.get("[data-cy='pagination-section']").as("paginationSection").should("exist").then(() => {
            cy.get("[data-cy='paginator-previous-button']").as("previousButton").should("exist").and("be.visible");
            cy.get("[data-cy='paginator-next-button']").as("nextButton").should("exist").and("be.visible");
            cy.get("[data-cy='page-1']").should("not.exist")
            cy.get("[data-cy='page-2']").should("not.exist")
            cy.get("[data-cy='page-3']").should("not.exist")
        });

        cy.wait(3000);
        cy.wait("@paginatorFirstPage").then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            expect(interception.response.body.next).to.eq(requestUrl(getOffset(2, POKEMONS_PER_PAGE), POKEMONS_PER_PAGE, "/"));
            expect(interception.response.body.previous).to.eq(null);
            expect(interception.response.body.results).not.to.eq(undefined);
            expect(interception.response.body.results.length).to.eq(20);
        });

        cy.get("@paginationSection").should("exist").then(() => {
            cy.get("@previousButton").should("exist").and("be.visible");
            cy.get("@nextButton").should("exist").and("be.visible");
            cy.get("@previousButton").should("have.class", "disabled");
            cy.get("@nextButton").should("not.have.class", "disabled");
            cy.get("@paginationSection").find("a").should("have.length", 68);
            cy.get("[data-cy='page-1']").should("exist").and("be.visible")
            cy.get("[data-cy='page-2']").should("exist").and("be.visible")
            cy.get("[data-cy='page-3']").should("exist").and("be.visible")
        });
    });

    it("Should display the error card when the server response is ok but the body is empty", () => {
        cy.intercept("GET", pageUrl(POKEMONS_PER_PAGE, getOffset(1, POKEMONS_PER_PAGE)), (req) => {
            req.reply({
                statusCode: 200,
                fixture: "emptyResponse.json"
            });
        }).as("paginatorEmptyResponse");

        cy.wait("@paginatorEmptyResponse").then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            expect(interception.response.body).to.deep.eq({});
            expect(interception.response.body.results).to.eq(undefined);
        });

        cy.wait(9000);
        cy.get("[data-cy='grid-error-card']").as("errorCard").should("exist").and("be.visible");
        cy.get("[data-cy='pagination-section']").should("exist").then(() => {
            cy.get("[data-cy='paginator-previous-button']").should("exist").and("be.visible");
            cy.get("[data-cy='paginator-next-button']").should("exist").and("be.visible");
            cy.get("[data-cy='page-1']").should("not.exist");
            cy.get("[data-cy='page-2']").should("not.exist");
            cy.get("[data-cy='page-3']").should("not.exist");
        });
    });

    it("Should display the error card and error message when the server responds with no content", () => {
        cy.intercept("GET", pageUrl(POKEMONS_PER_PAGE, getOffset(1, POKEMONS_PER_PAGE)), (req) => {
            req.reply({
                statusCode: 204
            });
        }).as("paginatorNoContentResponse");
    
        cy.wait("@paginatorNoContentResponse").then((interception) => {
            expect(interception.response.statusCode).to.eq(204);
            expect(interception.response.body).to.eq("");
            expect(interception.response.body.results).to.eq(undefined);
        });
    
        cy.get("[data-cy='error-message-modal']").as("errorMessage").should("exist").and("be.visible");
        cy.get("@errorMessage").find("button").then(($button) => {
            cy.wrap($button).click({force: true});
        });
        
        cy.get("[data-cy='grid-error-card']").as("errorCard").should("exist").and("be.visible");
        cy.get("[data-cy='pagination-section']").should("exist").then(() => {
            cy.get("[data-cy='paginator-previous-button']").should("exist").and("be.visible");
            cy.get("[data-cy='paginator-next-button']").should("exist").and("be.visible");
            cy.get("[data-cy='page-1']").should("not.exist");
            cy.get("[data-cy='page-2']").should("not.exist");
            cy.get("[data-cy='page-3']").should("not.exist");
        });
    });
});