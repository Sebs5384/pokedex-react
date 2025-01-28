describe("Grid interaction testing", () => {
    const localHost = "http://localhost:3000";
    const POKEMONS_PER_PAGE = 20;
    const NEXT_PAGE_OFFSET = 20;
    const LAST_PAGE_OFFSET = 1300;
    const FIRST_PAGE_OFFSET = 0;

    const pageUrl = (limit, offset) => {
        return `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    };

    const requestUrl = (offset, limit, slash = "") => {
        return `https://pokeapi.co/api/v2/pokemon${slash}?offset=${offset}&limit=${limit}`  
    };

    const pokemonSpriteUrl = (id) => {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon//${id}.png`
    };

    beforeEach(() => {
        cy.visit(localHost);
        window.localStorage.clear();
    });

    it("Should display 20 pokemons in the grid", () => {
        cy.intercept("GET", pageUrl(POKEMONS_PER_PAGE, FIRST_PAGE_OFFSET), (req) => {
            req.reply({
                fixture: "pokedexFirstPage.json"
            });
        }).as("pokedexFirstPage");

        cy.get("[data-cy='grid-section']").as("gridSection").should("exist").then(() => {
            cy.wait("@pokedexFirstPage").then((interception) => {
                expect(interception.response.statusCode).to.eq(200);

                cy.get("[data-cy='grid-board']").as("gridBoard").should("exist").then(() => {
                    cy.get("@gridBoard").find("div").should("have.length", interception.response.body.results.length);
                    cy.get("@gridBoard").find("img").should("have.length", interception.response.body.results.length);
                    cy.get("@gridBoard").find("strong").should("have.length", interception.response.body.results.length);
                });

                cy.get("@gridBoard").find("strong").each(($strong, index) => {
                    cy.wrap($strong).should("have.text", `#${interception.response.body.results[index].url.split("/")[6]} ${interception.response.body.results[index].name}`);
                });

                cy.get("@gridBoard").find("img").each(($img, index) => {
                    cy.wrap($img).should("have.attr", "src", pokemonSpriteUrl(interception.response.body.results[index].url.split("/")[6]));
                });
            });
        });
    });

    it("Should display the next 20 pokemons in the grid", () => {
        cy.intercept("GET", pageUrl(POKEMONS_PER_PAGE, FIRST_PAGE_OFFSET), (req) => {
            req.reply({
                fixture: "pokedexFirstPage.json"
            });
        }).as("pokedexFirstPage");

        cy.intercept("GET", pageUrl(POKEMONS_PER_PAGE, NEXT_PAGE_OFFSET), (req) => {
            req.reply({
                fixture: "pokedexSecondPage.json"
            });
        }).as("pokedexSecondPage")

        cy.get("[data-cy='grid-section']").as("gridSection").should("exist").then(() => {
            cy.wait("@pokedexFirstPage").then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
                cy.get("[data-cy='grid-board']").as("gridBoard").should("exist").then(() => {
                    cy.get("@gridBoard").find("div").should("have.length", interception.response.body.results.length);
                });
            });
        });

        cy.get("[data-cy='paginator-next-button']").click();
        cy.wait(1000);
        
        cy.wait("@pokedexSecondPage").then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            
            cy.get("[data-cy='grid-board']").as("gridBoard").should("exist").then(() => {
                cy.get("@gridBoard").find("div").should("have.length", interception.response.body.results.length);
                cy.get("@gridBoard").find("img").should("have.length", interception.response.body.results.length);
                cy.get("@gridBoard").find("strong").should("have.length", interception.response.body.results.length);
            });

            cy.get("@gridBoard").find("strong").each(($strong, index) => {
                cy.wrap($strong).should("have.text", `#${interception.response.body.results[index].url.split("/")[6]} ${interception.response.body.results[index].name}`);
            });

            cy.get("@gridBoard").find("img").each(($img, index) => {
                cy.wrap($img).should("have.attr", "src", pokemonSpriteUrl(interception.response.body.results[index].url.split("/")[6]));
            });
        });
    });

    it("Should display the last two pokemons on the last page in the grid", () => {
        cy.intercept("GET", pageUrl(POKEMONS_PER_PAGE, FIRST_PAGE_OFFSET), (req) => {
            req.reply({
                fixture: "pokedexFirstPage.json"
            });
        }).as("pokedexFirstPage");

        cy.intercept("GET", pageUrl(POKEMONS_PER_PAGE, LAST_PAGE_OFFSET), (req) => {
            req.reply({
                fixture: "pokedexLastPage.json"
            });
        }).as("pokedexLastPage");

        cy.get("[data-cy='grid-section']").as("gridSection").should("exist").then(() => {
            cy.wait("@pokedexFirstPage").then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
            });

            cy.get("[data-cy='paginator-searchbox']").click().type("66{enter}");

            cy.wait("@pokedexLastPage").then((interception) => {
                expect(interception.response.statusCode).to.eq(200);

                cy.get("[data-cy='grid-board']").as("gridBoard").should("exist").then(() => {
                    cy.get("@gridBoard").find("div").should("have.length", interception.response.body.results.length);
                    cy.get("@gridBoard").find("img").should("have.length", interception.response.body.results.length);
                    cy.get("@gridBoard").find("strong").should("have.length", interception.response.body.results.length);
                });

                cy.get("@gridBoard").find("strong").each(($strong, index) => {
                    cy.wrap($strong).should("have.text", `#${interception.response.body.results[index].url.split("/")[6]} ${interception.response.body.results[index].name}`);
                });

                cy.get("@gridBoard").find("img").each(($img, index) => {
                    cy.wrap($img).should("have.attr", "src", pokemonSpriteUrl(interception.response.body.results[index].url.split("/")[6]));
                });
            });
        });
    });

    it("Should display the error card when the server returns an error", () => {
        cy.intercept("GET", pageUrl(POKEMONS_PER_PAGE, FIRST_PAGE_OFFSET), (req) => {
            req.reply({
                statusCode: 500
            });
        }).as("pokedexFirstPageError");

        cy.intercept("GET", pageUrl(POKEMONS_PER_PAGE, NEXT_PAGE_OFFSET), (req) => {
            req.reply({
                statusCode: 500
            });
        }).as("pokedexNextPageError");
        

        cy.get("[data-cy='grid-section']").as("gridSection").should("exist").then(() => {
            cy.wait("@pokedexFirstPageError").then((interception) => {
                expect(interception.response.statusCode).to.eq(500);
                expect(interception.body).to.eq(undefined);
                expect(interception.response.body.results).to.eq(undefined);
            });

            cy.get("[data-cy='error-message-modal']").as("errorMessage").should("exist").then(() => {
                cy.get("@errorMessage").find("button").then(($button) => {
                    cy.wrap($button).click();
                });

                cy.get("@errorMessage").should("not.exist");
            });

            cy.get("[data-cy='grid-board']").as("gridBoard").should("exist").then(() => {
                cy.get("[data-cy='grid-error-card']").as("errorCard").should("exist").and("be.visible");
                cy.get("@errorCard").find("strong").should("have.length", 1);
                cy.get("@errorCard").find("strong").should("not.have.text", "#1 Bulbasaur");
            });
        });

        cy.get("[data-cy='paginator-next-button']").click();

        cy.get("@errorMessage").should("exist").and("be.visible");
        cy.get("@errorMessage").find("button").then(($button) => {
            cy.wrap($button).click({ force: true });
        });
        cy.get("@errorMessage").should("not.exist");

        cy.get("@gridSection").should("exist").then(() => {
            cy.get("[data-cy='grid-board']").as("gridBoard").should("exist").then(() => {
                cy.get("[data-cy='grid-error-card']").as("errorCard").should("exist").and("be.visible");
                cy.get("@errorCard").find("strong").should("have.length", 1);
                cy.get("@errorCard").find("strong").should("not.have.text", "#21 Spearow");    
            });
        });
    });

    it("Should display the loading components when the server is slow to respond", () => {
        cy.intercept("GET", pageUrl(POKEMONS_PER_PAGE, FIRST_PAGE_OFFSET), (req) => {
            req.reply({
                delay: 5000,
                fixture: "pokedexFirstPage.json"
            });
        }).as("pokedexSlowResponse")

        cy.get("[data-cy='loading-grid-spinner']").as("loadingSpinner").should("exist").and("be.visible")
        cy.get("[data-cy='loading-grid-text']").as("loadingText").should("exist").and("be.visible");

        cy.wait("@pokedexSlowResponse").then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            expect(interception.response.body.results).to.not.eq(undefined);
            expect(interception.response.body.results.length).to.eq(20);
        
            cy.get("@loadingSpinner").should("not.exist");
            cy.get("@loadingText").should("not.exist");
            cy.get("[data-cy='grid-section']").should("exist");
            cy.get("[data-cy='grid-board']").as("gridBoard").should("exist");
            
            cy.get("@gridBoard").find("div").should("have.length", 20);
            cy.get("@gridBoard").find("img").should("have.length", 20);
            cy.get("@gridBoard").find("strong").should("have.length", 20);

            cy.get("@gridBoard").find("img").each(($img, index) => {
                cy.wrap($img).should("have.attr", "src", pokemonSpriteUrl(interception.response.body.results[index].url.split("/")[6]));
            });

            cy.get("@gridBoard").find("strong").each(($strong, index) => {
                cy.wrap($strong).should("have.text", `#${interception.response.body.results[index].url.split("/")[6]} ${interception.response.body.results[index].name}`);
            });
        });
    });

    it("Should display the error message and error card when the response was empty", () => {
        cy.intercept("GET", pageUrl(POKEMONS_PER_PAGE, FIRST_PAGE_OFFSET), (req) => {
            req.reply({
                statusCode: 204,
                fixture: "emptyResponse.json"
            });
        }).as("pokedexEmptyResponse");

        cy.get("[data-cy='loading-grid-spinner']").as("loadingSpinner").should("exist").and("be.visible");
        cy.get("[data-cy='loading-grid-text']").as("loadingText").should("exist").and("be.visible");

        cy.wait("@pokedexEmptyResponse").then((interception) => {
            expect(interception.response.statusCode).to.eq(204);
            expect(interception.body).to.eq(undefined);
            expect(interception.response.body.results).to.eq(undefined);
        });
        
        cy.get("@loadingSpinner").should("not.exist");
        cy.get("@loadingText").should("not.exist");

        cy.get("[data-cy='grid-section']").should("exist");
        cy.get("[data-cy='error-message-modal']").as("errorMessage").should("exist");
        cy.get("@errorMessage").find("button").then(($button) => {
            cy.wrap($button).click({force: true});
        });
            
        cy.get("[data-cy='grid-board']").as("gridBoard").should("exist").then(() => {
            cy.get("[data-cy='grid-error-card']").as("errorCard").should("exist").and("be.visible");    
            cy.get("@errorCard").find("strong").should("have.length", 1);
            cy.get("@errorCard").find("strong").should("not.have.text", "#1 Bulbasaur");
        });
    });

    it("Should display the loading components and no cards component when the response was ok but results were empty", () => {
        cy.intercept("GET", pageUrl(POKEMONS_PER_PAGE, FIRST_PAGE_OFFSET), (req) => {
            req.reply({
                statusCode: 200,
                fixture: "emptyResponse.json"
            });
        }).as("pokedexEmptyResults");
        cy.wait(1000);

        cy.wait("@pokedexEmptyResults").then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            expect(interception.body).to.eq(undefined);
            expect(interception.response.body.results).to.eq(undefined);
        });

        cy.get("[data-cy='grid-section']").as("gridSection").should("exist");
        cy.get("[data-cy='grid-board']").as("gridBoard").should("exist");
        cy.get("[data-cy='loading-grid-spinner']").as("loadingSpinner").should("exist").and("be.visible");
        cy.get("[data-cy='loading-grid-text']").as("loadingText").should("exist").and("be.visible");

        cy.wait(10000);
        cy.get("[data-cy='grid-error-card']").should("exist").and("be.visible");
        cy.get("@loadingSpinner").should("not.exist");
        cy.get("@loadingText").should("not.exist");
    });

    it("Should display 20 grid cards if these were successfully stored in the local storage despite an internal error happening in between", () => { 
        cy.intercept("GET", pageUrl(POKEMONS_PER_PAGE, FIRST_PAGE_OFFSET), (req) => {
            req.reply({
                fixture: "pokedexFirstPage.json"
            });
        }).as("pokedexFirstPage");
        
        cy.intercept("GET", pageUrl(POKEMONS_PER_PAGE, NEXT_PAGE_OFFSET), (req) => {
            req.reply({
                statusCode: 500,
            });
        }).as("pokedexNextPageError");
        
        cy.wait("@pokedexFirstPage").then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            expect(interception.response.body.results.length).to.eq(POKEMONS_PER_PAGE);
            
            cy.get("[data-cy='grid-section']").should("exist");
            cy.get("[data-cy='grid-board']").as("gridBoard").should("exist").then(() => {
                cy.get("@gridBoard").find("div").should("have.length", interception.response.body.results.length);
                cy.get("@gridBoard").find("img").should("have.length", interception.response.body.results.length);
                cy.get("@gridBoard").find("strong").should("have.length", interception.response.body.results.length);

                cy.get("@gridBoard").find("strong").each(($strong, index) => {
                    cy.wrap($strong).should("have.text", `#${interception.response.body.results[index].url.split("/")[6]} ${interception.response.body.results[index].name}`);
                });
                
                cy.get("@gridBoard").find("img").each(($img, index) => {
                    cy.wrap($img).should("have.attr", "src", pokemonSpriteUrl(interception.response.body.results[index].url.split("/")[6]));
                });
            });
        });

        cy.get("[data-cy='paginator-next-button']").click();
        cy.wait("@pokedexNextPageError").then((interception) => {
            expect(interception.response.statusCode).to.eq(500);
            expect(interception.response.body).to.eq('');
            expect(interception.response.body.results).to.eq(undefined);
        });

        cy.get("[data-cy='error-message-modal']").as("errorMessage").should("exist").and("be.visible");
        cy.get("@errorMessage").find("button").then(($button) => {
            cy.wrap($button).click();
        });

        cy.get("@gridBoard").should("exist").then(() => {
            cy.get("[data-cy='grid-error-card']").as("errorCard").should("exist").and("be.visible");
            cy.get("@errorCard").find("strong").should("have.length", 1);
            cy.get("@errorCard").find("strong").should("not.have.text", "#1 Bulbasaur");
        });

        cy.get("[data-cy='paginator-previous-button']").click({force: true});

        cy.wait(1000);
        cy.get("@errorMessage").should("not.exist");
        cy.get("@gridBoard").should("exist").then(() => {
            const firstPageData = localStorage.getItem("pokemons_20_0");
            const parsedFirstPageData = JSON.parse(firstPageData);
            
            expect(firstPageData).not.to.be.null;
            expect(parsedFirstPageData.next).to.eq(requestUrl(POKEMONS_PER_PAGE, NEXT_PAGE_OFFSET, "/"));
            expect(parsedFirstPageData.previous).to.eq(null);

            cy.get("@gridBoard").find("div").should("have.length", parsedFirstPageData.results.length);
            cy.get("@gridBoard").find("img").should("have.length", parsedFirstPageData.results.length);
            cy.get("@gridBoard").find("strong").should("have.length", parsedFirstPageData.results.length);

            cy.get("@gridBoard").find("strong").each(($strong, index) => {
                cy.wrap($strong).should("have.text", `#${parsedFirstPageData.results[index].url.split("/")[6]} ${parsedFirstPageData.results[index].name}`);
            });
            
            cy.get("@gridBoard").find("img").each(($img, index) => {
                cy.wrap($img).should("have.attr", "src", pokemonSpriteUrl(parsedFirstPageData.results[index].url.split("/")[6]));
            });
        });
    });
});