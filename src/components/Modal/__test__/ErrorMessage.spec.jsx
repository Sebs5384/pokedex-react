import { render, screen, fireEvent } from "@testing-library/react";
import ErrorMessage from "../ErrorMessage";
import "@testing-library/jest-dom";

describe("ErrorMessage", () => {
    it("Should render ErrorMessage correctly", () => {
        render(<ErrorMessage
            errorCauseMessage={"Some error"}
            errorText={"Just happened"}
            errorMessageVisibility={true}
            closeErrorModal={() => {}}
        />);

        const errorMessage = screen.getByTestId("error-message-modal");
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage).toBeVisible();
        
        const errorCauseMessage = screen.getByTestId("error-cause-message");
        expect(errorCauseMessage).toBeInTheDocument();
        expect(errorCauseMessage).toBeVisible();
        expect(errorCauseMessage).toHaveTextContent("Some error");
        
        const errorText = screen.getByTestId("error-text");
        expect(errorText).toBeInTheDocument();
        expect(errorText).toBeVisible();
        expect(errorText).toHaveTextContent("Just happened");
        
        const closeButton = screen.getByTestId("error-close-button");
        expect(closeButton).toBeInTheDocument();
        expect(closeButton).toBeVisible();
    });

    it("Should close ErrorMessage when close button is clicked", () => {
        let mockedErrorMessageVisibility = true;
        const mockedCloseErrorModal = jest.fn(() => {
            mockedErrorMessageVisibility = false;
        });

        const { rerender } = render(<ErrorMessage
            errorMessageVisibility={mockedErrorMessageVisibility}
            closeErrorModal={mockedCloseErrorModal}
        />);
        
        const errorMessage = screen.getByTestId("error-message-modal");
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage).toBeVisible();

        const errorCloseButton = screen.getByTestId("error-close-button");
        expect(errorCloseButton).toBeInTheDocument();

        fireEvent.click(errorCloseButton);
        expect(mockedCloseErrorModal).toHaveBeenCalledTimes(1);
        expect(mockedErrorMessageVisibility).toBe(false);

        rerender(<ErrorMessage
            errorMessageVisibility={mockedErrorMessageVisibility}
            closeErrorModal={mockedCloseErrorModal}
        />);

        expect(errorMessage).not.toBeInTheDocument();
    });

    it("Shouldn't close ErrorMessage when pressing escape or enter key", () => {
        render(<ErrorMessage 
            errorMessageVisibility={true}
        />);

        const errorMessage = screen.getByTestId("error-message-modal");
        expect(errorMessage).toBeInTheDocument();

        fireEvent.keyDown(errorMessage, { key: "Escape" });
        expect(errorMessage).toBeInTheDocument();
        fireEvent.keyDown(errorMessage, { key: "Enter" });
        expect(errorMessage).toBeInTheDocument();
    });

    it("Should render an empty ErrorMessage when text and cause props are empty strings", () => {
        render(<ErrorMessage
            errorCauseMessage={""}
            errorText={""}
            errorMessageVisibility={true}
        />);

        const errorMessage = screen.getByTestId("error-message-modal");
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage).toBeVisible();

        const errorCauseMessage = screen.getByTestId("error-cause-message");
        expect(errorCauseMessage).toBeInTheDocument();
        expect(errorCauseMessage).toHaveTextContent("");

        const errorText = screen.getByTestId("error-text");
        expect(errorText).toBeInTheDocument();
        expect(errorText).toHaveTextContent("");
    });
});