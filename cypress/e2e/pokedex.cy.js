describe("Pokedex loading test", () => {
  const localHost = "http://localhost:3000";
  const firstPage = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
  const pokemonList = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
  let firstPageResponseCounter = 0;
  let pokemonListResponseCounter = 0;

  beforeEach(() => {
    cy.visit(localHost);

    cy.intercept("GET", firstPage, (req) => {
      req.on("response", () => {
        firstPageResponseCounter += 1;
      })

      req.reply({
        fixture: "pokedexFirstPage.json"
      });
    }).as("firstPage");

    cy.intercept("GET", pokemonList, (req) => {
      req.on("response", () => {
        pokemonListResponseCounter += 1;
      });

      req.reply({
        fixture: "pokedexSecondPage.json"
      });
    }).as("pokemonList");
  });

  it("Should load the initial pokedex components and data correctly", () => {
    cy.wait("@firstPage").then((interception) => {
      expect(firstPageResponseCounter).to.eq(1);
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body.count).to.eq(1302);
      expect(interception.response.body.results.length).to.eq(20);
    })

    cy.wait("@pokemonList").then((interception) => {
      expect(pokemonListResponseCounter).to.eq(1);
      expect(interception.response.statusCode).to.eq(200);
      expect(interception.response.body.count).to.eq(1302);
    });
    
    cy.get("[data-cy='navbar-section']").should("be.visible");
    cy.get("[data-cy='grid-section']").should("be.visible");
    cy.get("[data-cy='pagination-section']").should("be.visible");
  
    cy.get("[data-cy='loading-pokemon-alert']").should("not.exist");
    cy.get("[data-cy='loading-grid-spinner']").should("not.exist");
    cy.get("[data-cy='caught-pokemon-alert-modal']").should("not.exist");
    cy.get("[data-cy='caught-pokemon-summary-modal']").should("not.exist");
    cy.get("[data-cy='pokemon-card-modal']").should("not.exist");
  });
});
