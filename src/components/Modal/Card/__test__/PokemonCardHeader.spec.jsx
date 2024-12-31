import { render, screen, within } from "@testing-library/react";
import PokemonCardHeader from "../PokemonCardHeader";
import "@testing-library/jest-dom";

describe("PokemonCardHeader", () => {
    it("Should render PokemonCardHeader correctly", () => {
        const selectedCard = {
            name: "testmeleon",
            stats: {
                hp: "1",
            },
            typeImage: {
                mainTypeIcon: "mock-main-type-icon.png",
            },
            evolutionGenus: {
                name: "Evolves from Testmander",
                id: "1",
                genus: "Test Pokemon",
            },
        };
        const pokemonSprite = {
            current: "mock-sprite.png",
            previous: "mock-previous-sprite.png",
        };
        const closeModalMock = jest.fn();
        const selectPreviousEvolutionMock = jest.fn();

        render(<PokemonCardHeader 
            selectedCard={selectedCard} 
            pokemonSprite={pokemonSprite} 
            closeModal={closeModalMock} 
            selectPreviousEvolution={selectPreviousEvolutionMock} 
        />);

        const cardHeader = screen.getByTestId("pokemon-card-header");
        const headerGenusSection = screen.getByTestId("pokemon-card-header-genus-section");
        const headerMainSection = screen.getByTestId("pokemon-card-header-main-section");
        const headerCloseButton = screen.getByTestId("pokemon-card-close-button");
        const previousEvolutionImage = screen.getByTestId("previous-evolution-image");
        const headerTypeImage = screen.getByTestId("header-type-image");
        const genusSectionText = within(headerGenusSection).getAllByText(/./);
        const mainSectionText = within(headerMainSection).getAllByText(/./);
        
        expect(cardHeader).toBeInTheDocument();
        expect(headerGenusSection).toBeInTheDocument();
        expect(headerMainSection).toBeInTheDocument();
        expect(headerCloseButton).toBeInTheDocument();

        expect(genusSectionText[0]).toHaveTextContent("P.STAGE");
        expect(genusSectionText[1]).toHaveTextContent("Evolves from Testmander");
        expect(genusSectionText[2]).toHaveTextContent("Test Pokemon");

        expect(previousEvolutionImage).toHaveAttribute("src", "mock-previous-sprite.png");
        expect(mainSectionText[0]).toHaveTextContent("testmeleon");
        expect(mainSectionText[1]).toHaveTextContent("1");
        expect(headerTypeImage).toHaveAttribute("src", "mock-main-type-icon.png");
    }); 
});