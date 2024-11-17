import { render, screen, act, waitFor } from "@testing-library/react";
import { PokedexProvider, usePokedexContext } from "../PokedexContext";
import "@testing-library/jest-dom";

jest.mock("../PokedexContext", () => ({
    ...jest.requireActual("../PokedexContext"),
    usePokedexContext: jest.fn()
}))

describe("PokedexContext", () => {
    beforeEach(() => {
        usePokedexContext.mockReturnValue({
            card: { cardData: "This is a mock" },
            pagination: { currentPage: 1 },
            searchbox: { pokemonList: "Testmeleon" },
            catchPokemon: { caughtPokemons: "Testmeleon" },
            error: { message: "Error Message" }
        })
    })

    const MockConsumer = () => {
        const { card, pagination, searchbox, catchPokemon, error } = usePokedexContext();

        return(
            <div>
                <p data-testid={"card-data"}>{card.cardData}</p>
                <p data-testid={"current-page"}>{pagination.currentPage}</p>
                <p data-testid={"pokemon-list"}>{searchbox.pokemonList}</p>
                <p data-testid={"caught-pokemons"}>{catchPokemon.caughtPokemons}</p>
                <p data-testid={"error-message"}>{error.message}</p>
            </div>
        )
    };

    it("Should render the provider and its children", async () => {
        act(() => {
            render(
                <PokedexProvider > 
                    <div data-testid={"mock-children"}>Test</div> 
                </PokedexProvider>
            );
        });

        waitFor(() => {
            expect(screen.getByTestId("mock-children")).toBeInTheDocument();
            expect(screen.getByTestId("mock-children")).toHaveTextContent("Test");
        })
    })

    it("Should render the provider and the consumer", async () => {
   
        act(() => {
            render(
                <PokedexProvider > 
                    <MockConsumer /> 
                </PokedexProvider>
            );
        });
      
        waitFor(() => {
            expect(screen.getByTestId("card-data")).toBeInTheDocument();
            expect(screen.getByTestId("card-data")).toHaveTextContent("This is a mock");
            expect(screen.getByTestId("current-page")).toBeInTheDocument();
            expect(screen.getByTestId("current-page")).toHaveTextContent("1");
            expect(screen.getByTestId("pokemon-list")).toBeInTheDocument();
            expect(screen.getByTestId("pokemon-list")).toHaveTextContent("Testmeleon");
            expect(screen.getByTestId("caught-pokemons")).toBeInTheDocument();
            expect(screen.getByTestId("caught-pokemons")).toHaveTextContent("Testmeleon");
            expect(screen.getByTestId("error-message")).toBeInTheDocument();  
            expect(screen.getByTestId("error-message")).toHaveTextContent("Error Message");
        })
    })
});