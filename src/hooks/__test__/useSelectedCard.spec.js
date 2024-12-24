import { renderHook, act, waitFor } from "@testing-library/react";
import { parsePokemonData } from "../../utils/pokemon";
import useSelectedCard from "../useSelectedCard";
import useFetchPokemon from "../useFetchPokemon";
import useFetchSpecies from "../useFetchSpecies";
import useGetPokemonSprite from "../useGetPokemonSprite";

jest.mock(("../../utils/pokemon"), () => ({
    parsePokemonData: jest.fn(),
}));
jest.mock("../useFetchPokemon", () => jest.fn());
jest.mock("../useFetchSpecies", () => jest.fn());
jest.mock("../useGetPokemonSprite", () => jest.fn());

describe("useSelectedCard", () => {
    it("Should reset the card data and then set it when invoking setSelectedCard", () => {
        useFetchPokemon.mockReturnValue({
            loading: false,
        });
        useFetchSpecies.mockReturnValue({
            loadingSpecies: false,
        });
        useGetPokemonSprite.mockReturnValue({
            loadingSprite: false,
        });
        const { result } = renderHook(() => useSelectedCard("testmeleon"));
        expect(result.current.cardData).toBe(null);

        act(() => {
            result.current.setSelectedCard("testmeleon");
        });
        expect(result.current.cardData).toBe(null);
        expect(result.current.cardName).toBe("testmeleon");
    });

    it("Should parse and set card data when fetched data is provided", async () => {
        useFetchPokemon.mockReturnValue("")
        .mockReturnValueOnce({
            loading: false,
        })
        .mockReturnValueOnce({
            pokemonCardData: { name: "testmeleon", id: 2 },
        });

        useFetchSpecies.mockReturnValue("")
        .mockReturnValueOnce({
            loadingSpecies: false,
        })
        .mockReturnValueOnce({
            cardSpeciesData: { evolves_from: "testmander", id: 2 },
        });

        useGetPokemonSprite.mockReturnValue({
            pokemonCardSprite: { current: "some-random.png", previous: null },
        });

        parsePokemonData.mockReturnValue({
            name: "testmeleon",
            id: 2,
            evolves_from: "testmander",
        });
        const { result } = renderHook(() => useSelectedCard("official-artwork"));
        expect(result.current.cardData).toBe(null);
        expect(result.current.emptyCardData).toBe(null);

        act(() => {
            result.current.setSelectedCard("testmeleon");
        });
        expect(result.current.cardData).toEqual({
            name: "testmeleon",
            id: 2,
            evolves_from: "testmander",
        });
        expect(result.current.pokemonSprite).toEqual({
            current: "some-random.png",
            previous: null,
        });
        expect(result.current.emptyCardData).toBe(null);
        expect(useFetchPokemon).toHaveBeenCalledTimes(3);
        expect(useFetchSpecies).toHaveBeenCalledTimes(3);
        expect(useGetPokemonSprite).toHaveBeenCalledTimes(3);
        expect(parsePokemonData).toHaveBeenCalledTimes(1);
    });

    it("Should set empty card data when fetched data is faulty", () => {
        useFetchPokemon.mockReturnValue("")
        .mockReturnValueOnce({
            loading: false,
        })
        .mockReturnValueOnce({
            pokemonCardData: { name: "testmeleon" },
        });

        useFetchSpecies.mockReturnValue("")
        .mockReturnValueOnce({
            loadingSpecies: false,
        })
        .mockReturnValueOnce({
            cardSpeciesData: { evolves_from: "testmander" },
        });

        useGetPokemonSprite.mockReturnValue({
            pokemonSprite: { current: "some-random.png", previous: null },
        });
        const { result } = renderHook(() => useSelectedCard("official-artwork"));
        act(() => {
            result.current.setSelectedCard("testmeleon");
        });

        expect(result.current.cardName).toBe("testmeleon");
        expect(result.current.cardData).toBe(null);
        expect(result.current.pokemonSprite).toBe(undefined);
        expect(result.current.emptyCardData).toEqual({
            emptyErrorCause: "Error empty response from the server",
            emptyErrorMessage: "Seems like there is no card data to display try again later"
        });
        expect(useFetchPokemon).toHaveBeenCalledTimes(3);
        expect(useFetchSpecies).toHaveBeenCalledTimes(3);
        expect(useGetPokemonSprite).toHaveBeenCalledTimes(3);
        expect(parsePokemonData).toHaveBeenCalledTimes(0);  
    });
});