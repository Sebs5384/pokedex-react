import { renderHook, waitFor } from "@testing-library/react";
import { getPokemonSpecies } from "../../service/pokemon";
import useFetchSpecies  from "../useFetchSpecies";

jest.mock("../../service/pokemon", () => ({
    ...jest.requireActual("../../service/pokemon"),
    getPokemonSpecies: jest.fn(),
}));

describe("useFetchSpecies", () => {
    const name = "testmeleon-test";

    it("Should set loading while fetching data", async () => {
        getPokemonSpecies.mockResolvedValue({ evolves_from: "testmander" });
        const { result } = renderHook(() => useFetchSpecies(name, "card"));

        expect(result.current.loadingSpecies).toBe(true);
        await waitFor(() => expect(result.current.loadingSpecies).toBe(null));

        expect(getPokemonSpecies).toHaveBeenCalledTimes(1);
        expect(getPokemonSpecies).toHaveBeenCalledWith("testmeleon", "testmeleon-test");
        expect(result.current.cardSpeciesData).toEqual({ evolves_from: "testmander" });
        expect(result.current.cardSpeciesError).toBe(null);
    });

    it("Should handle errors when fetching data fails", async () => {
        getPokemonSpecies.mockRejectedValue(new Error("Pokemon not found"));
        const { result } = renderHook(() => useFetchSpecies(name, "card"));
    
        expect(result.current.loadingSpecies).toBe(true);
        await waitFor(() => expect(result.current.loadingSpecies).toBe(null));

        expect(getPokemonSpecies).toHaveBeenCalledTimes(1);
        expect(getPokemonSpecies).toHaveBeenCalledWith("testmeleon", "testmeleon-test");
        expect(result.current.cardSpeciesData).toBe(null);
        expect(result.current.cardSpeciesError).toEqual(new Error("Pokemon not found"));
    });
});