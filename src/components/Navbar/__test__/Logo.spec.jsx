import { render, screen, fireEvent } from "@testing-library/react";
import Logo from "../Logo";
import "@testing-library/jest-dom";

describe("Logo", () => {
    it("Should render the component correctly", () => {
        render(<Logo />);

        const navbarLogo = screen.getByTestId("navbar-logo");
        const logoImage = screen.getByTestId("logo-image");

        expect(navbarLogo).toBeInTheDocument();
        expect(logoImage).toBeInTheDocument();
        expect(logoImage).toHaveAttribute("src", "pokedex-logo.png");
    });

    it("Should reload the website when clicking on the logo", () => {
        const reloadMock = jest.fn();
        Object.defineProperty(window, 'location', {
            value: {
                reload: reloadMock,
            },
            writable: true,
        });
        render(<Logo />);

        const logoImage = screen.getByTestId("logo-image");
        fireEvent.click(logoImage);

        expect(logoImage).toBeInTheDocument();
        expect(reloadMock).toHaveBeenCalledTimes(1);
    });
});