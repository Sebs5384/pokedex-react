import { renderHook, waitFor } from "@testing-library/react";
import { getPokemonSprite } from "../../service/pokemon";
import useGetPokemonSprite  from "../useGetPokemonSprite";

jest.mock("../../service/pokemon", () => ({
    ...jest.requireActual(("../../service/pokemon")),
    getPokemonSprite: jest.fn(),
}));

describe("useGetPokemonSprite", () => {
    const pokemon = { id: 1 };
    const artwork = "some-random-artwork";

    it("Should set loading while fetching an sprite", async () => {
        getPokemonSprite.mockResolvedValue({ current: "https://mocked-sprite-url//1.png", previous: null });
        const { result } = renderHook(() => useGetPokemonSprite(pokemon, artwork, "card"));
        
        expect(result.current.loadingSprite).toBe(true);
        await waitFor(() => expect(result.current.loadingSprite).toBe(null));

        expect(getPokemonSprite).toHaveBeenCalledTimes(1);
        expect(getPokemonSprite).toHaveBeenCalledWith(pokemon, artwork);
        expect(result.current.cardErrorSprite).toBe(null);
        expect(result.current.pokemonCardSprite).toEqual({ current: "https://mocked-sprite-url//1.png", previous: null });
    });

    it("Should handle errors when fetching an sprite fails", async () => {
        getPokemonSprite.mockRejectedValue(new Error("Pokemon not found"));
        const { result } = renderHook(() => useGetPokemonSprite(pokemon, artwork, "card"));

        expect(result.current.loadingSprite).toBe(true);
        await waitFor(() => expect(result.current.loadingSprite).toBe(null));

        expect(getPokemonSprite).toHaveBeenCalledTimes(1);
        expect(getPokemonSprite).toHaveBeenCalledWith(pokemon, artwork);
        expect(result.current.cardErrorSprite).toEqual(new Error("Pokemon not found"));
        expect(result.current.pokemonCardSprite).toBe(null);
    });
});