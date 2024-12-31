import { render, screen, within } from "@testing-library/react";
import PokemonCardFooter from "../PokemonCardFooter";
import "@testing-library/jest-dom";

describe("PokemonCardFooter", () => {
    it("Should render PokemonCardFooter correctly", () => {
        const selectedCard = {
            advantageImage: {
                weakness: "mocked-weakness-image.png",
                resistance: "mocked-resistance-image.png",
                retreat: "mocked-retreat-image.png"
            },
            description: "Testmeleon has a test case on its tail"
        };
    
        render(<PokemonCardFooter selectedCard={selectedCard} />);

        const pokemonCardFooter = screen.getByTestId("pokemon-card-footer");
        const footerAdvantageSection = screen.getByTestId("pokemon-card-footer-advantage-section");
        const footerDescriptionSection = screen.getByTestId("pokemon-card-footer-description-section");
        const footerIcons = within(footerAdvantageSection).getAllByRole("img");
        const footerDescription = within(footerDescriptionSection).getByText("Testmeleon has a test case on its tail");
        
        expect(pokemonCardFooter).toBeInTheDocument();
        expect(footerAdvantageSection).toBeInTheDocument();
        expect(footerDescription).toBeInTheDocument();

        expect(footerIcons[0]).toHaveAttribute("src", "mocked-weakness-image.png");
        expect(footerIcons[1]).toHaveAttribute("src", "mocked-resistance-image.png");
        expect(footerIcons[2]).toHaveAttribute("src", "mocked-retreat-image.png");
        expect(footerDescription).toHaveTextContent("Testmeleon has a test case on its tail");
    });

    it("Should render the component with null props", () => {
        render(<PokemonCardFooter selectedCard={null} />);

        const pokemonCardFooter = screen.getByTestId("pokemon-card-footer");
        const footerAdvantageSection = screen.getByTestId("pokemon-card-footer-advantage-section");
        const footerDescriptionSection = screen.getByTestId("pokemon-card-footer-description-section");
        
        expect(pokemonCardFooter).toBeInTheDocument();
        expect(footerAdvantageSection).toBeInTheDocument();
        expect(footerDescriptionSection).toBeInTheDocument();
    });
});