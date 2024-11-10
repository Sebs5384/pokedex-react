import { render, screen, fireEvent } from "@testing-library/react";
import LoadingPokemonAlert from "../LoadingPokemonAlert";
import "@testing-library/jest-dom";

describe("LoadingPokemonAlert", () => {
    it("Should render LoadingPokemonAlert correctly", () => {
        render(<LoadingPokemonAlert showModal={true} />);

        const loadingAlert = screen.getByTestId("loading-pokemon-alert");
        expect(loadingAlert).toBeInTheDocument();
        expect(loadingAlert).toBeVisible();

        const loadingText = screen.getByTestId("loading-text");
        expect(loadingText).toBeInTheDocument();
        expect(loadingText).toBeVisible();
        expect(loadingText).toHaveTextContent("Loading...");

        screen.debug();
    });
});