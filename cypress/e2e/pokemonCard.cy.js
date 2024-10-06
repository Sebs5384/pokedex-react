describe("Modal interaction testing", () => {
    const localHost = "http://localhost:3000";
    const blastoiseUrl = "https://pokeapi.co/api/v2/pokemon/blastoise";
    const blastoiseSpeciesUrl = "https://pokeapi.co/api/v2/pokemon-species/blastoise";
    const previousEvolutionSpriteUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork//8.png";
    const mockImageBackgroundStyle = "linear-gradient(rgb(107, 254, 154), rgb(30, 103, 198), rgb(13, 52, 104), rgb(0, 0, 0))";

    beforeEach(() => {
        cy.visit(localHost);
        window.localStorage.clear();
    });

    it("Should search for a pokemon through typing in the searchbox and then display the card when selecting it", () => {
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
        
        cy.get("[data-cy='navbar-search-input']").as("searchboxSearchInput").click().then(() => {
            cy.get("@searchboxSearchInput").type("bLasToIsE");
            cy.get("[data-cy='blastoise']").click();
        });
        
        cy.get("[data-cy='loading-pokemon-alert']").as("loadingAlert").should("exist").then(() => {
            cy.get("@loadingAlert").should("be.visible");
            cy.get("@loadingAlert").should("not.exist");
        });

        cy.get("[data-cy='pokemon-card-modal']").as("pokemonCard").should("exist").then(() => {
            cy.get("@pokemonCard").should("be.visible");
            cy.get("[data-cy='pokemon-card-close-button']").as("cardCloseButton").should("exist").then(() => {
                cy.get("@cardCloseButton").should("be.visible");
            });
        
            cy.get("[data-cy='pokemon-card-header-genus-section']").as("headerGenusSection").should("exist").then(() => {
                cy.get("@headerGenusSection").find("strong").eq(0).should("have.text", "P.STAGE");
            });

            cy.get("[data-cy='pokemon-card-modal-image-section']").as("cardImageSection").should("exist").then(() => {
                cy.get("@cardImageSection").find("div").should("have.css", "background-image").and("eq", mockImageBackgroundStyle);
            })
        });
            
        cy.wait("@blastoiseSpecies").then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            expect(interception.response.body.name).to.eq("blastoise");
            expect(interception.response.body.evolves_from_species.name).to.eq("wartortle");

            cy.get("[data-cy='pokemon-card-header-genus-section']").as("headerGenusSection").then(() => {
                cy.get("@headerGenusSection").find("strong").eq(1).should("have.text", "Evolves from wartortle");
                cy.get("@headerGenusSection").find("strong").eq(2).should("have.text", interception.response.body.genera[7].genus);
            });

            cy.get("[data-cy='pokemon-card-header-main-section']").as("headerMainSection").then(() => {
                cy.get("@headerMainSection").find("img").eq(0).should("have.attr", "src", previousEvolutionSpriteUrl);
            });
        });

        cy.wait("@blastoise").then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            expect(interception.response.body.name).to.eq("blastoise");
            
            cy.get("[data-cy='pokemon-card-header-main-section']").as("headerMainSection").should("exist").then(() => {
                cy.get("@headerMainSection").find("strong").eq(0).should("have.text", interception.response.body.name);
                cy.get("@headerMainSection").find("strong").eq(1).should("have.text", `${interception.response.body.stats[0].base_stat} HP`);
                cy.get("@headerMainSection").find("img").eq(1).should("have.attr", "src").and("include", `${interception.response.body.types[0].type.name}`);
            });
                        
            cy.get("[data-cy='pokemon-card-modal-image-section']").as("cardImageSection").should("exist").then(() => {
                cy.get("@cardImageSection").find("img").should("have.attr", "src", interception.response.body.sprites.other["official-artwork"].front_default);
            });

            cy.get("[data-cy='pokemon-card-banner-section']").as("cardBannerSection").should("exist").then(() => {
                cy.get("@cardBannerSection").find("img").eq(0).should("have.attr", "src").and("include", `${interception.response.body.types[0].type.name}`);
                cy.get("@cardBannerSection").find("img").eq(1).should("have.attr", "src").and("include", `undefined`);
                cy.get("@cardBannerSection").find("strong").eq(0).should("have.text", `Length: ${(interception.response.body.height * 0.328084).toFixed(2).replace(".", "'")}"`);
                cy.get("@cardBannerSection").find("strong").eq(1).should("have.text", `Weight: ${(interception.response.body.weight * 0.00220462).toFixed(2)} lbs`);
            });

            cy.get("[data-cy='pokemon-card-skill-section']").as("cardSkillSection").should("exist").then(() => {
                cy.get("@cardSkillSection").find("img").eq(0).should("have.attr", "src").and("include", "skill-icon");
                cy.get("@cardSkillSection").find("strong").eq(0).should("have.text", "Pokemon Skills");

                cy.get("@cardSkillSection").find("img").eq(1).should("have.attr", "src").and("include", `${interception.response.body.types[0].type.name}`);
                cy.get("@cardSkillSection").find("strong").eq(1).should("have.text", `${interception.response.body.abilities[0].ability.name}`);
            
                cy.get("@cardSkillSection").find("img").eq(2).should("have.attr", "src").and("include", `${interception.response.body.types[0].type.name}`);
                cy.get("@cardSkillSection").find("strong").eq(2).should("have.text", `${interception.response.body.abilities[1].ability.name}`);
            });
            
            cy.get("[data-cy='pokemon-card-stats-section']").as("cardStatsSection").should("exist").then(() => {
                cy.get("@cardStatsSection").find("img").eq(0).should("have.attr", "src").and("include", "status-icon");
                cy.get("@cardStatsSection").find("strong").eq(0).should("have.text", "Pokemon Status");

                cy.get("@cardStatsSection").find("img").eq(1).should("have.attr", "src").and("include", "atk-icon");
            });
        });
    });
})