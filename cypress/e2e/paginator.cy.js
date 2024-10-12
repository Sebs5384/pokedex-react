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

        cy.intercept("GET", pageUrl(POKEMONS_PER_PAGE, getOffset(1, POKEMONS_PER_PAGE)), (req) => {
            req.reply({
                fixture: "pokedexFirstPage.json"
            });
        }).as("paginatorFirstPage");
    });
    
    it("Should paginate through the app back and forth", () => {
        cy.wait(1000);

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
        cy.wait(1000);

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
});