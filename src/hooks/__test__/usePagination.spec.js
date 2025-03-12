import { renderHook, act, waitFor } from "@testing-library/react";
import { validateSearchboxPage } from "../../utils/general";
import { getPokemonsInPage, getPokemonSprites } from "../../utils/pokemon";
import usePagination from "../usePagination";
import useFetchPokemons from "../useFetchPokemons";
import useTotalPages from "../useTotalPages";
import { use } from "react";

jest.mock("../../utils/general", () => ({
    validateSearchboxPage: jest.fn(),
}));
jest.mock("../../utils/pokemon", () => ({
    getPokemonsInPage: jest.fn(),
    getPokemonSprites: jest.fn(),
}));
jest.mock("../useFetchPokemons", () => jest.fn());
jest.mock("../useTotalPages", () => jest.fn());

describe("usePagination", () => {
    const itemsPerPage = 20;
    const initialPageIndex = 1;

    it("Should run setPokemonsInPage as a side effect on mount", async () => {
        useFetchPokemons.mockReturnValue({
            paginatorPokemons: { 
                results: [
                    { name: "testmander", url: "https://somerandom.url/api/test/testmon/1/" },
                    { name: "testbasaur", url: "https://somerandom.url/api/test/testmon/2/" },
                    { name: "testrtle", url: "https://somerandom.url/api/test/testmon/3/" },
                ] 
            },
        });
        useTotalPages.mockReturnValue({
            totalPages: 3,
            firstPage: 1,
            lastPage: 3,
        });
        getPokemonSprites.mockReturnValue([
            "https://somerandom-sprite/1.png",
            "https://somerandom-sprite/2.png",
            "https://somerandom-sprite/3.png",
        ]);
        getPokemonsInPage.mockReturnValue([
            { name: "testmander", id: 1, sprite: "https://somerandom-sprite/1.png" },
            { name: "testbasaur", id: 2, sprite: "https://somerandom-sprite/2.png" },
            { name: "testrtle", id: 3, sprite: "https://somerandom-sprite/3.png" },
        ]);
        const { result } = renderHook(() => usePagination(itemsPerPage, initialPageIndex));
    
        await waitFor(() => {
            result.current.setPokemonsInPage();
            expect(result.current.pokemonsInPage).toEqual([
                { name: "testmander", id: 1, sprite: "https://somerandom-sprite/1.png" },
                { name: "testbasaur", id: 2, sprite: "https://somerandom-sprite/2.png" },
                { name: "testrtle", id: 3, sprite: "https://somerandom-sprite/3.png" },
            ]);
        });
    });

    it("Should set the current page when invoking setCurrentPage", () => {
        useFetchPokemons.mockReturnValue({
            paginatorPokemons: {
                results: []
            },
        });
        useTotalPages.mockReturnValue({
            totalPages: 3,
            firstPage: 1,
            lastPage: 3,
        });
        const { result } = renderHook(() => usePagination(itemsPerPage, initialPageIndex));
        
        act(() => result.current.setCurrentPage(2));
        expect(result.current.currentPage).toBe(2);
    });

    it("Should set the next page when invoking setNextPage", () => {
        useFetchPokemons.mockReturnValue({
            paginatorPokemons: {
                results: []
            },
        });
        useTotalPages.mockReturnValue({
            totalPages: 3,
            firstPage: 1,
            lastPage: 3,
        });
        const { result } = renderHook(() => usePagination(itemsPerPage, initialPageIndex));
  
        act(() => result.current.setNextPage());
        expect(result.current.currentPage).toBe(2);
    });

    it("Should set the previous page when invoking setPreviousPage", () => {
        useFetchPokemons.mockReturnValue({
            paginatorPokemons: {
                results: []
            },
        });
        useTotalPages.mockReturnValue({
            totalPages: 3,
            firstPage: 1,
            lastPage: 3,
        });
        const { result } = renderHook(() => usePagination(itemsPerPage, initialPageIndex));
  
        act(() => result.current.setCurrentPage(2));
        act(() => result.current.setPreviousPage());
        expect(result.current.currentPage).toBe(1);
    });

    it("Should set the searchbox value when invoking setSearchboxPokemon", async () => {
        useFetchPokemons.mockReturnValue({
            paginatorPokemons: {
                results: []
            },
        });
        useTotalPages.mockReturnValue({
            totalPages: 3,
            firstPage: 1,
            lastPage: 3,
        });
        const { result } = renderHook(() => usePagination(itemsPerPage, initialPageIndex));
        
        expect(result.current.searchboxValue).toBe("");

        act(() => result.current.setSearchboxValue({ target: { value: 2 } }));
        expect(result.current.searchboxValue).toBe(2);
    });

    it("Should set the current page to the value of searchbox when handleKeyDown is invoked", async () => {
        useFetchPokemons.mockReturnValue({
            paginatorPokemons: {
                results: []
            },
        });
        useTotalPages.mockReturnValue({
            totalPages: 3,
            firstPage: 1,
            lastPage: 3,
        });
        validateSearchboxPage.mockReturnValue(true);
        const { result } = renderHook(() => usePagination(itemsPerPage, initialPageIndex));

        act(() => result.current.setSearchboxValue({ target: { value: 2 } }));
        expect(result.current.currentPage).toBe(1);
        expect(result.current.searchboxValue).toBe(2);

        act(() => result.current.handleKeyDown({ key: "Enter" }));
        expect(result.current.currentPage).toBe(2);
        expect(result.current.searchboxValue).toBe("");
    });

    it("Should handle the error through a popup when the page is not valid when invoking handleKeyDown", async () => {
        jest.useFakeTimers();
        useFetchPokemons.mockReturnValue({
            paginatorPokemons: {
                results: []
            },
        });
        useTotalPages.mockReturnValue({
            totalPages: 3,
            firstPage: 1,
            lastPage: 3,
        });
        validateSearchboxPage.mockReturnValue("This is a mock message and page 4 doesn't exist");
        const { result } = renderHook(() => usePagination(itemsPerPage, initialPageIndex));

        act(() => result.current.setSearchboxValue({ target: { value: 4 } }));
        expect(result.current.currentPage).toBe(1);
        expect(result.current.searchboxValue).toBe(4);

        act(() => result.current.handleKeyDown({ key: "Enter" }));
        expect(result.current.currentPage).toBe(1);
        expect(result.current.searchboxValue).toBe("");
        expect(result.current.popupMessage).toBe("This is a mock message and page 4 doesn't exist");
        expect(result.current.invalidPagePopup).toBe(true);

        act(() => {
            jest.advanceTimersByTime(2000);
        });

        expect(result.current.invalidPagePopup).toBe(false);
    });

    it("Should dispatch no cards state when fetching no results", async () => {
        jest.useFakeTimers();
        useFetchPokemons.mockReturnValue({
            paginatorPokemons: {
                results: [],
            },
        });
        useTotalPages.mockReturnValue({
            totalPages: [],
            firstPage: 1,
            lastPage: 0,
        });
        const { result } = renderHook(() => usePagination(itemsPerPage, initialPageIndex));
        expect(result.current.noCards).toBe(false);

        act(() => {
            jest.advanceTimersByTime(10000);
        });
        
        expect(result.current.pokemonsInPage).toEqual([]);
        expect(result.current.noCards).toBe(true);
    });
});