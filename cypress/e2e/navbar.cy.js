describe("Navbar interaction testing", () => {
    const localHost = "http://localhost:3000";
    const pokemonList = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
    const pokemonUrl = (category, pokemon) => {
        return `https://pokeapi.co/api/v2/${category}/${pokemon}`;
    };

    beforeEach(() => {
        cy.visit(localHost);
        window.localStorage.clear();

        cy.intercept("GET", pokemonList, (req) => {
            req.reply({
                fixture: "pokemonList.json"
            });
        }).as("pokemonList");
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
        cy.wait(2000);
        cy.get("[data-cy='navbar-dropdown-menu']").should("not.exist");
        cy.get("[data-cy='navbar-search-input']").click();

        cy.wait("@pokemonList").then((interception) => {
            expect(interception.response.statusCode).to.eq(200);

            cy.get("[data-cy='navbar-dropdown-menu']").as("navbarDropdownMenu").should("exist").then(() => {
                cy.get("@navbarDropdownMenu").should("be.visible");
                cy.get("@navbarDropdownMenu").find("a").should("have.length", interception.response.body.results.length);
                cy.get("@navbarDropdownMenu").click();
                cy.get("@navbarDropdownMenu").should("not.exist");
            });
        });
    });

    it("Should search for a pokemon through typing in the searchbox and then displaying the card when selecting it", () => {
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
        
        cy.wait(2000);

        cy.get("[data-cy='loading-pokemon-alert']").should("not.exist");
        cy.get("[data-cy='pokemon-card-modal']").should("not.exist");
        
        cy.get("[data-cy='navbar-search-input']").as("searchboxSearchInput").click().then(() => {
            cy.get("@searchboxSearchInput").type("bLasToIsE");
            cy.get("[data-cy='blastoise']").click();
        });

        cy.get("[data-cy='loading-pokemon-alert']").as("loadingAlert").should("exist").then(() => {
            cy.get("@loadingAlert").should("be.visible");
        });

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
        cy.get("[data-cy='navbar-search-input']").as("searchboxSearchInput").type("asdsadsadsadadsad");

        cy.get("@searchboxSearchInput").type('{selectall}{backspace}').then(() => {
            cy.get("[data-cy='navbar-section']").click();
            cy.get("[data-cy='navbar-dropdown-menu']").should("not.exist");
            cy.get("@searchboxSearchInput").should("have.value", "");
        });
    });

    it("Should display an empty list when a match is not found", () => {
        cy.get("[data-cy='navbar-search-input']").type("asdsadsadsadadsad");

        cy.get("[data-cy='navbar-dropdown-menu']").as("navbarDropdownMenu").should("be.visible").then(() => {
            cy.get("@navbarDropdownMenu").find("a").should("have.length", 0);
        });
    });
});