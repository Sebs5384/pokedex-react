import { render, screen } from "@testing-library/react";
import LoadingGrid from "../LoadingGrid";
import "@testing-library/jest-dom";

describe("LoadingGrid", () => {
    it("Should render LoadingGrid correctly", () => {
        render(<LoadingGrid />);
        const loadingSpinner = screen.getByTestId("loading-grid-spinner");
        const loadingText = screen.getByTestId("loading-grid-text");
        
        expect(loadingSpinner).toBeInTheDocument();
        expect(loadingSpinner).toBeVisible();
        expect(loadingText).toBeInTheDocument();
        expect(loadingText).toBeVisible();
        expect(loadingText).toHaveTextContent("Loading Pokemons...");
    });
});