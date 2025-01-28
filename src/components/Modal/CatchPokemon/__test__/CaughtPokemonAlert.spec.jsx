import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PokedexContext } from "../../../../context/PokedexContext";
import CaughtPokemonAlert from "../CaughtPokemonAlert";
import "@testing-library/jest-dom";
import { wait } from "@testing-library/user-event/dist/cjs/utils/index.js";

describe("CaughtPokemonAlert", () => {
    const Wrapper = ({ children, value }) => {
        return (
            <PokedexContext.Provider value={value}>
                {children}
            </PokedexContext.Provider>
        );
    };

    it("Should render CaughtPokemonAlert correctly", () => {
        const mockedContextValue = {
            catchPokemon: {
                caughtModalVisibility: true,
                textChange: true,
                topText: "You've caught a test",
                bottomText: "Test was caught"
            }
        };
        
        render(<CaughtPokemonAlert />, { 
            wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper>
        });

        const caughtPokemonAlert = screen.getByTestId("caught-pokemon-alert-modal");
        expect(caughtPokemonAlert).toBeInTheDocument();
        expect(caughtPokemonAlert).toBeVisible();

        const caughtPokemonTopText = screen.getByTestId("registration-top-text");
        expect(caughtPokemonTopText).toBeInTheDocument();
        expect(caughtPokemonTopText).toHaveTextContent("You've caught a test");
        expect(caughtPokemonTopText).toBeVisible();
        
        const caughtPokemonBottomText = screen.getByTestId("registration-bottom-text");
        expect(caughtPokemonBottomText).toBeInTheDocument();
        expect(caughtPokemonBottomText).toHaveTextContent("Test was caught");
        waitFor(() => expect(caughtPokemonBottomText).toBeVisible());
    });

    it("Shouldn't render the component when visibility is false", () => {
        const mockedContextValue = {
            catchPokemon: {
                caughtModalVisibility: false
            }
        };

        render(<CaughtPokemonAlert />, { 
            wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper>
        });

        const caughtPokemonAlert = screen.queryByTestId("caught-pokemon-alert-modal");
        expect(caughtPokemonAlert).not.toBeInTheDocument();
    });

    it("Should render an empty message if the text props are empty strings", () => {
        const mockedContextValue = {
            catchPokemon: {
                caughtModalVisibility: true,
                topText: "",
                bottomText: "",
                textChange: true,
            }
        };

        render(<CaughtPokemonAlert />, {
            wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper>
        });

        const caughtPokemonTopText = screen.getByTestId("registration-top-text");
        expect(caughtPokemonTopText).toBeInTheDocument();
        expect(caughtPokemonTopText).toHaveTextContent("");

        const caughtPokemonBottomText = screen.getByTestId("registration-bottom-text");
        expect(caughtPokemonBottomText).toBeInTheDocument();
        expect(caughtPokemonBottomText).toHaveTextContent("");
    });

    it("Should change texts successfully", () => {
        const mockedContextValue = {
            catchPokemon: {  
                caughtModalVisibility: true,
                topText: "You've caught a test",
                bottomText: "Test was caught",
                textChange: true,
            }
        };

        const {rerender } = render(<CaughtPokemonAlert />, {
            wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper>
        });

        const caughtPokemonTopText = screen.getByTestId("registration-top-text");
        expect(caughtPokemonTopText).toBeInTheDocument();
        expect(caughtPokemonTopText).toHaveTextContent("You've caught a test");

        const caughtPokemonBottomText = screen.getByTestId("registration-bottom-text");
        expect(caughtPokemonBottomText).toBeInTheDocument();
        expect(caughtPokemonBottomText).toHaveTextContent("Test was caught");

        mockedContextValue.catchPokemon.textChange = false;
        mockedContextValue.catchPokemon.topText = "Test has been added";
        mockedContextValue.catchPokemon.bottomText = "To the Pokedex";

        rerender(<CaughtPokemonAlert />, {
            wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper>
        });

        expect(caughtPokemonTopText).toHaveTextContent("Test has been added");
        expect(caughtPokemonBottomText).toHaveTextContent("To the Pokedex");
    });
});