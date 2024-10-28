import { render, screen, fireEvent } from "@testing-library/react";
import ImageContainer from "../ImageContainer";
import "@testing-library/jest-dom";

describe("ImageContainer", () => {
    it("Renders with the correct src, alt and className", () => {
        render(
            <ImageContainer
                src="pokemonCard.png"
                alt="pokemonName"
                className="poke-class"
            />
        );

        const image = screen.getByAltText("pokemonName");
        
        expect(image).toBeInTheDocument();
        expect(image).toHaveClass("poke-class");
        expect(image).toHaveAttribute("src", "pokemonCard.png");
        expect(image).toHaveAttribute("alt", "pokemonName");
    });

    it("Calls the onClick function when clicked", () => {
        const onClick = jest.fn();

        render(
            <ImageContainer
                src="pokemonCard.png"
                alt="pokemonName"
                className="poke-class"
                onClick={onClick}
            />
        );

        const image = screen.getByAltText("pokemonName");
        fireEvent.click(image);

        expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("Should display alt text if src is not provided or fails to load", () => {
        render(
            <ImageContainer
                src=""
                alt="pokemonName"
                className="poke-class"
            />
        );

        const image = screen.getByAltText("pokemonName");
        fireEvent.error(image);

        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute("alt", "pokemonName");
    });
});