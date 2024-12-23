import { renderHook, act, waitFor } from "@testing-library/react";
import { validateSearchboxPage } from "../../utils/general";
import { getPokemonsInPage, getPokemonSprites } from "../../utils/pokemon";
import usePagination from "../usePagination";
import useFetchPokemons from "../useFetchPokemons";
import useTotalPages from "../useTotalPages";

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

    it("Should set the pokemons in page correctly when running side effects", async () => {
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

    it("Should set the current page when invoking setCurrentPage", async () => {
        useFetchPokemons.mockReturnValue({
            paginatorPokemons: {},
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
});