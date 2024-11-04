import { render, screen, fireEvent } from "@testing-library/react";
import PaginatorButton from "../PaginatorButton";
import "@testing-library/jest-dom";

describe("PaginatorButton", () => { 
    it("Should render PaginatorButton properly", () => {
        render(<PaginatorButton 
            children={"Test"} 
            isHidden={false} 
            isDisabled={false} 
            dataAttribute={"test"} 
            onClick={() => {}} 
        />);
        
        const paginatorButton = screen.getByText("Test");
        expect(paginatorButton).toBeInTheDocument();
        expect(paginatorButton).toHaveTextContent("Test");
        expect(paginatorButton).toHaveAttribute("data-cy", "test");
        expect(paginatorButton).toBeVisible();
        expect(paginatorButton).not.toBeDisabled();
    });

    it("Should fire click event properly", () => {
        const mockOnClick = jest.fn();

        render(<PaginatorButton
            children={"Test"}
            onClick={mockOnClick}
        />);

        const paginatorButton = screen.getByText("Test");
        fireEvent.click(paginatorButton);
        expect(mockOnClick).toHaveBeenCalled();
    });

    it("Shouldn't fire click event when disabled", () => {
        const mockOnClick = jest.fn();

        render(<PaginatorButton
            children={"Test"}
            isDisabled={true}
            onClick={mockOnClick}
        />);

        const paginatorButton = screen.getByText("Test");
        fireEvent.click(paginatorButton);
        expect(mockOnClick).not.toHaveBeenCalled();
        expect(mockOnClick).toHaveBeenCalledTimes(0);
    });

    it("Shouldn't be visible when hidden", () => {
        render(<PaginatorButton 
            children={"Test"}
            isHidden={true}
        />);

        const paginatorButton = screen.queryByText("Test");
        expect(paginatorButton).not.toBeVisible();
    });
});