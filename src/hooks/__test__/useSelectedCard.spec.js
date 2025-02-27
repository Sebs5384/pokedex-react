import { renderHook, act, waitFor } from "@testing-library/react";
import useSelectedCard from "../useSelectedCard";
import useFetchPokemon from "../useFetchPokemon";
import useFetchSpecies from "../useFetchSpecies";
import useGetPokemonSprite from "../useGetPokemonSprite";
import Pokemon from "../../entities/Pokemon";

jest.mock("../useFetchPokemon", () => jest.fn());
jest.mock("../useFetchSpecies", () => jest.fn());
jest.mock("../useGetPokemonSprite", () => jest.fn());
jest.mock("../../entities/Pokemon");

describe("useSelectedCard", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

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

    it("Should set selected card data when fetched data is correct", () => {
        const pokemonCardData = {
            name: "testmeleon",
            id: 2
        };
        const cardSpeciesData = {
            evolves_from: "testmander",
            id: 2
        };
        useFetchPokemon.mockReturnValue("")
        .mockReturnValueOnce({
            loading: false,
        })
        .mockReturnValueOnce({
            loading: false,
            pokemonCardData,
        });
        useFetchSpecies.mockReturnValue("")
        .mockReturnValueOnce({
            loadingSpecies: false,
        })
        .mockReturnValueOnce({
            loadingSpecies: false,
            cardSpeciesData
        });
        useGetPokemonSprite.mockReturnValue({
            loadingSprite: false,
            pokemonSprite: { 
                current: "some-random.png", 
                previous: null 
            },
        });
        const { result } = renderHook(() => useSelectedCard("official-artwork"));

        act(() => {
            result.current.setSelectedCard("testmeleon");
        });

        expect(Pokemon).toHaveBeenCalledTimes(1);
        expect(Pokemon).toHaveBeenCalledWith(pokemonCardData, cardSpeciesData);
        expect(result.current.cardData).toBeInstanceOf(Pokemon);
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
    });
});