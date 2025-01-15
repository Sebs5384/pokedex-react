import { render, screen } from "@testing-library/react";
import RegistrationFooter from "../RegistrationFooter";
import "@testing-library/jest-dom";

describe("RegistrationBody", () => {
    const pokemon = {
        description: "There is a test in its tail",
    };

    it("Should render RegistrationFooter correctly", () => {
        render(<RegistrationFooter 
            pokemon={pokemon} 
        />);
        const registrationFooter = screen.getByTestId("registration-footer");
        const registrationFooterDescription = screen.getByTestId("registration-footer-description");

        expect(registrationFooter).toBeInTheDocument();
        expect(registrationFooterDescription).toBeInTheDocument();
        expect(registrationFooterDescription).toHaveTextContent("There is a test in its tail");
    });

    it("Should still render the component when props are null", () => {
        render(<RegistrationFooter 
            pokemon={null} 
        />);
        
        const registrationFooter = screen.getByTestId("registration-footer");
        const registrationFooterDescription = screen.getByTestId("registration-footer-description");
        
        expect(registrationFooter).toBeInTheDocument();
        expect(registrationFooterDescription).toBeInTheDocument();
        expect(registrationFooterDescription).toHaveTextContent("");
    });
});