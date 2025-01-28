import { render, screen, fireEvent } from "@testing-library/react";
import CatchPokemon from "../CatchPokemon";
import "@testing-library/jest-dom";

describe("CatchPokemon", () => {
    const mockProps = {
        selectPokemon: jest.fn(),
        isShaking: false,
        caughtPokemons: [null, null, null],
        caughtPokemonSprite: [],
        handlePokeballClick: jest.fn(),
    };
    
    it("Should render CatchPokemon correctly", () => {
        render(<CatchPokemon {...mockProps} />);

        const pokeballButton = screen.getByTestId("pokeball-button");
        const catchPokemonImage = screen.getByTestId("catch-a-pokemon-image");
        const pokeSlots = screen.getByTestId("navbar-poke-slot");
        const firstPokemonSlot = screen.getByTestId("caught-pokemon-0");
        const secondPokemonSlot = screen.getByTestId("caught-pokemon-1");
        const thirdPokemonSlot = screen.getByTestId("caught-pokemon-2");

        expect(pokeballButton).toBeInTheDocument();
        expect(catchPokemonImage).toBeInTheDocument();
        expect(pokeSlots).toBeInTheDocument();
        expect(firstPokemonSlot).toBeInTheDocument();
        expect(secondPokemonSlot).toBeInTheDocument();
        expect(thirdPokemonSlot).toBeInTheDocument();

        expect(pokeballButton).not.toHaveClass("poke-shake");
        expect(firstPokemonSlot).toHaveAttribute("alt", "PokeLen");
        expect(secondPokemonSlot).toHaveAttribute("alt", "PokeLen");
        expect(thirdPokemonSlot).toHaveAttribute("alt", "PokeLen");

        expect(mockProps.selectPokemon).toHaveBeenCalledTimes(0);
        expect(mockProps.handlePokeballClick).toHaveBeenCalledTimes(0);
    });

    it("Should add the poke-shake class when isShaking is true", () => {
        render(<CatchPokemon {...mockProps} isShaking={true} />);

        const pokeballButton = screen.getByTestId("pokeball-button");

        expect(pokeballButton).toBeInTheDocument();
        expect(pokeballButton).toHaveClass("poke-shake");
    });

    it("Should call handlePokeballClick when clicking on the pokeball button", () => {
        render(<CatchPokemon {...mockProps} />);

        const pokeballButton = screen.getByTestId("pokeball-button");
        fireEvent.click(pokeballButton);

        expect(pokeballButton).toBeInTheDocument();
        expect(mockProps.handlePokeballClick).toHaveBeenCalledTimes(1);
    });

    it("Should call selectPokemon when clicking on a filled pokemon slot", () => {
        render(<CatchPokemon 
            {...mockProps} 
            caughtPokemons={[{ fullName: "testmeleon" }, null, null]}   
        />);
        
        const firstPokemonSlot = screen.getByTestId("caught-pokemon-0");
        fireEvent.click(firstPokemonSlot);

        expect(firstPokemonSlot).toBeInTheDocument();
        expect(mockProps.selectPokemon).toHaveBeenCalledTimes(1);
    });

    it("Should not call selectPokemon when clicking on an empty pokemon slot", () => {
        render(<CatchPokemon {...mockProps} />);

        const thirdPokemonSlot = screen.getByTestId("caught-pokemon-2");
        fireEvent.click(thirdPokemonSlot);

        expect(thirdPokemonSlot).toBeInTheDocument();
        expect(mockProps.selectPokemon).toHaveBeenCalledTimes(0);
    });

    it("Should fill the pokemon slots correctly when caughtPokemons and caughtPokemonSprite are provided", () => {
        render(<CatchPokemon 
            {...mockProps} 
            caughtPokemons={[{ fullName: "testasaur" }, { fullName: "testrtle" }, { fullName: "testmander" }]}
            caughtPokemonSprite={[{ current: "testasaur.png" }, { current: "testrtle.png" }, { current: "testmander.png" }]}
        />);

        const firstPokemonSlot = screen.getByTestId("caught-pokemon-0");
        const secondPokemonSlot = screen.getByTestId("caught-pokemon-1");
        const thirdPokemonSlot = screen.getByTestId("caught-pokemon-2");

        expect(firstPokemonSlot).toBeInTheDocument();
        expect(firstPokemonSlot).toHaveAttribute("alt", "testasaur");
        expect(firstPokemonSlot).toHaveAttribute("src", "testasaur.png");
        expect(secondPokemonSlot).toBeInTheDocument();
        expect(secondPokemonSlot).toHaveAttribute("alt", "testrtle");
        expect(secondPokemonSlot).toHaveAttribute("src", "testrtle.png");
        expect(thirdPokemonSlot).toBeInTheDocument();
        expect(thirdPokemonSlot).toHaveAttribute("alt", "testmander");
        expect(thirdPokemonSlot).toHaveAttribute("src", "testmander.png");
    });
});