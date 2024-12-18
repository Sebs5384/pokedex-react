import { renderHook, act, waitFor } from "@testing-library/react";
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
        useFetchSpecies.mockReturnValue({ caughtPokemonSpeciesData: { name: "testmeleon" }, caughtPokemonSpeciesError: null });
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
        const initialProps = {
            pokemonsCount: 3,
            pokemonList: ["testsaur", "testmander", "testrtle"],
        };

        useFetchPokemon.mockReturnValue({ caughtPokemonData: { name: "testmeleon" }, caughtPokemonError: null });
        useFetchSpecies.mockReturnValue({ caughtPokemonSpeciesData: { name: "testmeleon" }, caughtPokemonSpeciesError: null });
        useGetPokemonSprite.mockReturnValue({ caughtPokemonSprite: { current: "some-random.png", previous: null }});
        getRandomPokemon.mockImplementation(() => "testmeleon");

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
});