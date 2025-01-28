import { render, screen, fireEvent } from "@testing-library/react";
import LoadingPokemonAlert from "../LoadingPokemonAlert";
import "@testing-library/jest-dom";

describe("LoadingPokemonAlert", () => {
    it("Should render LoadingPokemonAlert correctly", () => {
        render(<LoadingPokemonAlert 
            alertVisibility={true} 
            alertText={"Loading..."} 
        />);

        const loadingAlert = screen.getByTestId("loading-pokemon-alert");
        expect(loadingAlert).toBeInTheDocument();
        expect(loadingAlert).toBeVisible();

        const loadingText = screen.getByTestId("loading-text");
        expect(loadingText).toBeInTheDocument();
        expect(loadingText).toBeVisible();
        expect(loadingText).toHaveTextContent("Loading...");
    });
    
    it("Shouldn't render when the visibility is false", () => {
        render(<LoadingPokemonAlert 
            alertVisibility={false} 
        />);

        const loadingAlert = screen.queryByTestId("loading-pokemon-alert");
        expect(loadingAlert).not.toBeInTheDocument();
    });

    it("Should render an empty message if the text prop is an empty string", () => {
        render(<LoadingPokemonAlert 
            alertVisibility={true} 
            alertText={""} 
        />);

        const loadingText = screen.getByTestId("loading-text");
        expect(loadingText).toBeInTheDocument();
        expect(loadingText).toBeVisible();
        expect(loadingText).toHaveTextContent("");
    });
});