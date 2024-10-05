describe("Navbar interaction testing", () => {
    const localHost = "http://localhost:3000";
    const pokemonList = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
    const blastoiseUrl = "https://pokeapi.co/api/v2/pokemon/blastoise";
    const blastoiseSpeciesUrl = "https://pokeapi.co/api/v2/pokemon-species/blastoise";

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
        cy.get("[data-cy='navbar-logo']").should("exist");
        cy.get("[data-cy='navbar-section").should("be.visible");
        cy.get("[data-cy='grid-section']").should("be.visible");
        cy.get("[data-cy='pagination-section']").should("be.visible");

        cy.wait(2000);
        cy.get("[data-cy='navbar-logo']").click();
        cy.location("pathname").should("eq", "/").then(() => {
            cy.get("[data-cy='navbar-section']").should("be.visible");
            cy.get("[data-cy='grid-section']").should("be.visible");
            cy.get("[data-cy='pagination-section']").should("be.visible");
        });
    });

    it("Should display the list of pokemons in the searchbox when clicking on the search input", () => {
        cy.wait(2000);
        cy.get("[data-cy='navbar-dropdown-menu']").should("not.exist");
        cy.get("[data-cy='navbar-search-input']").click();

        cy.wait("@pokemonList").then((interception) => {
            expect(interception.response.statusCode).to.eq(200);

            cy.get("[data-cy='navbar-dropdown-menu']").should("exist");
            cy.get("[data-cy='navbar-dropdown-menu']").should("be.visible");
            cy.get("[data-cy='navbar-dropdown-menu']").find("a").should("have.length", interception.response.body.results.length);
            cy.get("[data-cy='navbar-section']").click();

            cy.get("[data-cy='navbar-dropdown-menu']").should("not.exist");
        });
    });

    it("Should search for a pokemon through typing in the searchbox and then displaying the card when selecting it", () => {
        cy.intercept("GET", blastoiseUrl, (req) => {
            req.reply({
                fixture: "blastoise.json"
            });
        }).as("blastoise");

        cy.intercept("GET", blastoiseSpeciesUrl, (req) => {
            req.reply({
                fixture: "blastoiseSpecies.json"
            });
        }).as("blastoiseSpecies")
        
        cy.wait(2000);

        cy.get("[data-cy='loading-pokemon-alert']").should("not.exist");
        cy.get("[data-cy='pokemon-card-modal']").should("not.exist");
        
        cy.get("[data-cy='navbar-search-input']").click();
        cy.get("[data-cy='navbar-search-input']").type("bLasToIsE");
        cy.get("[data-cy='blastoise']").click();

        cy.get("[data-cy='loading-pokemon-alert']").should("exist").then(() => {
            cy.get("[data-cy='loading-pokemon-alert']").should("be.visible");
            cy.get("[data-cy='loading-pokemon-alert']").should("not.exist");
        });

        cy.wait("@blastoise").then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
        
        cy.wait("@blastoiseSpecies").then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });

        cy.get("[data-cy='pokemon-card-modal']").should("exist").then(() => {
            cy.get("[data-cy='pokemon-card-modal']").should("be.visible");
        });
    });

    it("Should clear the input in the searchbox when simulating clicking on the native clear button in DOM", () => {
        cy.get("[data-cy='navbar-search-input']").type("bLasToIsE");
        cy.get("[data-cy='blastoise']").should("be.visible");

        cy.get("[data-cy='navbar-search-input']").clear();
        cy.get("[data-cy='navbar-search-input']").should("have.value", "");

        cy.get("[data-cy='bulbasaur']").should("be.visible");
        cy.get("[data-cy='navbar-section']").click();
        cy.get("[data-cy='bulbasaur']").should("not.exist");
    });

    it("Should clear the input in the searchbox when simulating a backspace", () => {
        cy.get("[data-cy='navbar-search-input']").type("asdsadsadsadadsad");

        cy.get("[data-cy='navbar-search-input']").type('{selectall}{backspace}').then(() => {
            cy.get("[data-cy='navbar-section']").click();
            cy.get("[data-cy='navbar-dropdown-menu']").should("not.exist");
            cy.get("[data-cy='navbar-search-input']").should("have.value", "");
        });
    });

    it("Should display an empty list when a match is not found", () => {
        cy.get("[data-cy='navbar-search-input']").type("asdsadsadsadadsad");

        cy.get("[data-cy='navbar-dropdown-menu']").should("be.visible").then(() => {
            cy.get("[data-cy='navbar-dropdown-menu']").find("a").should("have.length", 0);
        });
    });
});