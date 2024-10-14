describe("Grid interaction testing", () => {
    const localHost = "http://localhost:3000";
    const POKEMONS_PER_PAGE = 20;
    const NEXT_PAGE_OFFSET = 20;
    const LAST_PAGE_OFFSET = 1300;
    const FIRST_PAGE_OFFSET = 0;

    const pageUrl = (limit, offset) => {
        return `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    };
    const pokemonSpriteUrl = (id) => {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    };

    beforeEach(() => {
        cy.visit(localHost);
        window.localStorage.clear();

        cy.intercept("GET", pageUrl(POKEMONS_PER_PAGE, FIRST_PAGE_OFFSET), (req) => {
            req.reply({
                fixture: "pokedexFirstPage.json"
            });
        }).as("pokedexFirstPage");
    });

    it("Should display 20 pokemons in the grid", () => {
        cy.wait(1000);

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
        cy.wait(1000);

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
        cy.wait(1000);

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
});