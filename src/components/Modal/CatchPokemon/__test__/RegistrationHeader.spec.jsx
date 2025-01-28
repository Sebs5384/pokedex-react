import { render, screen } from "@testing-library/react";
import RegistrationHeader from "../RegistrationHeader";
import "@testing-library/jest-dom";

describe("RegistrationHeader", () => {
    it("Should render RegistrationHeader correctly", () => {
        render(<RegistrationHeader />);
        const registrationHeader = screen.getByTestId("registration-header");
        const registrationTitle = screen.getByTestId("registration-title");

        expect(registrationHeader).toBeInTheDocument();
        expect(registrationTitle).toBeInTheDocument();
        expect(registrationTitle).toHaveTextContent("POKéDEX registration completed.");
    });
});