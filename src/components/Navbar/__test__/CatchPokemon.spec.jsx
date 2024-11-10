import { render, screen, fireEvent } from "@testing-library/react";
import CatchPokemon from "../CatchPokemon";
import "@testing-library/jest-dom";

describe("CatchPokemon", () => {
    it("Should render CatchPokemon correctly", () => {
        render(<CatchPokemon
            selectPokemon={() => {}}
            isShaking={false}
            caughtPokemons={[null, null, null]}
            caughtPokemonSprite={[]}
            handlePokeballClick={() => {}}
        />);

        const pokeballButton = screen.getByTestId("pokeball-button");
        expect(pokeballButton).toBeInTheDocument();
        const catchPokemonImage = screen.getByTestId("catch-a-pokemon-image");
        expect(catchPokemonImage).toBeInTheDocument();
        const navbarPokeSlots = screen.getByTestId("navbar-poke-slot");
        expect(navbarPokeSlots).toBeInTheDocument();
        const firstSlot = screen.getByTestId("caught-pokemon-0");
        expect(firstSlot).toBeInTheDocument();
        const secondSlot = screen.getByTestId("caught-pokemon-1");
        expect(secondSlot).toBeInTheDocument();
        const thirdSlot = screen.getByTestId("caught-pokemon-2");
        expect(thirdSlot).toBeInTheDocument();

        expect(firstSlot).toHaveAttribute("alt", "PokeLen");
        expect(secondSlot).toHaveAttribute("alt", "PokeLen");
        expect(thirdSlot).toHaveAttribute("alt", "PokeLen");
    });

    it("Should render caught pokemons if a populated array is passed as a prop", () => {
        render(<CatchPokemon
            caughtPokemons={[{ fullName: "bulbasaur" }, { fullName: "squirtle" }, { fullName: "charmander" }]}
            caughtPokemonSprite={[{ current: "bulbasaur.png" }, { current: "squirtle.png" }, { current: "charmander.png" }]}
        />);

        const firstSlot = screen.getByTestId("caught-pokemon-0");
        expect(firstSlot).toBeInTheDocument();
        expect(firstSlot).toHaveAttribute("src", "bulbasaur.png");
        expect(firstSlot).toHaveAttribute("alt", "bulbasaur");

        const secondSlot = screen.getByTestId("caught-pokemon-1");
        expect(secondSlot).toBeInTheDocument();
        expect(secondSlot).toHaveAttribute("src", "squirtle.png");
        expect(secondSlot).toHaveAttribute("alt", "squirtle");

        const thirdSlot = screen.getByTestId("caught-pokemon-2");
        expect(thirdSlot).toBeInTheDocument();
        expect(thirdSlot).toHaveAttribute("src", "charmander.png");
        expect(thirdSlot).toHaveAttribute("alt", "charmander");
    });

    it("Should call the selectPokemon function when a caught Pokemon is clicked", () => {
        const mockedSelectPokemon = jest.fn();
        render(<CatchPokemon 
            selectPokemon={mockedSelectPokemon}
            caughtPokemons={[{ fullName: "bulbasaur" }]}
            caughtPokemonSprite={[{ current: "bulbasaur.png" }]}
        />);

        const firstSlot = screen.getByTestId("caught-pokemon-0");
        expect(firstSlot).toBeInTheDocument();
        fireEvent.click(firstSlot);

        expect(mockedSelectPokemon).toHaveBeenCalledTimes(1);
        expect(mockedSelectPokemon).toHaveBeenCalledWith("bulbasaur");
    });

    it("Should call the handlePokeballClick function when the pokeball is clicked", () => {
        let mockedIsShaking = false;
        const mockedHandlePokeballClick = jest.fn(() => {
            mockedIsShaking = true;
        });
        render(<CatchPokemon
            handlePokeballClick={mockedHandlePokeballClick}
            isShaking={mockedIsShaking}
        />);

        const pokeballButton = screen.getByTestId("pokeball-button");
        expect(pokeballButton).toBeInTheDocument();

        fireEvent.click(pokeballButton);
        expect(mockedHandlePokeballClick).toHaveBeenCalledTimes(1);
        expect(mockedIsShaking).toBe(true);
    });

    it("Shouldn't render caught pokemons if an empty array is passed as a prop", () => {
        render(<CatchPokemon
            caughtPokemons={[]}
            caughtPokemonSprite={[]}
        />);

        const navbarPokeSlots = screen.getByTestId("navbar-poke-slot");
        expect(navbarPokeSlots).toBeInTheDocument();

        expect(navbarPokeSlots.childElementCount).toBe(0);
        const firstSlot = screen.queryByTestId("caught-pokemon-0");
        expect(firstSlot).not.toBeInTheDocument();
    });
});