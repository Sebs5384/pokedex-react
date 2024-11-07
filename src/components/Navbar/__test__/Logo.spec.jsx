import { render, screen, fireEvent } from "@testing-library/react";
import Logo from "../Logo";
import "@testing-library/jest-dom";

describe("Logo", () => {
    it("Should render Logo correctly", () => {
        render(<Logo />);

        const logo = screen.getByTestId("navbar-logo");
        const logoImage = screen.getByAltText("Logo");

        expect(logo).toBeInTheDocument();
        expect(logoImage).toBeInTheDocument();
    });

    it("Should call reload when the logo is clicked", () => {
        const reloadMock = jest.fn();
        Object.defineProperty(window, "location", 
            { value: { reload: reloadMock } }, 
            { writable: true }
        );
        render(<Logo />);

        const logoImage = screen.getByAltText("Logo");
        fireEvent.click(logoImage);

        expect(reloadMock).toHaveBeenCalled();
    });
});