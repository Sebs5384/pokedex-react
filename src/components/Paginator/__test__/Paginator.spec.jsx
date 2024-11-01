import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PokedexContext } from "../../../context/PokedexContext";
import Paginator from "../Paginator";
import "@testing-library/jest-dom";

const Wrapper = ({ children, value }) => {
    return (
        <PokedexContext.Provider value={value}>
            {children}
        </PokedexContext.Provider>
    );
};

describe("Paginator", () => {
    it("Should render paginator properly", async () => {
        const mockContextValue = {
            currentPage: 1,
            totalPages: [1, 2, 3, 4, 5],
            setItemRange: jest.fn(),
        };
        
        render(<Paginator />, { wrapper: ({ children }) => <Wrapper value={mockContextValue}>{children}</Wrapper> });

        const paginator = screen.getByTestId("pagination-section");
        expect(paginator).toBeInTheDocument();
        expect(screen.getByText("Previous")).toBeInTheDocument();
        expect(screen.getByText("Next")).toBeInTheDocument();
        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
        expect(screen.getByText("3")).toBeInTheDocument();
        expect(screen.getByText("4")).toBeInTheDocument();
        expect(screen.getByText("5")).toBeInTheDocument();
        expect(mockContextValue.setItemRange).toHaveBeenCalled();
    });
});