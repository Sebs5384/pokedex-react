describe("Modal interaction testing", () => {
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
})