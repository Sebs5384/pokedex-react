import { render, screen, fireEvent } from "@testing-library/react";
import PaginatorButton from "../PaginatorButton";
import "@testing-library/jest-dom";

describe("PaginatorButton", () => {
    const propsMock = {
        children: "test",
        isHidden: false,
        isDisabled: false,
        dataAttribute: "paginator-button-test",
        setPage: jest.fn(),
    };
    
    it("Should render PaginatorButton correctly", () => {
        render(<PaginatorButton {...propsMock} />);
        const paginatorButton = screen.getByTestId("paginator-button-test");
        
        expect(paginatorButton).toBeInTheDocument();
        expect(paginatorButton).toBeVisible();
        expect(paginatorButton).toHaveTextContent("test");
    });

    it("Should disable the button when isDisable prop is true", () => {
        render(<PaginatorButton {...propsMock} isDisabled={true} />);
        const paginatorButton = screen.getByTestId("paginator-button-test");
        expect(paginatorButton).toHaveClass("disabled");

        fireEvent.click(paginatorButton);
        expect(propsMock.setPage).toHaveBeenCalledTimes(0);
    });

    it("Should hide the button when isHidden prop is true", () => {
        render(<PaginatorButton {...propsMock} isHidden={true} />);
        const paginatorButton = screen.getByTestId("paginator-button-test");
        
        expect(paginatorButton).toBeInTheDocument();
        expect(paginatorButton).not.toBeVisible();
    });

    it("Should call setPage when the button is clicked", () => {
        render(<PaginatorButton {...propsMock} />);
        const paginatorButton = screen.getByTestId("paginator-button-test");
        
        fireEvent.click(paginatorButton);
        expect(propsMock.setPage).toHaveBeenCalledTimes(1);
    });
});