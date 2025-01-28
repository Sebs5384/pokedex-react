describe("Modal interaction testing", () => {
    const localHost = "http://localhost:3000";
    const mockImageBackgroundStyle = "linear-gradient(rgb(107, 254, 154), rgb(30, 103, 198), rgb(13, 52, 104), rgb(0, 0, 0))";
    const pokemonUrl = (category, pokemon) => {
        return `https://pokeapi.co/api/v2/${category}/${pokemon}`;
    };
    const previousEvolutionSpriteUrl = (id) => {
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork//${id}.png`;
    };

    beforeEach(() => {
        cy.visit(localHost);
        window.localStorage.clear();
    });

    it("Should search for a pokemon through typing in the searchbox and then display the card correctly when selecting it", () => {
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

        cy.get("[data-cy='loading-pokemon-alert']").should("not.exist");
        cy.get("[data-cy='pokemon-card-modal']").should("not.exist");
        
        cy.get("[data-cy='navbar-search-input']").as("searchboxSearchInput").click().then(() => {
            cy.get("@searchboxSearchInput").type("bLasToIsE");
            cy.get("[data-cy='blastoise']").click();
        });
        
        cy.get("[data-cy='loading-pokemon-alert']").as("loadingAlert").should("exist").then(() => {
            cy.get("@loadingAlert").should("be.visible");
        });

        cy.get("[data-cy='pokemon-card-modal']").as("pokemonCard").should("exist").then(() => {
            cy.get("@loadingAlert").should("not.exist");
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
                cy.get("@cardStatsSection").find("strong").eq(1).should("have.text", `ATTACK: ${interception.response.body.stats[1].base_stat}`);
                cy.get("@cardStatsSection").find("img").eq(2).should("have.attr", "src").and("include", "def-icon");
                cy.get("@cardStatsSection").find("strong").eq(2).should("have.text", `DEFENSE: ${interception.response.body.stats[2].base_stat}`);
                cy.get("@cardStatsSection").find("img").eq(3).should("have.attr", "src").and("include", "speed-icon");
                cy.get("@cardStatsSection").find("strong").eq(3).should("have.text", `SPEED: ${interception.response.body.stats[5].base_stat}`);
                cy.get("@cardStatsSection").find("img").eq(4).should("have.attr", "src").and("include", "sp-atk-icon");
                cy.get("@cardStatsSection").find("strong").eq(4).should("have.text", `SP ATK: ${interception.response.body.stats[3].base_stat}`);
                cy.get("@cardStatsSection").find("img").eq(5).should("have.attr", "src").and("include", "sp-def-icon");
                cy.get("@cardStatsSection").find("strong").eq(5).should("have.text", `SP DEF: ${interception.response.body.stats[4].base_stat}`);
            });

            cy.get("[data-cy='pokemon-card-footer-advantage-section']").as("cardAdvantageSection").should("exist").then(() => {
                cy.get("@cardAdvantageSection").find("strong").eq(0).should("have.text", "Weakness");
                cy.get("@cardAdvantageSection").find("img").eq(0).should("have.attr", "src").and("include", `${interception.response.body.weakness}`);
                cy.get("@cardAdvantageSection").find("strong").eq(1).should("have.text", "Resistance");
                cy.get("@cardAdvantageSection").find("img").eq(1).should("have.attr", "src").and("include", `${interception.response.body.resistance}`);
                cy.get("@cardAdvantageSection").find("strong").eq(2).should("have.text", "Retreat Cost");
                cy.get("@cardAdvantageSection").find("img").eq(2).should("have.attr", "src").and("include", "retreat-icon");
            });
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
                cy.get("@headerMainSection").find("img").eq(0).should("have.attr", "src", previousEvolutionSpriteUrl(interception.response.body.id - 1));
            });

            cy.get("[data-cy='pokemon-card-footer-description-section']").as("cardDescriptionSection").should("exist").then(() => {
                cy.get("@cardDescriptionSection")
                    .find("strong")
                    .should("have.text", `${interception.response.body.flavor_text_entries[0].flavor_text.replace(/\n/g, ' ').replace(/\u000c/g, ' ')}`);
            });
        });

        cy.get("@headerGenusSection").find("button").should("exist").then(() => {
            cy.get("@headerGenusSection").find("button").click();
            cy.get("@pokemonCard").should("not.exist");
        });
    });

    it("Should display the previous evolution card when clicking on the previous evolution button", () => {
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

        cy.intercept("GET", pokemonUrl("pokemon", "8"), (req) => {
            req.reply({
                fixture: "wartortle.json"
            });
        }).as("wartortle");

        cy.intercept("GET", pokemonUrl("pokemon-species", "8"), (req) => {
            req.reply({
                fixture: "wartortleSpecies.json"
            });
        }).as("wartortleSpecies");

        cy.get("[data-cy='loading-pokemon-alert']").should("not.exist")
        cy.get("[data-cy='pokemon-card-modal']").should("not.exist");

        cy.get("[data-cy='blastoise-grid']").as("blastoiseGrid").should("exist").then(() => {
            cy.get("@blastoiseGrid").click();
        });

        cy.wait("@blastoise").then((interception) => {
            expect(interception.response.statusCode).to.eq(200);

            cy.get("[data-cy='pokemon-card-modal']").as("pokemonCard").should("exist").then(() => {
                cy.get("@pokemonCard").should("be.visible");
                
                cy.get("[data-cy='pokemon-card-header-genus-section']").as("headerGenusSection").should("exist").then(() => {
                    cy.get("@headerGenusSection").find("strong").eq(0).should("have.text", "P.STAGE");
                    cy.get("@headerGenusSection").find("button").should("exist");
                });
    
                cy.get("[data-cy='pokemon-card-header-main-section']").as("headerMainSection").should("exist").then(() => {
                    cy.get("@headerMainSection").find("strong").eq(0).should("have.text", interception.response.body.name);
                    cy.get("@headerMainSection").find("img").eq(0).should("have.attr", "src", previousEvolutionSpriteUrl(interception.response.body.id - 1));
                    cy.get("@headerMainSection").find("img").eq(0).click();
    
                    cy.get("@pokemonCard").should("not.exist");
                    cy.get("@pokemonCard").should("not.be.visible");
                });
            });
        });

        cy.wait("@blastoiseSpecies").then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });

        cy.wait("@wartortle").then((interception) => {
            expect(interception.response.statusCode).to.eq(200);

            cy.get("@pokemonCard").should("exist").then(() => {
                cy.get("@pokemonCard").should("be.visible");
            
                cy.get("[data-cy='pokemon-card-header-genus-section']").as("headerGenusSection").should("exist").then(() => {
                    cy.get("@headerGenusSection").find("strong").eq(0).should("have.text", "P.STAGE");
                    cy.get("@headerGenusSection").find("button").should("exist");
                });
    
                cy.get("[data-cy='pokemon-card-header-main-section']").as("headerMainSection").should("exist").then(() => {
                    cy.get("@headerMainSection").find("strong").eq(0).should("have.text", interception.response.body.name);
                    cy.get("@headerMainSection").find("img").eq(0).should("have.attr", "src", previousEvolutionSpriteUrl(interception.response.body.id - 1));
                });
            });
        });

        cy.wait("@wartortleSpecies").then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
    });

    it("Should not display the previous evolution button when the previous evolution doesn't exist", () => {
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

        cy.intercept("GET", pokemonUrl("pokemon", "squirtle"), (req) => {
            req.reply({
                fixture: "squirtle.json"
            });
        }).as("squirtle");

        cy.intercept("GET", pokemonUrl("pokemon-species", "squirtle"), (req) => {
            req.reply({
                fixture: "squirtleSpecies.json"
            })
        }).as("squirtleSpecies");

        cy.get("[data-cy='squirtle-grid']").as("squirtleCard").should("exist").then(() => {
            cy.get("@squirtleCard").click();
            cy.get("[data-cy='loading-pokemon-alert']").as("loadingAlert").should("exist");

            cy.wait("@squirtle").then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
                cy.get("[data-cy='pokemon-card-modal']").as("pokemonCard").should("exist");
                cy.get("[data-cy='pokemon-card-header-genus-section']").as("headerGenusSection").should("exist").then(() => {
                    cy.get("@headerGenusSection").find("strong").eq(0).should("not.have.text", "P.STAGE");
                });

                cy.get("[data-cy='pokemon-card-header-main-section']").as("headerMainSection").should("exist").then(() => {
                    cy.get("@headerMainSection").find("div").eq(0).should("not.have.attr", "src");
                    cy.get("@headerMainSection").find("strong").eq(0).should("have.text", interception.response.body.name);
                });
            });

            cy.wait("@squirtleSpecies").then((interception) => {
                expect(interception.response.statusCode).to.eq(200);
                expect(interception.response.body.evolves_from_species).to.eq(null);
            });

            cy.get("@headerGenusSection").find("button").click();
            cy.get("@pokemonCard").should("not.exist");
        });
    });

    it("Should not display the card when there's an internal server error, instead the error message should be displayed", () => {
        cy.intercept("GET", pokemonUrl("pokemon", "blastoise"), (req) => {
            req.reply({
                delay: 1000,
                statusCode: 500
            });
        }).as("blastoiseError");

        cy.intercept("GET", pokemonUrl("pokemon-species", "blastoise"), (req) => {
            req.reply({
                delay: 1000,
                statusCode: 500
            });
        }).as("blastoiseSpeciesError");

        cy.get("[data-cy='navbar-search-input']").as("searchboxSearchInput").click().then(() => {
            cy.get("@searchboxSearchInput").type("bLasToIsE");
            cy.get("[data-cy='blastoise']").click({ force: true });
        });

        cy.get("[data-cy='loading-pokemon-alert']").as("loadingAlert").should("exist").and("be.visible");
        cy.get("[data-cy='error-message-modal']").as("errorMessage").should("exist").and("be.visible");
    
        cy.get("@errorMessage").find("button").then(($button) => {
            cy.get($button).click({ force: true });
        });
        cy.get("@errorMessage").should("not.exist");
    });

    it("Should display the card even when the server response is delayed", () => {
        cy.intercept("GET", pokemonUrl("pokemon", "blastoise"), (req) => {
            req.reply({
                delay: 5000,
                fixture: "blastoise.json"
            });
        }).as("blastoise");

        cy.intercept("GET", pokemonUrl("pokemon-species", "blastoise"), (req) => {
            req.reply({
                delay: 5000,
                fixture: "blastoiseSpecies.json"
            });
        }).as("blastoiseSpecies");

        cy.get("[data-cy='grid-board']").as("gridBoard").should("exist");
        cy.get("[data-cy='blastoise-grid']").as("blastoiseGrid").should("exist").then(() => {
            cy.get("@blastoiseGrid").click({ force: true });
        });

        cy.wait("@blastoise").then((interception) => {
            cy.get("[data-cy='pokemon-card-modal']").as("pokemonCard").should("exist");
            expect(interception.response.statusCode).to.eq(200);
            cy.get("[data-cy='pokemon-card-header-main-section']").as("headerMainSection").should("exist").then(() => {
                cy.get("@headerMainSection").find("strong").eq(0).should("have.text", interception.response.body.name);
            });
        });

        cy.wait("@blastoiseSpecies").then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
        });
    });

    it("Should display the error message when the server returns an empty response", () => {
        cy.intercept("GET", pokemonUrl("pokemon", "blastoise"), (req) => {
            req.reply({
                fixture: "emptyResponse.json"
            });
        }).as("emptyBlastoiseResponse");

        cy.intercept("GET", pokemonUrl("pokemon-species", "blastoise"), (req) => {
            req.reply({
                fixture: "emptyResponse.json"
            });
        }).as("emptyBlastoiseSpeciesResponse");

        cy.get("[data-cy='grid-board']").as("gridBoard").should("exist");
        cy.get("[data-cy='blastoise-grid']").as("blastoiseGrid").should("exist").then(() => {
            cy.get("@blastoiseGrid").click({ force: true });
        });

        cy.wait("@emptyBlastoiseResponse").then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            expect(interception.response.body).to.deep.eq({});
            expect(interception.response.body.results).to.eq(undefined);
        });

        cy.wait("@emptyBlastoiseSpeciesResponse").then((interception) => {
            expect(interception.response.statusCode).to.eq(200);
            expect(interception.response.body).to.deep.eq({});
            expect(interception.response.body.results).to.eq(undefined);
        });

        cy.get("[data-cy='error-message-modal']").as("errorMessage").should("exist").and("be.visible");
        cy.get("@errorMessage").find("button").click();
    });

    it("Should display the error message when the server returns a no content response", () => {
        cy.intercept("GET", pokemonUrl("pokemon", "blastoise"), (req) => {
            req.reply({
                delay: 1000,
                statusCode: 204,
            });
        }).as("noContentBlastoise");

        cy.get("[data-cy='grid-board']").as("gridBoard").should("exist");
        cy.get("[data-cy='blastoise-grid']").as("blastoiseGrid").should("exist").then(() => {
            cy.get("@blastoiseGrid").click({ force: true });
        });

        cy.get("[data-cy='loading-pokemon-alert']").should("exist");
        cy.get("[data-cy='pokemon-card-modal']").should("not.exist");

        cy.wait("@noContentBlastoise").then((interception) => {
            expect(interception.response.statusCode).to.eq(204);
        });

        cy.get("[data-cy='error-message-modal']").as("errorMessage").should("exist").and("be.visible").then(() => {
            cy.get("@errorMessage").find("button").click({ force: true });
        });
        
        cy.get("@errorMessage").should("not.exist");
    });
});