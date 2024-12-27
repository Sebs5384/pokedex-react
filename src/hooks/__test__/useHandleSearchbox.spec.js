import { renderHook, act, waitFor } from "@testing-library/react";
import { getPokemonNames } from "../../utils/pokemonDataHandlers";
import useFetchPokemons from "../useFetchPokemons";
import useHandleSearchbox from "../useHandleSearchbox";

jest.mock("../../utils/pokemonDataHandlers", () => ({
    getPokemonNames: jest.fn(),
}));
jest.mock("../useFetchPokemons", () => jest.fn());

describe("useHandleSearchbox", () => {
    const limit = 10;
    const offset = 0;

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("Should update the searchbox value when searchbox handler is invoked", () => {
        useFetchPokemons.mockReturnValue({ 
            searchBoxPokemons: [
                { name: "testmander" },
                { name: "testbasaur" },
                { name: "testrtle" },
            ],
        });

        const { result } = renderHook(() => useHandleSearchbox(limit, offset));
        expect(result.current.searchboxPokemon).toBe("");
        expect(result.current.dropdownVisibility).toBe(false);
        
        act(() => {
            result.current.handleSearchPokemon({ target: { value: "test" } });
        });

        expect(result.current.searchboxPokemon).toBe("test");
        expect(result.current.dropdownVisibility).toBe(true);
    });

    it("Should display the dropdown while input focus is active", () => {
        useFetchPokemons.mockReturnValue({
            searchBoxPokemons: [
                { name: "testmander" },
                { name: "testbasaur" },
                { name: "testrtle" },
            ],
        });

        const { result } = renderHook(() => useHandleSearchbox(limit, offset));
        expect(result.current.dropdownVisibility).toBe(false);

        act(() => {
            result.current.handleInputFocus();
        });

        expect(result.current.dropdownVisibility).toBe(true);
    });

    it("Should hide the dropdown while input is on blur", () => {
        useFetchPokemons.mockReturnValue({
            searchBoxPokemons: [
                { name: "testmander" },
                { name: "testbasaur" },
                { name: "testrtle" },
            ],
        });

        const { result } = renderHook(() => useHandleSearchbox(limit, offset));
        expect(result.current.dropdownVisibility).toBe(false);

        act(() => {
            result.current.handleInputFocus();
        });
        expect(result.current.dropdownVisibility).toBe(true);

        act(() => {
            result.current.handleInputOnBlur();
        });
        expect(result.current.dropdownVisibility).toBe(false);
    });

    it("Should set the searchbox items as a side effect", async () => {
        useFetchPokemons.mockReturnValue({
            searchboxPokemons: {
                results: [
                    { name: "testmander" },
                    { name: "testbasaur" },
                    { name: "testrtle" },
                ],
                count: 3
            },
            searchboxError: null
        });
        getPokemonNames.mockReturnValue(["testmander", "testbasaur", "testrtle"]);

        const { result } = renderHook(() => useHandleSearchbox(limit, offset));
        
        await waitFor(() => 
            expect(result.current.pokemonList).toEqual(["testmander", "testbasaur", "testrtle"]),
            expect(result.current.pokemonsCount).toEqual(3)
        );
        expect(getPokemonNames).toHaveBeenCalledTimes(1);
        expect(useFetchPokemons).toHaveBeenCalledTimes(2);
        expect(getPokemonNames).toHaveBeenCalledWith([
            { name: "testmander" },
            { name: "testbasaur" },
            { name: "testrtle" },
        ]);
        expect(useFetchPokemons).toHaveBeenCalledWith(limit, offset, "searchbox");
    });
});