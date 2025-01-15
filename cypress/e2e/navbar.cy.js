describe("Navbar interaction testing", () => {
    const localHost = "http://localhost:3000";
    const pokemonList = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
    const pokemonUrl = (category, pokemon) => {
        return `https://pokeapi.co/api/v2/${category}/${pokemon}`;
    };

    beforeEach(() => {
        cy.visit(localHost);
        window.localStorage.clear();
    });

    it("Should reload the website when clicking on the logo", () => {
        cy.get("[data-cy='navbar-logo']").as("navbarLogo").should("exist");
        cy.get("[data-cy='navbar-section").as("navbarSection").should("be.visible");
        cy.get("[data-cy='grid-section']").as("gridSection").should("be.visible");
        cy.get("[data-cy='pagination-section']").as("paginationSection").should("be.visible");

        cy.wait(2000);
        cy.get("@navbarLogo").click();

        cy.location("pathname").should("eq", "/").then(() => {
            cy.get("@navbarSection").should("be.visible");
            cy.get("@gridSection").should("be.visible");
            cy.get("@paginationSection").should("be.visible");
        });
    });

    it("Should display the list of pokemons in the searchbox when clicking on the search input", () => {
        cy.intercept("GET", pokemonList, (req) => {
            req.reply({
                fixture: "pokemonList.json"
            });
        }).as("pokemonList");

        cy.get("[data-cy='navbar-dropdown-menu']").should("not.exist");
        cy.get("[data-cy='navbar-search-input']").click();

        cy.wait("@pokemonList").then((interception) => {
            expect(interception.response.statusCode).to.eq(200);

            cy.get("[data-cy='navbar-dropdown-menu']").as("navbarDropdownMenu").should("exist").then(() => {
                cy.get("@navbarDropdownMenu").should("be.visible");
                cy.get("@navbarDropdownMenu").find("a").should("have.length", interception.response.body.results.length);
                cy.get("[data-cy='navbar-section']").click();
                cy.get("@navbarDropdownMenu").should("not.exist");
            });
        });
    });

    it("Should search for a pokemon through typing in the searchbox and then displaying the card when selecting it", () => {
        cy.intercept("GET", pokemonList, (req) => {
            req.reply({
                fixture: "pokemonList.json"
            });
        }).as("pokemonList");

        cy.intercept("GET", pokemonUrl("pokemon", "blastoise"), (req) => {
            req.reply({
                fixture: "blastoise.json"
            });
        }).as("blastoise");

        cy.intercept("GET", pokemonUrl("pokemon-species", "blastoise"), (req) => {
            req.reply({
                fixture: "blastoiseSpecies.json"
            });
        }).as("blastoiseSpecies")
        
        cy.wait("@pokemonList");

        cy.get("[data-cy='loading-pokemon-alert']").should("not.exist");
        cy.get("[data-cy='pokemon-card-modal']").should("not.exist");
        
        cy.get("[data-cy='navbar-search-input']").as("searchboxSearchInput").click().then(() => {
            cy.get("@searchboxSearchInput").type("bLasToIsE");
            cy.get("[data-cy='blastoise']").click();
        });

        cy.get("[data-cy='loading-pokemon-alert']").as("loadingAlert").should("exist").and("be.visible");

        cy.wait("@blastoise").then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
        
        cy.wait("@blastoiseSpecies").then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });

        cy.get("[data-cy='pokemon-card-modal']").as("pokemonCard").should("exist").then(() => {
            cy.get("@pokemonCard").should("be.visible");
        });
    });

    it("Should clear the input in the searchbox when simulating clicking on the native clear button in DOM", () => {
        cy.intercept("GET", pokemonList, (req) => {
            req.reply({
                fixture: "pokemonList.json"
            });
        }).as("pokemonList");
        cy.wait("@pokemonList");

        cy.get("[data-cy='navbar-search-input']").as("searchboxSearchInput").type("bLasToIsE").then(() => {
            cy.get("[data-cy='blastoise']").should("be.visible");

            cy.get("@searchboxSearchInput").clear();
            cy.get("@searchboxSearchInput").should("have.value", "");
            cy.get("[data-cy='bulbasaur']").should("be.visible");

            cy.get("[data-cy='navbar-section']").click().then(() => {
                cy.get("[data-cy='bulbasaur']").should("not.exist");
                cy.get("[data-cy='navbar-dropdown-menu']").should("not.exist");
            });
        });
    });

    it("Should clear the input in the searchbox when simulating a backspace", () => {
        cy.intercept("GET", pokemonList, (req) => {
            req.reply({
                fixture: "pokemonList.json"
            });
        }).as("pokemonList");
        cy.wait("@pokemonList");

        cy.get("[data-cy='navbar-search-input']").as("searchboxSearchInput").type("asdsadsadsadadsad");

        cy.get("@searchboxSearchInput").type('{selectall}{backspace}').then(() => {
            cy.get("[data-cy='navbar-section']").click();
            cy.get("[data-cy='navbar-dropdown-menu']").should("not.exist");
            cy.get("@searchboxSearchInput").should("have.value", "");
        });
    });

    it("Should display an empty list when a match is not found", () => {
        cy.intercept("GET", pokemonList, (req) => {
            req.reply({
                fixture: "pokemonList.json"
            });
        }).as("pokemonList");
        cy.wait("@pokemonList");

        cy.get("[data-cy='navbar-search-input']").type("asdsadsadsadadsad");

        cy.get("[data-cy='navbar-dropdown-menu']").as("navbarDropdownMenu").should("be.visible").then(() => {
            cy.get("@navbarDropdownMenu").find("a").should("have.length", 1);
        });
    });

    it("Should interact with the pokeball button and catch 3 random pokemons", () => {
        cy.intercept("GET", pokemonList, (req) => {
            req.reply({
                fixture: "pokemonList.json"
            });
        }).as("pokemonList");
        cy.wait("@pokemonList");

        cy.get("[data-cy='navbar-poke-slot']").as("pokeSlots").should("exist").and("be.visible");
        cy.get("@pokeSlots").find("img").eq(0).should("have.attr", "src").and("include", "pokedex-len");
        cy.get("@pokeSlots").find("img").eq(1).should("have.attr", "src").and("include", "pokedex-len");
        cy.get("@pokeSlots").find("img").eq(2).should("have.attr", "src").and("include", "pokedex-len");

        cy.get("[data-cy='pokeball-button']").as("pokeballButton").should("exist");
        cy.get("@pokeballButton").click().then(() => {
            cy.get("[data-cy='caught-pokemon-alert-modal']").as("caughtPokemonAlert").should("exist").and("be.visible");

            cy.wait(6500);
            cy.get("@caughtPokemonAlert").should("not.exist");
            cy.get("[data-cy='caught-pokemon-summary-modal']").as("caughtPokemonSummaryModal").should("exist").and("be.visible");
            
            cy.wait(11000);
            cy.get("@caughtPokemonAlert").should("not.exist");
            cy.get("@caughtPokemonSummaryModal").should("not.exist");
            cy.get("@pokeSlots").find("img").eq(0).should("have.attr", "src").and("not.include", "pokedex-len");
            cy.get("@pokeSlots").find("img").eq(1).should("have.attr", "src").and("include", "pokedex-len");
            cy.get("@pokeSlots").find("img").eq(2).should("have.attr", "src").and("include", "pokedex-len");
        });
        
        cy.get("@pokeballButton").click().then(() => {
            cy.get("@caughtPokemonAlert").should("exist").and("be.visible");

            cy.wait(6500);
            cy.get("@caughtPokemonAlert").should("not.exist");
            cy.get("@caughtPokemonSummaryModal").should("exist").and("be.visible");
            
            cy.wait(11000);
            cy.get("@caughtPokemonAlert").should("not.exist");
            cy.get("@caughtPokemonSummaryModal").should("not.exist");
            cy.get("@pokeSlots").find("img").eq(0).should("have.attr", "src").and("not.include", "pokedex-len");
            cy.get("@pokeSlots").find("img").eq(1).should("have.attr", "src").and("not.include", "pokedex-len");
            cy.get("@pokeSlots").find("img").eq(2).should("have.attr", "src").and("include", "pokedex-len");
        });

        cy.get("@pokeballButton").click().then(() => {
            cy.get("@caughtPokemonAlert").should("exist").and("be.visible");

            cy.wait(6500);
            cy.get("@caughtPokemonAlert").should("not.exist");
            cy.get("@caughtPokemonSummaryModal").should("exist").and("be.visible");

            cy.wait(11000);
            cy.get("@caughtPokemonAlert").should("not.exist");
            cy.get("@caughtPokemonSummaryModal").should("not.exist");
            cy.get("@pokeSlots").find("img").eq(0).should("have.attr", "src").and("not.include", "pokedex-len");
            cy.get("@pokeSlots").find("img").eq(1).should("have.attr", "src").and("not.include", "pokedex-len");
            cy.get("@pokeSlots").find("img").eq(2).should("have.attr", "src").and("not.include", "pokedex-len");
        });

        cy.get("[data-cy='navbar-section']").click().then(() => {
            cy.get("@caughtPokemonAlert").should("not.exist");
            cy.get("@caughtPokemonSummaryModal").should("not.exist");
            cy.get("@pokeSlots").find("img").eq(0).should("have.attr", "src").and("not.include", "pokedex-len");
            cy.get("@pokeSlots").find("img").eq(1).should("have.attr", "src").and("not.include", "pokedex-len");
            cy.get("@pokeSlots").find("img").eq(2).should("have.attr", "src").and("not.include", "pokedex-len");
        });
    });

    it("Should display an empty list message on the searchbox when the response was internal server error", () => {
        cy.intercept("GET", pokemonList, (req) => {
            req.reply({
                statusCode: 500,
            });
        }).as("pokedexListError");

        cy.wait("@pokedexListError").then((interception) => {
            expect(interception.response.statusCode).to.eq(500);
        });

        cy.get("[data-cy='error-message-modal']").as("errorMessage").should("exist");
        cy.get("@errorMessage").find("button").then(($button) => {
            cy.wrap($button).click();
        });

        cy.get("@errorMessage").should("not.exist");

        cy.get("[data-cy='navbar-search-input']").as("searchboxInput").should("exist");
        cy.get("@searchboxInput").click().then(() => {
            cy.get("@searchboxInput").type("bLasToIsE");
            cy.get("[data-cy='blastoise']").should("not.exist");

            cy.get("[data-cy='navbar-dropdown-menu']").as("navbarDropdownMenu").should("exist");
            cy.get("@navbarDropdownMenu").find("a").should("have.length", 1);
            cy.get("@navbarDropdownMenu").find("a").should("have.text", "No pokemons found")
        });
    });

    it("Should display an empty list when the server is response is delayed", () => {
        cy.intercept("GET", pokemonList, (req) => {
            req.reply({
                delay: 3000,
                fixture: "pokemonList.json"
            });
        }).as("delayedPokemonList");

        cy.wait("@delayedPokemonList").then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            expect(interception.response.body.results.length).to.eq(1302);
        
            cy.get("[data-cy='navbar-search-input']").as("searchboxInput").should("exist");
            cy.get("@searchboxInput").click().then(() => {
                cy.get("[data-cy='navbar-dropdown-menu']").as("navbarDropdownMenu").should("exist").and("be.visible");
                cy.get("@searchboxInput").type("bLasToIsE");
                cy.get("[data-cy='blastoise']").should("exist");
                cy.get("@searchboxInput").clear();
            });

            cy.get("@navbarDropdownMenu").should("exist").and("be.visible");
            cy.get("@navbarDropdownMenu").find("a").should("have.length", interception.response.body.results.length);
            cy.get("@navbarDropdownMenu").find("a").eq(8).should("have.text", "blastoise");
        });
    });

    it("Should display an empty list when the server response is ok but the results are empty", () => {
        cy.intercept("GET", pokemonList, (req) => {
            req.reply({
                statusCode: 200,
                fixture: "emptyResponse.json"
            });
        }).as("emptyPokemonList");

        cy.wait("@emptyPokemonList").then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            expect(interception.response.body.results).to.eq(undefined);
        });

        cy.get("[data-cy='navbar-search-input']").as("searchboxInput").should("exist");
        cy.get("@searchboxInput").click().then(() => {
            cy.get("[data-cy='navbar-dropdown-menu']").as("navbarDropdownMenu").should("exist").and("be.visible");
            cy.get("@searchboxInput").type("bLasToIsE");
            cy.get("[data-cy='blastoise']").should("not.exist");
            cy.get("@searchboxInput").clear();
        });
        
        cy.get("@navbarDropdownMenu").should("exist").and("be.visible");
        cy.get("@navbarDropdownMenu").find("a").should("have.length", 1);
        cy.get("@navbarDropdownMenu").find("a").should("have.text", "No pokemons found");
    });

    it("Should display an error message and make the pokeball button unable when there's an internal server error", () => {
        cy.intercept("GET", pokemonList, (req) => {
            req.reply({
                statusCode: 500,
            });
        }).as("pokedexListError");

        cy.wait("@pokedexListError").then((interception) => {
            expect(interception.response.statusCode).to.eq(500);
        });

        cy.get("[data-cy='error-message-modal']").as("errorMessage").should("exist");
        cy.get("@errorMessage").find("button").then(($button) => {
            cy.wrap($button).click({ force: true });
            cy.wait(1000);
        });

        cy.get("[data-cy='pokeball-button']").as("pokeballButton").should("exist").then(() => {
            cy.get("@pokeballButton").click({ force: true });
        });
    });
});