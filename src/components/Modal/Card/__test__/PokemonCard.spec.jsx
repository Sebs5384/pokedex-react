import { render, screen, fireEvent, within } from "@testing-library/react";
import { PokedexContext } from "../../../../context/PokedexContext";
import PokemonCard from "../PokemonCard";
import "@testing-library/jest-dom";

describe("PokemonCard", () => {
    const Wrapper = ({ children, value }) => {
        return (
            <PokedexContext.Provider value={value}>
                {children}
            </PokedexContext.Provider>
        );
    };

    it("Should render PokemonCard correctly", () => {
        const mockedContextValue = {
            modalVisibility: true,
            cardData: {
                id: 1,
                name: "bulbasaur",
                skills: { firstSkill: "overgrow", secondSkill: "chlorophyll" },
                stats: { hp: 1, attack: 2, defense: 3, specialAttack: 4, specialDefense: 5, speed: 6 },
                types: { mainType: "grass", secondaryType: "poison" },
                height: 7,
                weight: 8,
                typeAdvantage: { weakness: "fire", resistance: "water" },
                evolutionGenus: { name: "Basic Pokemon", id: "None", genus: "" },
                description: "A strange test case was planted on its back at birth.",
                advantageImage: { weakness: "fire", resistance: "water", retreat: "grass" },
                typeImage: { mainType: "grass", secondaryType: "poison" },
            },
            pokemonSprite: { current: "someRandomSpriteUrl.png" },
            loadingCard: false,
            loadingCardText: "",
            emptyCardData: false,
            cardError: false,
            cardSpeciesError: false,
            cardErrorMessageVisibility: false,
            errorCauseMessage: "",
            errorMessage: "",
            handleCloseCard: jest.fn(),
            handleSelectedCard: jest.fn(),
            handleCloseErrorMessage: jest.fn(),
        };

        render(<PokemonCard />, { 
            wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper> 
        });

        const pokemonCard = screen.getByTestId("pokemon-card-modal");
        expect(pokemonCard).toBeInTheDocument();
        expect(pokemonCard).toBeVisible();

        const cardHeader = screen.getByTestId("pokemon-card-header");
        expect(cardHeader).toBeInTheDocument();
        expect(cardHeader).toHaveTextContent("bulbasaur");
        expect(within(cardHeader).getByText("Basic Pokemon")).toBeInTheDocument();

        const cardBody = screen.getByTestId("pokemon-card-body");
        expect(cardBody).toBeInTheDocument();   
        expect(within(cardBody).getByAltText("bulbasaur")).toHaveAttribute("src", "someRandomSpriteUrl.png");

        const cardFooter = screen.getByTestId("pokemon-card-footer");
        expect(cardFooter).toBeInTheDocument();
        expect(cardFooter).toHaveTextContent("A strange test case was planted on its back at birth.")

        const closeButton = screen.getByTestId("pokemon-card-close-button");
        expect(closeButton).toBeInTheDocument();
        expect(closeButton).toBeVisible();
    });

    it("Shouldn't display the pokemon card when the visibility is false", () => {
        const mockedContextValue = {
            modalVisibility: false,
        };

        render(<PokemonCard />, { 
            wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper> 
        });

        const pokemonCard = screen.queryByTestId("pokemon-card-modal");
        expect(pokemonCard).not.toBeInTheDocument();
    });

    it("Should display the loading alert when the loadingCard prop is true", () => {
        const mockedContextValue = {
            loadingCard: true,
        };

        const { rerender } = render(<PokemonCard />, { 
            wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper> 
        });

        const loadingAlert = screen.getByTestId("loading-pokemon-alert");
        expect(loadingAlert).toBeInTheDocument();
        expect(loadingAlert).toBeVisible();
        mockedContextValue.loadingCard = false;

        rerender(<PokemonCard />, { wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper> }); 
        expect(loadingAlert).not.toBeInTheDocument();
    });

    it("Should display the error message when the cardError prop is true", () => {
        const mockedContextValue = {
            cardError: true,
            cardSpeciesError: false,
            cardErrorMessageVisibility: true,
        };

        const { rerender } = render(<PokemonCard />, { 
            wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper> 
        });

        const errorMessage = screen.getByTestId("error-message-modal");
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage).toBeVisible();

        mockedContextValue.cardError = false;
        mockedContextValue.cardErrorMessageVisibility = false;

        rerender(<PokemonCard />, { 
            wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper> 
        }); 

        expect(errorMessage).not.toBeInTheDocument();
    });

    it("Should display the error message when empty card data is true", () => {
        const mockedContextValue = {
            emptyCardData: {},
        };

        const { rerender } = render(<PokemonCard />, { 
            wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper> 
        });

        const errorMessage = screen.getByTestId("error-message-modal");
        expect(errorMessage).toBeInTheDocument();
        mockedContextValue.emptyCardData = false;

        rerender(<PokemonCard />, { 
            wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper> 
        });
        expect(errorMessage).not.toBeInTheDocument();
    });

    it("Should close the pokemon card when close button is clicked", () => {
        const mockedContextValue = {
            modalVisibility: true,
            cardData: {
                id: 1,
                name: "super test pokemon",
                skills: { firstSkill: "test", secondSkill: "test" },
                stats: { hp: 1, attack: 2, defense: 3, specialAttack: 4, specialDefense: 5, speed: 6 },
                types: { mainType: "test", secondaryType: "test" },
                height: 7,
                weight: 8,
                typeAdvantage: { weakness: "SOLID", resistance: "bug" },
                evolutionGenus: { name: "Basic Pokemon", id: "None", genus: "" },
                description: "A strange test case was planted on its back at birth.",
                advantageImage: { weakness: "fire", resistance: "water", retreat: "grass" },
                typeImage: { mainType: "grass", secondaryType: "poison" },
            },
            handleCloseCard: jest.fn(),
        };

        const { rerender } = render(<PokemonCard />, {
            wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper>
        });

        const pokemonCard = screen.getByTestId("pokemon-card-modal");
        expect(pokemonCard).toBeInTheDocument();
        const closeButton = screen.getByTestId("pokemon-card-close-button");
        fireEvent.click(closeButton);

        mockedContextValue.modalVisibility = false;
        mockedContextValue.cardData = null;
        expect(mockedContextValue.handleCloseCard).toHaveBeenCalledTimes(1);
        expect(mockedContextValue.modalVisibility).toBe(false);

        rerender(<PokemonCard />, { 
            wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper> 
        });

        expect(pokemonCard).not.toBeInTheDocument();
        expect(closeButton).not.toBeInTheDocument();
        expect(mockedContextValue.handleCloseCard).toHaveBeenCalledTimes(1);
    });

    it("Should call the handleSelectedCard when the previous evolution image is clicked", () => {
        const mockedContextValue = {
            modalVisibility: true,
            cardData: {
                id: 6,
                name: "super test pokemon",
                skills: { firstSkill: "test", secondSkill: "test" },
                stats: { hp: 1, attack: 2, defense: 3, specialAttack: 4, specialDefense: 5, speed: 6 },
                types: { mainType: "test", secondaryType: "test" },
                height: 7,
                weight: 8,
                typeAdvantage: { weakness: "SOLID", resistance: "bug" },
                evolutionGenus: { name: "Evolves from Testmeleon", id: "6", genus: "Test pokemon" },
                description: "A strange test case was planted on its back at birth.",
                advantageImage: { weakness: "fire", resistance: "water", retreat: "grass" },
                typeImage: { mainType: "grass", secondaryType: "poison" },
            },
            pokemonSprite: { previous: "someRandomTestImageToTestCardFunction.png" },
            handleSelectedCard: jest.fn(),
        };

        const { rerender } = render(<PokemonCard />, {
            wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper>
        });

        const pokemonCard = screen.getByTestId("pokemon-card-modal");
        expect(pokemonCard).toBeInTheDocument();

        const previousEvolutionImage = screen.getByTestId("previous-evolution-image");
        expect(previousEvolutionImage).toBeInTheDocument();
        expect(previousEvolutionImage).toHaveAttribute("src", "someRandomTestImageToTestCardFunction.png");
        fireEvent.click(previousEvolutionImage);

        expect(mockedContextValue.handleSelectedCard).toHaveBeenCalledTimes(1);
        mockedContextValue.cardData.evolutionGenus = { name: "Basic Pokemon", id: "None", genus: "Test pokemon" };
        mockedContextValue.pokemonSprite.previous = null;
        
        rerender(<PokemonCard />, { 
            wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper> 
        });

        fireEvent.click(previousEvolutionImage);
        expect(mockedContextValue.handleSelectedCard).toHaveBeenCalledTimes(1);
        expect(previousEvolutionImage).not.toBeInTheDocument();
    });

    it("Should call the handleCloseErrorMessage when clicking the close button", () => {
        const mockedContextValue = {
            cardError: true,
            cardErrorMessageVisibility: true,
            handleCloseErrorMessage: jest.fn(),
        };
        
        const { rerender } = render(<PokemonCard />, {
            wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper>
        });

        const errorMessage = screen.getByTestId("error-message-modal");
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage).toBeVisible();

        const errorCloseButton = screen.getByTestId("error-close-button");
        expect(errorCloseButton).toBeInTheDocument();
        expect(errorCloseButton).toBeVisible();

        fireEvent.click(errorCloseButton);
        expect(mockedContextValue.handleCloseErrorMessage).toHaveBeenCalledTimes(1);
        mockedContextValue.cardError = false;
        mockedContextValue.cardErrorMessageVisibility = false;

        rerender(<PokemonCard />, { 
            wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper> 
        });

        expect(errorMessage).not.toBeInTheDocument();
        expect(errorCloseButton).not.toBeInTheDocument();
    });
});