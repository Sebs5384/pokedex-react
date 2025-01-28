import { render, screen, fireEvent } from "@testing-library/react";
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
            pagination: {
                totalPages: [1, 2, 3, 4, 5],
                setItemRange: jest.fn()
                    .mockReturnValueOnce(false)
                    .mockReturnValueOnce(false)
                    .mockReturnValueOnce(false)
                    .mockReturnValueOnce(true)
                    .mockReturnValueOnce(true)
            }
        };
        
        render(<Paginator />, { wrapper: ({ children }) => <Wrapper value={mockContextValue}>{children}</Wrapper> });

        const paginator = screen.getByTestId("pagination-section");
        expect(paginator).toBeInTheDocument();
        const paginatorSearchbox = screen.getByRole("searchbox");
        expect(paginatorSearchbox).toBeInTheDocument();

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
        expect(mockContextValue.pagination.setItemRange).toHaveBeenCalled();
    });

    it("Should re-render paginator properly", () => {
        let currentPage = 1;
        const mockContextValue = {
            pagination: {
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
            }
        };

        const { rerender } = render(<Paginator />, { wrapper: ({ children }) => <Wrapper value={mockContextValue}>{children}</Wrapper> });

        expect(screen.getByText("4")).not.toBeVisible();
        expect(mockContextValue.pagination.setItemRange).toHaveBeenCalled();

        const nextButton = screen.getByText("Next");
        
        fireEvent.click(nextButton);
        
        mockContextValue.pagination.setCurrentPage(2);
        expect(mockContextValue.pagination.setCurrentPage).toHaveBeenCalled();
        expect(mockContextValue.pagination.setItemRange).toHaveBeenCalledWith(2, 1);
        expect(currentPage).toEqual(2);
    
        rerender(<Paginator />, { wrapper: ({ children }) => <Wrapper value={mockContextValue}>{children}</Wrapper> });

        expect(screen.getByText("4")).toBeVisible();
        expect(mockContextValue.pagination.setItemRange).toHaveBeenCalled();

        const previousButton = screen.getByText("Previous");
        fireEvent.click(previousButton);
        
        mockContextValue.pagination.setCurrentPage(1);
        expect(mockContextValue.pagination.setCurrentPage).toHaveBeenCalled();
        expect(mockContextValue.pagination.setItemRange).toHaveBeenCalledWith(1, 1);
        expect(currentPage).toEqual(1);

        rerender(<Paginator />, { wrapper: ({ children }) => <Wrapper value={mockContextValue}>{children}</Wrapper> });

        expect(screen.getByText("4")).not.toBeVisible();
        expect(mockContextValue.pagination.setItemRange).toHaveBeenCalled();
    });

    it("Should disable previous button on first render", () => {
        const mockContextValue = {
            pagination: {
                currentPage: 1,
                totalPages: [1, 2, 3, 4, 5],
                firstPage: 1,
                setItemRange: jest.fn()
            }
        };

        render(<Paginator />, { wrapper: ({ children }) => <Wrapper value={mockContextValue}>{children}</Wrapper> });

        const previousButton = screen.getByText("Previous");
        expect(previousButton).toHaveClass("disabled");
    });

    it("Should disable next button on last page", () => {
        const mockContextValue = {
            pagination: {
                currentPage: 5,
                totalPages: [1, 2, 3, 4, 5],
                lastPage: 5,
                setItemRange: jest.fn()
            }
        };
        
        render(<Paginator />, { wrapper: ({ children }) => <Wrapper value={mockContextValue}>{children}</Wrapper> });

        const nextButton = screen.getByText("Next");
        expect(nextButton).toHaveClass("disabled");
    });

    it("Should jump from one page to another by using the numbered buttons", () => {
        let currentPage = 1;
        const mockContextValue = {
            pagination: {
                currentPage,
                totalPages: [1, 2, 3, 4, 5],
                setCurrentPage: jest.fn((page) => {
                    currentPage = page;
                }),
                setItemRange: jest.fn((item) => {
                    return !(currentPage >= item - 2 && currentPage <= item + 2);
                }),
            }
        };

        const { rerender } = render(<Paginator />, { wrapper: ({ children }) => <Wrapper value={mockContextValue}>{children}</Wrapper> });

        const thirdPage = screen.getByText("3");
        fireEvent.click(thirdPage);

        mockContextValue.pagination.setCurrentPage(3);
        expect(mockContextValue.pagination.setCurrentPage).toHaveBeenCalled();
        expect(mockContextValue.pagination.setItemRange).toHaveBeenCalledWith(3, 1);

        rerender(<Paginator />, { wrapper: ({ children }) => <Wrapper value={mockContextValue}>{children}</Wrapper> });

        expect(currentPage).toEqual(3);
        expect(mockContextValue.pagination.setItemRange).toHaveBeenCalled();
        expect(screen.getByText("4")).toBeVisible();
        expect(screen.getByText("5")).toBeVisible();
    });

    it("Shouldn't render numbered pages when the total pages is empty", () => {
        const mockContextValue = {
            pagination: {
                totalPages: [],
                setItemRange: jest.fn()
            }
        };
        
        render(<Paginator />, { wrapper: ({ children }) => <Wrapper value={mockContextValue}>{children}</Wrapper> });

        expect(mockContextValue.pagination.setItemRange).toHaveBeenCalledTimes(0);
        expect(mockContextValue.pagination.setItemRange).not.toHaveBeenCalledWith(1, 1);
        expect(screen.queryByText("1")).not.toBeInTheDocument();
    });

    it("Shouldn't render numbered pages when total pages is still empty and a re-render happens", () => {
        const mockContextValue = {
            pagination: {
                totalPages: [],
                setItemRange: jest.fn(),
                setNextPage: jest.fn(),
            }
        };

        const { rerender } = render(<Paginator />, { wrapper: ({ children }) => <Wrapper value={mockContextValue}>{children}</Wrapper> });

        expect(mockContextValue.pagination.setItemRange).toHaveBeenCalledTimes(0);
        expect(mockContextValue.pagination.setItemRange).not.toHaveBeenCalledWith(1, 1);
        expect(screen.queryByText("1")).not.toBeInTheDocument();

        const nextButton = screen.getByText("Next");
        fireEvent.click(nextButton);

        rerender(<Paginator />, { wrapper: ({ children }) => <Wrapper value={mockContextValue}>{children}</Wrapper> });

        expect(mockContextValue.pagination.setItemRange).toHaveBeenCalledTimes(0);
        expect(mockContextValue.pagination.setItemRange).not.toHaveBeenCalledWith(1, 1);
        expect(screen.queryByText("1")).not.toBeInTheDocument();
    });

    it("Should handle a large number of pages correctly", () => {
        const mockContextValue = {
            pagination: {
                totalPages: Array.from({ length: 50 }, (_, index) => index + 1),
                setItemRange: jest.fn()
            }
        };
        
        render(<Paginator />, { wrapper: ({ children }) => <Wrapper value={mockContextValue}>{children}</Wrapper> });
        
        const paginator = screen.getByTestId("pagination-section");
        expect(paginator).toBeInTheDocument();
        const pages = screen.getAllByRole("link");
        expect(pages.length).toEqual(52);
        
        expect(mockContextValue.pagination.setItemRange).toHaveBeenCalled();
    });

    it("Should jump to the page we input into the paginator searchbox", () => {
        let currentPage = 1;
        const mockContextValue = {
            pagination: {
                currentPage,
                totalPages: [1, 2, 3, 4, 5],
                setCurrentPage: jest.fn((page) => {
                    return currentPage = page;
                }),
                setItemRange: jest.fn(),
                setSearchboxValue: jest.fn(),
                handleKeyDown: jest.fn()
            }
        };

        const { rerender } = render(<Paginator />, { wrapper: ({ children }) => <Wrapper value={mockContextValue}>{children}</Wrapper> });

        const searchbox = screen.getByRole("searchbox");
        fireEvent.change(searchbox, { target: { value: "3" } });
        fireEvent.keyDown(searchbox, { key: "Enter" });

        mockContextValue.pagination.setCurrentPage(3);
        expect(mockContextValue.pagination.handleKeyDown).toHaveBeenCalled();
        expect(mockContextValue.pagination.setCurrentPage).toHaveBeenCalledWith(3);
        expect(mockContextValue.pagination.setItemRange).toHaveBeenCalledWith(3, 1);
        expect(mockContextValue.pagination.setSearchboxValue).toHaveBeenCalled();
    
        rerender(<Paginator />, { wrapper: ({ children}) => <Wrapper value={mockContextValue}>{children}</Wrapper>});

        expect(currentPage).toEqual(3);
        expect(mockContextValue.pagination.setItemRange).toHaveBeenCalled();
    });

    it("Should remain in the same page if the page we input into the paginator searchbox is invalid", () => {
        let currentPage = 1;
        const mockContextValue = {
            pagination: {
                currentPage,
                totalPages: [1, 2, 3, 4, 5],
                setCurrentPage: jest.fn((page) => {
                    return currentPage = page;
                }),
                setItemRange: jest.fn(),
                setSearchboxValue: jest.fn(),
            }
        };

        render(<Paginator />, { wrapper: ({ children}) => <Wrapper value={mockContextValue}>{children}</Wrapper> });
        expect(mockContextValue.pagination.setItemRange).toHaveBeenCalled();
        
        const searchbox = screen.getByRole("searchbox");
        fireEvent.change(searchbox, { target: { value: "0" } });

        expect(currentPage).toEqual(1);
        expect(mockContextValue.pagination.setItemRange).toHaveBeenCalledWith(1, 1);
        expect(mockContextValue.pagination.setSearchboxValue).toHaveBeenCalled();
    });

    it("Should display error message when there is an error", () => {
        const mockContextValue = {
            pagination: {
                paginatorError: true,
            },
            error: {
                paginatorErrorMessageVisibility: true,
                errorCauseMessage: "Some error",
                errorMessage: "Just happened",
            }
        };

        render(<Paginator />, { wrapper: ({ children}) => <Wrapper value={mockContextValue}>{children}</Wrapper> });
        const errorMessage = screen.getByTestId("error-message-modal");
        expect(errorMessage).toBeInTheDocument();

        const errorCauseMessage = screen.getByTestId("error-cause-message");
        expect(errorCauseMessage).toBeInTheDocument();
        expect(errorCauseMessage).toHaveTextContent("Some error");
        
        const errorText = screen.getByTestId("error-text");
        expect(errorText).toBeInTheDocument();
        expect(errorText).toHaveTextContent("Just happened");
    });
});