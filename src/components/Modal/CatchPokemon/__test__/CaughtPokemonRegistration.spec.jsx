import { render, screen, fireEvent } from "@testing-library/react";
import { PokedexContext } from "../../../../context/PokedexContext";
import CaughtPokemonRegistration from "../CaughtPokemonRegistration";
import "@testing-library/jest-dom";

describe("CaughtPokemonRegistration", () => {
    const Wrapper = ({ children, value }) => {
        return (
            <PokedexContext.Provider value={value}>
                {children}
            </PokedexContext.Provider>
        );
    };
    
    it("Should render CaughtPokemonRegistration correctly", () => {
        const mockedContextValue = {
            registrationModalVisibility: true,
            caughtPokemon: {
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
                advantageImage: { weakness: "flaky", resistance: "bugs", retreat: "DRY" },
                typeImage: { mainType: "test", secondaryType: "testing" },
            },
            caughtPokemonSprite: [
                { current: "someRandomSpriteUrl.png" }
            ],
            caughtPokemonError: false,
            errorCauseMessage: "",
            errorMessage: "",
            caughtPokemonErrorMessageVisibility: false,
            handleCloseErrorMessage: jest.fn(),
        };

        render(<CaughtPokemonRegistration />, {
            wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper>
        });
        
        const summaryModal = screen.getByTestId("caught-pokemon-summary-modal");
        expect(summaryModal).toBeInTheDocument();

        const registrationHeader = screen.getByTestId("registration-header");
        expect(registrationHeader).toBeInTheDocument();
        
        const registrationTitle = screen.getByTestId("registration-title");
        expect(registrationTitle).toBeInTheDocument();
        expect(registrationTitle).toHaveTextContent("POKéDEX registration completed.");
        expect(registrationTitle).toBeVisible();

        const registrationBody = screen.getByTestId("registration-body");
        expect(registrationBody).toBeInTheDocument();

        const registrationImage = screen.getByTestId("registration-image");
        expect(registrationImage).toBeInTheDocument();
        expect(registrationImage).toHaveAttribute("src", "someRandomSpriteUrl.png");
        
        const registrationName = screen.getByTestId("registration-pokemon-name");
        expect(registrationName).toBeInTheDocument();
        expect(registrationName).toHaveTextContent("Nº 6 SUPER TEST POKEMON");
        
        const registrationGenus = screen.getByTestId("registration-pokemon-genus");
        expect(registrationGenus).toBeInTheDocument();
        expect(registrationGenus).toHaveTextContent("TEST POKEMON");

        const registrationDescription = screen.getByTestId("registration-footer-description");
        expect(registrationDescription).toBeInTheDocument();
        expect(registrationDescription).toHaveTextContent("A strange test case was planted on its back at birth.");
    });

    it("Shouldn't render the component when visibility is false", () => {
        const mockedContextValue = {
            registrationModalVisibility: false,
        };

        render(<CaughtPokemonRegistration />, {
            wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper>
        });
        
        const summaryModal = screen.queryByTestId("caught-pokemon-summary-modal");
        expect(summaryModal).not.toBeInTheDocument();
        screen.debug();
    });

    it("Should display the error message when the caughtPokemonError prop is true", () => {
        const mockedContextValue = {
            caughtPokemonError: true,
            caughtPokemonErrorMessageVisibility: true,
        };

        render(<CaughtPokemonRegistration />, {
            wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper>
        });

        const errorMessage = screen.getByTestId("error-message-modal");
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage).toBeVisible();
    });
});