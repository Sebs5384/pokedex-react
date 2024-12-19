import { renderHook, act, waitFor } from "@testing-library/react";
import { initialCatchPokemonState } from "../../reducers/catchPokemonReducer";
import { getRandomPokemon, parsePokemonData } from "../../utils/pokemon";
import { replaceNullItem } from "../../utils/general";
import useFetchPokemon from "../useFetchPokemon";
import useFetchSpecies from "../useFetchSpecies";
import useGetPokemonSprite from "../useGetPokemonSprite";
import useHandleCatchPokemon from "../useHandleCatchPokemon";

jest.mock("../../utils/pokemon");
jest.mock("../../utils/general", () => ({
    ...jest.requireActual("../../utils/general"),
    replaceNullItem: jest.fn(),
}));
jest.mock("../useFetchPokemon", () => jest.fn());
jest.mock("../useFetchSpecies", () => jest.fn());
jest.mock("../useGetPokemonSprite", () => jest.fn());

describe("useHandleCatchPokemon", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Should call getRandomPokemon and update states when handlePokeballClick is called", async () => {
        const pokemonList = ["testsaur", "testmander", "testrtle"];
        const pokemonCount = 3;
        useFetchPokemon.mockReturnValue({ caughtPokemonData: { name: "testmeleon" }, caughtPokemonError: null });
        useFetchSpecies.mockReturnValue({ caughtSpeciesData: { name: "testmeleon" }, caughtPokemonSpeciesError: null });
        useGetPokemonSprite.mockReturnValue({ caughtPokemonSprite: { current: "some-random.png", previous: null }});
        getRandomPokemon.mockImplementation(() => "testmeleon");

        const { result } = renderHook(() => useHandleCatchPokemon(pokemonCount, pokemonList));

        expect(result.current.isShaking).toBe(false);
        expect(result.current.caughtModalVisibility).toBe(false);

        act(() => {
            result.current.handlePokeballClick();
        });

        await waitFor(() => {
            expect(getRandomPokemon).toHaveBeenCalledTimes(1);
            expect(getRandomPokemon).toHaveBeenCalledWith(pokemonCount, pokemonList);
            expect(result.current.isShaking).toBe(true);
            expect(result.current.caughtModalVisibility).toBe(true);
        });

        act(() => {
            jest.advanceTimersByTime(6000);
        });

        await waitFor(() => {
            expect(result.current.isShaking).toBe(false);
        });
    });

    it("Should handle text changes and modal visibilities when calling handleTextChange method", async () => {
        useFetchPokemon.mockReturnValue({ caughtPokemonData: { name: "testmeleon" }, caughtPokemonError: null });
        useFetchSpecies.mockReturnValue({ caughtSpeciesData: { name: "testmeleon" }, caughtPokemonSpeciesError: null });
        useGetPokemonSprite.mockReturnValue({ caughtPokemonSprite: { current: "some-random.png", previous: null }});
        getRandomPokemon.mockImplementation(() => "testmeleon");
        
        const initialProps = {
            pokemonsCount: 3,
            pokemonList: ["testsaur", "testmander", "testrtle"],
        };
        const { result } = renderHook(
            (props) => useHandleCatchPokemon(
                props.pokemonsCount,
                props.pokemonList
            ), {
                initialProps: initialProps,
            }
        );

        expect(result.current.isShaking).toBe(false);
        expect(result.current.caughtModalVisibility).toBe(false);
        expect(result.current.textChange).toBe(true);

        act(() => {
            result.current.handlePokeballClick();
        });

        expect(result.current.isShaking).toBe(true);
        expect(result.current.caughtModalVisibility).toBe(true);
        expect(result.current.topText).toBe("Gotcha !");
        expect(result.current.bottomText).toBe("TESTMELEON was caught");

        act(() => {
            jest.advanceTimersByTime(3000);
        });

        await waitFor(() => {
            expect(result.current.textChange).toBe(false);
            expect(result.current.topText).toBe("");
            expect(result.current.bottomText).toBe("");
        });

        act(() => {
            jest.advanceTimersByTime(500);
        });

        await waitFor(() => {
            expect(result.current.textChange).toBe(true);
            expect(result.current.topText).toBe("TESTMELEON'S data was");
            expect(result.current.bottomText).toBe("added to the POKéDEX");
        });

        act(() => {
            jest.advanceTimersByTime(3000);
        });

        await waitFor(() => {
            expect(result.current.isShaking).toBe(false);
            expect(result.current.caughtModalVisibility).toBe(false);
            expect(result.current.registrationModalVisibility).toBe(true);
        });

        act(() => {
            jest.advanceTimersByTime(10000);
        });

        await waitFor(() => {
            expect(result.current.registrationModalVisibility).toBe(false);
        });
    });

    it("Should update caught states when data is available", async () => {
        useFetchPokemon.mockReturnValue({ caughtPokemonData: { name: "testmeleon" }, caughtPokemonError: null });
        useFetchSpecies.mockReturnValue({ caughtSpeciesData: { evolves_from: "testmander" }, caughtPokemonSpeciesError: null });
        useGetPokemonSprite.mockReturnValue({ 
            caughtPokemonSprite: { current: "some-random.png", previous: null },
            loadingSprite: false,
        });
        getRandomPokemon.mockReturnValue("testmeleon");
        parsePokemonData.mockReturnValue({ name: "testmeleon", id: 1 });
        replaceNullItem.mockReturnValue([{ name: "testmeleon", id: 1 }, null, null]);

        const pokemonsCount = 3;
        const pokemonList = ["testsaur", "testmander", "testrtle"];
        const mockStates = {
            ...initialCatchPokemonState,
            caughtPokemon: { name: "testmeleon", id: 1 },
            caughtPokemons: [{ name: "testmeleon", id: 1 }, null, null],
            randomPokemon: "testmeleon",
        };
        const { result, rerender } = renderHook(() => useHandleCatchPokemon(pokemonsCount, pokemonList, mockStates));
        
        expect(result.current.topText).toBe("");
        expect(result.current.bottomText).toBe("");
    
        act(() => {
            result.current.handlePokeballClick();
        });

        await waitFor(() => {
            expect(result.current.topText).toBe("Gotcha !");
            expect(result.current.bottomText).toBe("TESTMELEON was caught");
            expect(result.current.isShaking).toBe(true);
        });

        act(() => {
            jest.advanceTimersByTime(15000);
        });

        expect(result.current.isShaking).toBe(false);
        expect(result.current.caughtPokemon).toEqual({ name: "testmeleon", id: 1 });
        expect(result.current.caughtPokemons).toEqual([{ name: "testmeleon", id: 1 }, null, null]);
        expect(result.current.caughtPokemonSprite).toEqual([{ current: "some-random.png", previous: null }]);
        expect(parsePokemonData).toHaveBeenCalledTimes(1);
        expect(parsePokemonData).toHaveBeenCalledWith({ name: "testmeleon" }, { evolves_from: "testmander" });
        expect(replaceNullItem).toHaveBeenCalledTimes(1);
        expect(replaceNullItem).toHaveBeenCalledWith([ { name: "testmeleon", id: 1 }, null, null], { name: "testmeleon", id: 1 });
    });

    it("Should set the modal visibility to false if the fetch pokemon returns an error", async () => {
        useFetchPokemon.mockReturnValue({ caughtPokemonData: null, caughtPokemonError: new Error("Pokemon not found") });
        useFetchSpecies.mockReturnValue({ caughtSpeciesData: null, caughtPokemonSpeciesError: null });
        useGetPokemonSprite.mockReturnValue({ caughtPokemonSprite: null, loadingSprite: false });

        const pokemonsCount = 3;
        const pokemonList = ["testsaur", "testmander", "testrtle"];
        const { result } = renderHook(() => useHandleCatchPokemon(pokemonsCount, pokemonList));

        act(() => {
            result.current.handlePokeballClick();
        });

        act(() => {
            jest.advanceTimersByTime(3000);
        });

        expect(result.current.isShaking).toBe(true);
        expect(result.current.caughtModalVisibility).toBe(false);
    });
}); 