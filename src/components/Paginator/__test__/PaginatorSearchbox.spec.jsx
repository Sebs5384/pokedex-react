import { render, screen, fireEvent } from "@testing-library/react";
import PaginatorSearchbox from "../PaginatorSearchbox";
import "@testing-library/jest-dom";

describe("PaginatorSearchbox", () => {
    const propsMock = {
        onChange: jest.fn(),
        onKeyDown: jest.fn(),
        validationMessage: "",
        validationPopup: false,
    };

    it("Should render PaginatorSearchbox correctly", () => {
        render(<PaginatorSearchbox {...propsMock} />);
        const paginatorSearchbox = screen.getByTestId("paginator-searchbox");

        expect(paginatorSearchbox).toBeInTheDocument();
        expect(paginatorSearchbox).toBeVisible();
        expect(paginatorSearchbox).toHaveValue("");
    });

    it("Should render the validation message correctly when validationPopup is true", () => {
        render(<PaginatorSearchbox 
            {...propsMock}
            validationPopup={true}
            validationMessage={"test"}    
        />);
        
        screen.debug();
        const paginatorSearchbox = screen.getByTestId("paginator-searchbox");
        const paginatorPopup = screen.getByTestId("paginator-searchbox-popover");
        const paginatorPopupMessage = screen.getByTestId("paginator-popover-message");

        expect(paginatorSearchbox).toBeInTheDocument();
        expect(paginatorPopup).toBeInTheDocument();
        expect(paginatorPopupMessage).toBeInTheDocument();

        expect(paginatorPopup).toBeVisible();
        expect(paginatorPopupMessage).toBeVisible();

        expect(paginatorSearchbox).toHaveValue("");
        expect(paginatorPopupMessage).toHaveTextContent("test");
    });

    it("Should call onChange when typing in the searchbox", () => {
        render(<PaginatorSearchbox {...propsMock} />);
        const paginatorSearchbox = screen.getByTestId("paginator-searchbox");

        fireEvent.change(paginatorSearchbox, { target: { value: "testmeleon" } });
        expect(propsMock.onChange).toHaveBeenCalledTimes(1);
        expect(propsMock.onChange).toHaveBeenCalledWith(expect.objectContaining({
            target: expect.objectContaining({
                value: "testmeleon"
            })
        }));
    });

    it("Should call onKeyDown when typing in the searchbox", () => {
        render(<PaginatorSearchbox {...propsMock} />);
        const paginatorSearchbox = screen.getByTestId("paginator-searchbox");

        fireEvent.keyDown(paginatorSearchbox, { key: "Enter" });
        expect(propsMock.onKeyDown).toHaveBeenCalledTimes(1);
        expect(propsMock.onKeyDown).toHaveBeenCalledWith(expect.objectContaining({
            key: "Enter"
        }));
    });
});