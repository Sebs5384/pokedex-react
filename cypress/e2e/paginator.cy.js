describe("Paginator interaction testing", () => {
    const localHost = "http://localhost:3000";
    const POKEMONS_PER_PAGE = 20;
    
    const getOffset = (currentPage, POKEMONS_PER_PAGE) => {
        return (currentPage - 1) * POKEMONS_PER_PAGE
    };
    const pageUrl = (limit, offset) => {
        return `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
    };

    beforeEach(() => {
        cy.visit(localHost);
        window.localStorage.clear();
    });
    
    it("Should paginate through the app back and forth", () => {
        cy.wait(1000);

        cy.intercept("GET", pageUrl(POKEMONS_PER_PAGE, getOffset(1, POKEMONS_PER_PAGE)), (req) => {
            req.reply({
                fixture: "pokedexFirstPage.json"
            });
        });

        cy.get("[data-cy='pagination-section']").should("exist").then(() => {
            cy.get("[data-cy='paginator-next-button']").as("paginatorNextButton").should("exist");
            cy.get("[data-cy='paginator-previous-button']").as("paginatorPreviousButton").should("exist");
            cy.get("[data-cy='page-1']").as("firstPage").should("exist");
            cy.get("[data-cy='page-2']").as("secondPage").should("exist");
            cy.get("[data-cy='page-3']").as("thirdPage").should("exist");
            cy.get("[data-cy='page-4']").as("fourthPage").should("exist");
            cy.get("[data-cy='page-5']").as("fifthPage").should("exist");
            cy.get("[data-cy='page-6']").as("sixthPage").should("exist");

            cy.get("@firstPage").should("be.visible");
            cy.get("@secondPage").should("be.visible");
            cy.get("@thirdPage").should("be.visible");
            cy.get("@fourthPage").should("not.be.visible");
            cy.get("@fifthPage").should("not.be.visible");
            cy.get("@sixthPage").should("not.be.visible");
        });

        cy.get("@paginatorPreviousButton").should("be.visible").then(() => {
            cy.get("@paginatorPreviousButton").should("have.class", "disabled");
        });

        cy.get("@paginatorNextButton").should("be.visible").then(() => {
            cy.get("@paginatorNextButton").click();

            cy.get("@paginatorPreviousButton").should("not.have.class", "disabled");
            cy.get("@firstPage").should("be.visible");
            cy.get("@secondPage").should("be.visible");
            cy.get("@thirdPage").should("be.visible");
            cy.get("@fourthPage").should("be.visible"); 
        });
    });
});