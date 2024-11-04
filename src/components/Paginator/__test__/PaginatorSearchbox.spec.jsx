import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import PaginatorSearchbox from "../PaginatorSearchbox";
import "@testing-library/jest-dom";

describe("PaginatorSearchbox", () => {
    it("Should render the paginator searchbox correctly", () => {
        render(<PaginatorSearchbox 
            onChange={() => {}}
            onKeyDown={() => {}}
            validationMessage={""}
            validationPopup={false}
        />);

        const paginatorSearchbox = screen.getByRole("searchbox");
        expect(paginatorSearchbox).toBeInTheDocument();
        expect(paginatorSearchbox).toBeVisible();
    });

    it("Should call onChange when the searchbox is changed", () => {
        const onChange = jest.fn();
        render(<PaginatorSearchbox 
            onChange={onChange}
        />);

        const paginatorSearchbox = screen.getByRole("searchbox");
        expect(paginatorSearchbox).toBeInTheDocument();
        expect(paginatorSearchbox).toHaveValue("");

        fireEvent.change(paginatorSearchbox, { target: { value: "test" } });
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(paginatorSearchbox).toHaveValue("test");

        fireEvent.change(paginatorSearchbox, { target: { value: "" } });
        expect(onChange).toHaveBeenCalledTimes(2);
        expect(paginatorSearchbox).toHaveValue("");
    });

    it("Should call onKeyDown when the a key is pressed", () => {
        const onKeyDown = jest.fn();
        render(<PaginatorSearchbox 
            onKeyDown={onKeyDown}
        />);
    
        const paginatorSearchbox = screen.getByRole("searchbox");
        expect(paginatorSearchbox).toBeInTheDocument();
        expect(paginatorSearchbox).toHaveValue("");

        fireEvent.keyDown(paginatorSearchbox, { key: "Enter" });
        expect(onKeyDown).toHaveBeenCalledTimes(1);
        expect(paginatorSearchbox).toHaveValue("");

        fireEvent.keyDown(paginatorSearchbox, { key: "Escape" });
        expect(onKeyDown).toHaveBeenCalledTimes(2);
        expect(paginatorSearchbox).toHaveValue("");
    });

    it("Should render the validation message correctly when validationPopup is true", async () => {
        const { rerender } = render(<PaginatorSearchbox
            validationMessage={"test"}
            validationPopup={true}
        />);

        const paginatorSearchbox = screen.getByRole("searchbox");
        expect(paginatorSearchbox).toBeInTheDocument();

        const paginatorPopover = screen.getByTestId("paginator-searchbox-popover");
        const popoverMessage = screen.getByTestId("paginator-popover-message");
        expect(paginatorPopover).toBeInTheDocument();
        expect(popoverMessage).toBeInTheDocument();
        expect(paginatorPopover).toBeVisible();
        expect(popoverMessage).toHaveTextContent("test");
        
        rerender(<PaginatorSearchbox
            validationMessage={""} 
            validationPopup={false}
        />);

        await waitFor(() => expect(paginatorPopover).not.toBeInTheDocument());
        await waitFor(() => expect(popoverMessage).not.toBeInTheDocument());
        await waitFor(() => expect(popoverMessage).not.toBeVisible());
    });
});