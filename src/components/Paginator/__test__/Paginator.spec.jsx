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
        expect(screen.getByText("1")).toBeVisible();
        expect(screen.getByText("2")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeVisible();
        expect(screen.getByText("3")).toBeInTheDocument();
        expect(screen.getByText("3")).toBeVisible();

        expect(screen.getByText("4")).toBeInTheDocument();
        expect(screen.getByText("4")).not.toBeVisible();
        expect(screen.getByText("5")).toBeInTheDocument();
        expect(screen.getByText("5")).not.toBeVisible();
        expect(mockContextValue.setItemRange).toHaveBeenCalled();
    });

    it("Should re-render paginator properly", () => {
        let currentPage = 1;
        const mockContextValue = {
            currentPage,
            totalPages: [1, 2, 3, 4, 5],
            setCurrentPage: jest.fn((page) => {
                currentPage = page;
            }),
            setNextPage: jest.fn(),
            setPreviousPage: jest.fn(),
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

        const previousButton = screen.getByText("Previous");
        fireEvent.click(previousButton);
        
        mockContextValue.setCurrentPage(1);
        expect(mockContextValue.setCurrentPage).toHaveBeenCalled();
        expect(mockContextValue.setItemRange).toHaveBeenCalledWith(1, 1);
        expect(currentPage).toEqual(1);

        rerender(<Paginator />, { wrapper: ({ children }) => <Wrapper value={mockContextValue}>{children}</Wrapper> });

        expect(screen.getByText("4")).not.toBeVisible();
        expect(mockContextValue.setItemRange).toHaveBeenCalled();
    });

    it("Should disable previous button on first render", () => {
        const mockContextValue = {
            currentPage: 1,
            totalPages: [1, 2, 3, 4, 5],
            firstPage: 1,
            setItemRange: jest.fn()
        };

        render(<Paginator />, { wrapper: ({ children }) => <Wrapper value={mockContextValue}>{children}</Wrapper> });

        const previousButton = screen.getByText("Previous");
        expect(previousButton).toHaveClass("disabled");
    });

    it("Should disable next button on last page", () => {
        const mockContextValue = {
            currentPage: 5,
            totalPages: [1, 2, 3, 4, 5],
            lastPage: 5,
            setItemRange: jest.fn()
        };
        
        render(<Paginator />, { wrapper: ({ children }) => <Wrapper value={mockContextValue}>{children}</Wrapper> });

        const nextButton = screen.getByText("Next");
        expect(nextButton).toHaveClass("disabled");
    });

    it("Should jump from one page to another by using the numbered buttons", () => {
        let currentPage = 1;
        const mockContextValue = {
            currentPage,
            totalPages: [1, 2, 3, 4, 5],
            setCurrentPage: jest.fn((page) => {
                currentPage = page;
            }),
            setItemRange: jest.fn((item) => {
                return !(currentPage >= item - 2 && currentPage <= item + 2);
            }),
        };

        const { rerender } = render(<Paginator />, { wrapper: ({ children }) => <Wrapper value={mockContextValue}>{children}</Wrapper> });

        const thirdPage = screen.getByText("3");
        fireEvent.click(thirdPage);

        mockContextValue.setCurrentPage(3);
        expect(mockContextValue.setCurrentPage).toHaveBeenCalled();
        expect(currentPage).toEqual(3);
        expect(mockContextValue.setItemRange).toHaveBeenCalledWith(3, 1);

        rerender(<Paginator />, { wrapper: ({ children }) => <Wrapper value={mockContextValue}>{children}</Wrapper> });

        expect(mockContextValue.setItemRange).toHaveBeenCalled();
        expect(screen.getByText("4")).toBeVisible();
        expect(screen.getByText("5")).toBeVisible();
    });

    it("Shouldn't render numbered pages when the total pages is empty", () => {
        const mockContextValue = {
           totalPages: [],
           setItemRange: jest.fn()
        };
        
        render(<Paginator />, { wrapper: ({ children }) => <Wrapper value={mockContextValue}>{children}</Wrapper> });

        expect(mockContextValue.setItemRange).toHaveBeenCalledTimes(0);
        expect(mockContextValue.setItemRange).not.toHaveBeenCalledWith(1, 1);
        expect(screen.queryByText("1")).not.toBeInTheDocument();
    });

    it("Shouldn't render numbered pages when total pages is still empty and a re-render happens", () => {
        const mockContextValue = {
            totalPages: [],
            setItemRange: jest.fn(),
            setNextPage: jest.fn(),
        };

        const { rerender } = render(<Paginator />, { wrapper: ({ children }) => <Wrapper value={mockContextValue}>{children}</Wrapper> });

        expect(mockContextValue.setItemRange).toHaveBeenCalledTimes(0);
        expect(mockContextValue.setItemRange).not.toHaveBeenCalledWith(1, 1);
        expect(screen.queryByText("1")).not.toBeInTheDocument();

        const nextButton = screen.getByText("Next");
        fireEvent.click(nextButton);

        rerender(<Paginator />, { wrapper: ({ children }) => <Wrapper value={mockContextValue}>{children}</Wrapper> });

        expect(mockContextValue.setItemRange).toHaveBeenCalledTimes(0);
        expect(mockContextValue.setItemRange).not.toHaveBeenCalledWith(1, 1);
        expect(screen.queryByText("1")).not.toBeInTheDocument();
    });
});