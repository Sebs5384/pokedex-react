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
        
        cy.get("[data-cy='loading-pokemon-alert']").should("exist");
        cy.get("[data-cy='loading-pokemon-alert']").should("be.visible");

        cy.get("[data-cy='loading-pokemon-alert']").should("not.exist");

        cy.get("[data-cy='pokemon-card-modal']").should("exist");
        cy.get("[data-cy='pokemon-card-modal']").should("be.visible");
        cy.get("[data-cy='pokemon-card-close-button']").should("exist");
        cy.get("[data-cy='pokemon-card-close-button']").should("be.visible");

        cy.get("[data-cy='pokemon-card-header-genus']").find("strong").eq(0).should("have.text", "P.STAGE");
        cy.get("[data-cy='pokemon-card-header-main']").find("img").eq(1).should("have.attr", "src", waterIconPath);
        cy.get("[data-cy='pokemon-card-modal-image-container']").should("have.css", "background-image").and("eq", mockImageBackgroundStyle);
            
        cy.wait("@blastoiseSpecies").then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            expect(interception.response.body.name).to.eq("blastoise");
            expect(interception.response.body.evolves_from_species.name).to.eq("wartortle");

            cy.get("[data-cy='pokemon-card-header-genus']").find("strong").eq(1).should("have.text", "Evolves from wartortle");
            cy.get("[data-cy='pokemon-card-header-genus']").find("strong").eq(2).should("have.text", interception.response.body.genera[7].genus);

            cy.get("[data-cy='pokemon-card-header-main']").find("img").eq(0).should("have.attr", "src", previousEvolutionSpriteUrl);
        });

        cy.wait("@blastoise").then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            expect(interception.response.body.name).to.eq("blastoise");
            
            cy.get("[data-cy='pokemon-card-header-main']").find("strong").eq(0).should("have.text", interception.response.body.name);
            cy.get("[data-cy='pokemon-card-header-main']").find("strong").eq(1).should("have.text", `${interception.response.body.stats[0].base_stat} HP`);
            

            cy.get("[data-cy='pokemon-card-modal-image-container']").should("exist");
            cy.get("[data-cy='pokemon-card-modal-image-container']").find("div").find("img").should("have.attr", "src", interception.response.body.sprites.other["official-artwork"].front_default);
        });
    });
});