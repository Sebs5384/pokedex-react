import { render, screen } from "@testing-library/react";
import RegistrationBody from "../RegistrationBody";
import "@testing-library/jest-dom";

describe("RegistrationBody", () => {
    const pokemon = {
        name: "testmeleon",
        id: 2,
        evolutionGenus: {
            name: "Evolves from Testmander",
            id: "1",
            genus: "Test Pokemon",
        },
        height: "2",
        weight: "3",
    };
    const pokemonSprite = [{ current: "mock-sprite.png" }];

    it("Should render RegistrationBody correctly", () => {
        render(<RegistrationBody 
            pokemon={pokemon} 
            pokemonSprite={pokemonSprite} 
        />);
        const registrationBody = screen.getByTestId("registration-body");
        const registrationImage = screen.getByTestId("registration-image");
        const registrationName = screen.getByTestId("registration-pokemon-name");
        const registrationGenus = screen.getByTestId("registration-pokemon-genus");
        const registrationWeigth = screen.getByTestId("registration-pokemon-weight");
        const registrationHeight = screen.getByTestId("registration-pokemon-height");

        expect(registrationBody).toBeInTheDocument();
        expect(registrationImage).toBeInTheDocument();
        expect(registrationName).toBeInTheDocument();
        expect(registrationGenus).toBeInTheDocument();
        expect(registrationWeigth).toBeInTheDocument();
        expect(registrationHeight).toBeInTheDocument();

        expect(registrationImage).toHaveAttribute("src", "mock-sprite.png");
        expect(registrationName).toHaveTextContent("Nº 2 TESTMELEON");
        expect(registrationGenus).toHaveTextContent("TEST POKEMON");
        expect(registrationHeight).toHaveTextContent("2");
        expect(registrationWeigth).toHaveTextContent("3");
    });

    it("Should still render the component when props are null", () => {
        render(<RegistrationBody 
            pokemon={null} 
            pokemonSprite={null} 
        />);
        
        const registrationBody = screen.getByTestId("registration-body");
        const registrationImage = screen.getByTestId("registration-image");
        const registrationName = screen.getByTestId("registration-pokemon-name");
        const registrationGenus = screen.getByTestId("registration-pokemon-genus");
        const registrationWeigth = screen.getByTestId("registration-pokemon-weight");
        const registrationHeight = screen.getByTestId("registration-pokemon-height");
        
        expect(registrationBody).toBeInTheDocument();
        expect(registrationImage).toBeInTheDocument();
        expect(registrationName).toBeInTheDocument();
        expect(registrationGenus).toBeInTheDocument();
        expect(registrationWeigth).toBeInTheDocument();
        expect(registrationHeight).toBeInTheDocument();

        expect(registrationImage).not.toHaveAttribute("src");
        expect(registrationName).toHaveTextContent("Nº");
        expect(registrationGenus).toHaveTextContent("");
        expect(registrationHeight).toHaveTextContent('"');
        expect(registrationWeigth).toHaveTextContent("LBS.");
    });
});