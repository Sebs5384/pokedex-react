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
            totalPages: [1, 2, 3, 4, 5],
            setItemRange: jest.fn()
                .mockReturnValueOnce(false)
                .mockReturnValueOnce(false)
                .mockReturnValueOnce(false)
                .mockReturnValueOnce(true)
                .mockReturnValueOnce(true)
        };
        
        render(<Paginator />, { wrapper: ({ children }) => <Wrapper value={mockContextValue}>{children}</Wrapper> });

        const paginator = screen.getByTestId("pagination-section");
        expect(paginator).toBeInTheDocument();

        expect(screen.getByText("Previous")).toBeInTheDocument();
        expect(screen.getByText("Next")).toBeInTheDocument();
        
        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.getByText("1")).not.toHaveClass("hidden")
        expect(screen.getByText("2")).toBeInTheDocument();
        expect(screen.getByText("2")).not.toHaveClass("hidden")
        expect(screen.getByText("3")).toBeInTheDocument();
        expect(screen.getByText("3")).not.toHaveClass("hidden")

        expect(screen.getByText("4")).toBeInTheDocument();
        expect(screen.getByText("4")).toHaveClass("hidden")
        expect(screen.getByText("5")).toBeInTheDocument();
        expect(screen.getByText("5")).toHaveClass("hidden")
        expect(mockContextValue.setItemRange).toHaveBeenCalled();
    });

    it("Should change the visibility of pages when paginating", () => {
        let currentPage = 1;
        const mockContextValue = {
            currentPage,
            totalPages: [1, 2, 3, 4, 5],
            setCurrentPage: jest.fn((page) => {
                currentPage = page;
            }),
            setNextPage: jest.fn(),
            setItemRange: jest.fn((item) => {
                return !(currentPage >= item - 2 && currentPage <= item + 2);
            })
        };

        const { rerender } = render(<Paginator />, { wrapper: ({ children }) => <Wrapper value={mockContextValue}>{children}</Wrapper> });

        expect(screen.getByText("4")).not.toBeVisible();
        expect(mockContextValue.setItemRange).toHaveBeenCalled();

        const nextButton = screen.getByText("Next");
        fireEvent.click(nextButton);
        
        mockContextValue.setCurrentPage(2);
        expect(mockContextValue.setCurrentPage).toHaveBeenCalled();
        expect(mockContextValue.setItemRange).toHaveBeenCalledWith(2, 1);
        expect(currentPage).toEqual(2);
    
        rerender(<Paginator />, { wrapper: ({ children }) => <Wrapper value={mockContextValue}>{children}</Wrapper> });

        expect(screen.getByText("4")).toBeVisible();
        expect(mockContextValue.setItemRange).toHaveBeenCalled();
    });
});