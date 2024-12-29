import { render, screen, fireEvent } from "@testing-library/react";
import GridCard from "../GridCard";
import "@testing-library/jest-dom";

describe("GridCard", () => {
    const pokemon = {
        id: 1,
        pokemonName: "testmeleon",
        image: "https://somerandom-sprite/1.png",
        selectCard: jest.fn(),
    };

    it("Should render GridCard correctly", () => {
        render(<GridCard {...pokemon} />);
        const gridCard = screen.getByTestId("testmeleon-grid");
        const pokemonName = screen.getByText("#1 testmeleon");
        const pokemonImage = screen.getByRole("img");

        expect(gridCard).toBeInTheDocument();
        expect(pokemonName).toBeInTheDocument();
        expect(pokemonName).toHaveTextContent("#1 testmeleon");
        expect(pokemonImage).toBeInTheDocument();
        expect(pokemonImage).toHaveAttribute("src", "https://somerandom-sprite/1.png");
    });

    it("Should call the selectedCard method when clicked", () => {
        render(<GridCard {...pokemon} />);
        const gridCard = screen.getByTestId("testmeleon-grid");
        fireEvent.click(gridCard);

        expect(pokemon.selectCard).toHaveBeenCalledWith("testmeleon");
        expect(pokemon.selectCard).toHaveBeenCalledTimes(1);
    });

    it("Should handle missing props correctly", () => {
        render(<GridCard selectCard={pokemon.selectCard} />);
        const gridCard = screen.getByTestId("undefined-grid");
        const pokemonName = screen.getByText("#undefined undefined");
        const pokemonImage = screen.getByRole("img");

        expect(gridCard).toBeInTheDocument();
        expect(pokemonName).toBeInTheDocument();
        expect(pokemonName).toHaveTextContent("#undefined undefined");
        expect(pokemonImage).toBeInTheDocument();
        expect(pokemonImage).not.toHaveAttribute("src");
    });

    it("Should handle selectCard method when it is not a function", () => {
        render(<GridCard {...pokemon} selectCard={null} />);
        const gridCard = screen.getByTestId("testmeleon-grid");
        fireEvent.click(gridCard);

        expect(pokemon.selectCard).toHaveBeenCalledTimes(0);
    });
});