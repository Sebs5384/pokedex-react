import { render, screen, within, waitFor, fireEvent } from "@testing-library/react";
import PokemonCardHeader from "../PokemonCardHeader";
import "@testing-library/jest-dom";

describe("PokemonCardHeader", () => {
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

    it("Should render PokemonCardHeader correctly", () => {
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

    it("Should call closeModal function when clicking the close button", async () => {
        const { unmount } = render(<PokemonCardHeader 
            selectedCard={selectedCard}
            pokemonSprite={pokemonSprite}
            closeModal={closeModalMock}
            selectPreviousEvolution={selectPreviousEvolutionMock}
        />);
        closeModalMock.mockImplementation(() => {
            unmount();
        });

        const cardHeader = screen.getByTestId("pokemon-card-header");
        const closeButton = screen.getByTestId("pokemon-card-close-button");

        expect(cardHeader).toBeInTheDocument();
        expect(cardHeader).toBeVisible();
        fireEvent.click(closeButton);
        
        await waitFor(() => {
            expect(cardHeader).not.toBeInTheDocument();
            expect(closeModalMock).toHaveBeenCalledTimes(1);
        });
    });

    it("Should call selectPreviousEvolution function when clicking on the previous evolution image", async () => {
        render(<PokemonCardHeader
            selectedCard={selectedCard}
            pokemonSprite={pokemonSprite}
            closeModal={closeModalMock}
            selectPreviousEvolution={selectPreviousEvolutionMock}
        />);

        const previousEvolutionImage = screen.getByTestId("previous-evolution-image");
        fireEvent.click(previousEvolutionImage);
            
        expect(previousEvolutionImage).toBeInTheDocument();
        expect(previousEvolutionImage).toHaveAttribute("src", "mock-previous-sprite.png");
        expect(selectPreviousEvolutionMock).toHaveBeenCalledTimes(1);
    });

    it("Should not render the previous evolution image if there is no previous evolution", async () => {
        render(<PokemonCardHeader
            selectedCard={{...selectedCard, evolutionGenus: {
                name: "",
                id: "1",
                genus: "Test Pokemon",
            }}}
            pokemonSprite={{ ...pokemonSprite, previous: null }}
            closeModal={closeModalMock}
            selectPreviousEvolution={selectPreviousEvolutionMock}
        />);

        const genusSection = screen.getByTestId("pokemon-card-header-genus-section");
        const mainSection = screen.getByTestId("pokemon-card-header-main-section");
        const previousEvolutionPlaceholder = screen.getByTestId("previous-evolution-placeholder");
        const genusSectionText = within(genusSection).getAllByText(/./);

        expect(genusSection).toBeInTheDocument();
        expect(mainSection).toBeInTheDocument();
        expect(previousEvolutionPlaceholder).toBeInTheDocument();
        expect(genusSectionText[0]).toHaveTextContent("Test Pokemon");
    });

    it("Should not call selectPreviousEvolution function if there is no previous evolution", async () => {
        render(<PokemonCardHeader
            selectedCard={{...selectedCard, evolutionGenus: {
                name: "",
                id: "1",
                genus: "Test Pokemon",
            }}}
            pokemonSprite={{ ...pokemonSprite, previous: null }}
            closeModal={closeModalMock}
            selectPreviousEvolution={selectPreviousEvolutionMock}
        />);

        const previousEvolutionPlaceholder = screen.getByTestId("previous-evolution-placeholder");
        fireEvent.click(previousEvolutionPlaceholder);

        expect(selectPreviousEvolutionMock).toHaveBeenCalledTimes(0);
    });
});