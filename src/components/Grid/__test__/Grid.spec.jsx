import { render, screen, fireEvent, within } from "@testing-library/react";
import { PokedexContext } from "../../../context/PokedexContext";
import Grid from "../Grid";
import "@testing-library/jest-dom";

describe("Grid", () => {
    const Wrapper = ({ children, value }) => {
        return (
            <PokedexContext.Provider value={value}>
                {children}
            </PokedexContext.Provider>
        );
    };

    it("Should render Grid properly", () => {
        const mockedContextValue = {
            pagination: {
                pokemonsInPage: [
                    { name: "bulbasaur", sprite: "bulbasaur.png", id: 1 },
                    { name: "charmander", sprite: "charmander.png", id: 2 },
                ],
                loadingPokemons: false,
                paginatorError: false,
                noCards: false,
            },
            card: {
                handleSelectedCard: jest.fn(),
            }
        };

        render(<Grid />, { 
            wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper> 
        });

        const grid = screen.getByTestId("grid-section");
        expect(grid).toBeInTheDocument();
        expect(grid).toBeVisible();

        const gridBoard = screen.getByTestId("grid-board");
        expect(gridBoard).toBeInTheDocument();
        expect(gridBoard).toBeVisible();

        const bulbasaurGridCard = screen.getByTestId("bulbasaur-grid");
        expect(bulbasaurGridCard).toBeInTheDocument();
        expect(bulbasaurGridCard).toBeVisible();
        expect(within(bulbasaurGridCard).getByRole("img")).toHaveAttribute("src", "bulbasaur.png");
        expect(within(bulbasaurGridCard).getByText((content) => content.includes("bulbasaur"))).toBeInTheDocument();

        const charmanderGrid = screen.getByTestId("charmander-grid");
        expect(charmanderGrid).toBeInTheDocument();
        expect(charmanderGrid).toBeVisible();
        expect(within(charmanderGrid).getByRole("img")).toHaveAttribute("src", "charmander.png");
        expect(within(charmanderGrid).getByText((content) => content.includes("charmander"))).toBeInTheDocument(); 
    });

    it("Should call handleSelectedCard when a pokemon in the Grid is clicked", () => {
        const mockedContextValue = {
            pagination: {
                pokemonsInPage: [
                    { name: "bulbasaur", sprite: "bulbasaur.png", id: 1 },
                ],
            },
            card: {
                handleSelectedCard: jest.fn(),
            }
        };
        
        render(<Grid />, {
            wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper>
        });

        const gridBulbasaur = screen.getByTestId("bulbasaur-grid");
        fireEvent.click(gridBulbasaur);
        expect(mockedContextValue.card.handleSelectedCard).toHaveBeenCalledTimes(1);
        expect(mockedContextValue.card.handleSelectedCard).toHaveBeenCalledWith("bulbasaur");
    }); 

    it("Should display the loading animation when loadingPokemons is true", () => {
        const mockedContextValue = {
            pagination: {
                loadingPokemons: true,
            }
        };

        render(<Grid />, {
            wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper>
        });

        const grid = screen.getByTestId("grid-section");
        expect(grid).toBeInTheDocument();

        const loadingSpinner = screen.getByTestId("loading-grid-spinner");
        expect(loadingSpinner).toBeInTheDocument();
        expect(loadingSpinner).toBeVisible();

        const loadingText = screen.getByTestId("loading-grid-text");
        expect(loadingText).toBeInTheDocument();
        expect(loadingText).toBeVisible();
        expect(loadingText).toHaveTextContent("Loading Pokemons...");
    });

    it("Should display the grid error card when paginatorError is true", () => {
        const mockedContextValue = {
            pagination: {
                paginatorError: true,
            }
        };

        render(<Grid />, {
            wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper>
        });

        const errorCard = screen.getByTestId("grid-error-card");
        expect(errorCard).toBeInTheDocument();
        expect(errorCard).toBeVisible();
        expect(within(errorCard).getByText((content) => 
            content.includes("Seems like there's no cards to display try again later")
        )).toBeInTheDocument();
    });

    it("Should display the error card when noCards is true", () => {
        const mockedContextValue = {
            pagination: {
                noCards: false,
                loadingPokemons: true,
            }
        };

        const { rerender } = render(<Grid />, {
            wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper>
        });

        const loadingSpinner = screen.queryByTestId("loading-grid-spinner");
        expect(loadingSpinner).toBeInTheDocument();
        mockedContextValue.pagination.loadingPokemons = false;
        mockedContextValue.pagination.noCards = true;

        rerender(<Grid />, {
            wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper>
        });

        const errorCard = screen.getByTestId("grid-error-card");
        expect(errorCard).toBeInTheDocument();
        expect(errorCard).toBeVisible();
        expect(within(errorCard).getByText((content) => 
            content.includes("Seems like there's no cards to display try again later")
        )).toBeInTheDocument();
    });     
});