describe("Navbar interaction testing", () => {
    const localHost = "http://localhost:3000";
    const pokemonList = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
    const blastoiseUrl = "https://pokeapi.co/api/v2/pokemon/blastoise";
    const blastoiseSpeciesUrl = "https://pokeapi.co/api/v2/pokemon-species/blastoise";
    const previousEvolutionSpriteUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork//8.png";
    const waterIconPath = "/static/media/water-type-icon.6bc328319f332420e0e0.png";
    const mockImageBackgroundStyle = "linear-gradient(rgb(107, 254, 154), rgb(30, 103, 198), rgb(13, 52, 104), rgb(0, 0, 0))";

    beforeEach(() => {
        cy.visit(localHost);

        cy.intercept("GET", pokemonList, (req) => {
            req.reply({
                fixture: "pokemonList.json"
            });
        }).as("pokemonList");
    });

    it("Should reload the website when clicking on the logo", (done) => {
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

            done();
        });
    });

    it("Should display the list of pokemons in the searchbox when clicking on the search input", (done) => {
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

            done();
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

        cy.wait("@blastoise").then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
        
        cy.wait("@blastoiseSpecies").then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });

        cy.get("[data-cy='loading-pokemon-alert']").should("exist");
        cy.get("[data-cy='loading-pokemon-alert']").should("be.visible");

        cy.get("[data-cy='loading-pokemon-alert']").should("not.exist");

        cy.get("[data-cy='pokemon-card-modal']").should("exist");
        cy.get("[data-cy='pokemon-card-modal']").should("be.visible");
        cy.get("[data-cy='pokemon-card-close-button']").should("exist");
        cy.get("[data-cy='pokemon-card-close-button']").should("be.visible");
    });

    
});