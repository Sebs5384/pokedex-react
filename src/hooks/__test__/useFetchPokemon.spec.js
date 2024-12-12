import { renderHook } from "@testing-library/react-hooks";
import { getPokemon } from "../../service/pokemon";
import useFetchPokemon  from "../useFetchPokemon";

jest.mock("../../service/pokemon", () => ({
    ...jest.requireActual("../../service/pokemon"),
    getPokemon: jest.fn(),
}));

describe("useFetchPokemon", () => {
    it("Should set loading while fetching data", async () => {
        getPokemon.mockResolvedValue({ name: "testmeleon" });
        const { result, waitForNextUpdate } = renderHook(() => useFetchPokemon("testmeleon", "card"));

        expect(result.current.loading).toBe(true);
        await waitForNextUpdate();

        expect(result.current.loading).toBe(null);
        expect(result.current.pokemonCardData).toEqual({ name: "testmeleon" });
        expect(result.current.pokemonCardError).toBe(null);
    });

    it("Should handle errors when fetching data fails", async () => {
        getPokemon.mockRejectedValue(new Error("Pokemon not found"));
        const { result, waitForNextUpdate } = renderHook(() => useFetchPokemon("testmeleon", "card"));

        expect(result.current.loading).toBe(true);
        await waitForNextUpdate();

        expect(result.current.loading).toBe(null);
        expect(result.current.pokemonCardData).toBe(null);
        expect(result.current.pokemonCardError).toEqual(new Error("Pokemon not found"));
    });
});