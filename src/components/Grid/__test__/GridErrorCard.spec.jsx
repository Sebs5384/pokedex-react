import { render, screen } from "@testing-library/react";
import GridErrorCard from "../GridErrorCard";
import "@testing-library/jest-dom";

describe("GridErrorCard", () => {
    it("Should render GridErrorCard correctly", () => {
        render(<GridErrorCard />);
        const gridErrorCard = screen.getByTestId("grid-error-card");
        const gridErrorText = screen.getByText("Seems like there's no cards to display try again later");

        expect(gridErrorCard).toBeInTheDocument();
        expect(gridErrorCard).toBeVisible();
        expect(gridErrorText).toBeInTheDocument();
        expect(gridErrorText).toBeVisible();
    });
}); 