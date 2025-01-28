import { renderHook, waitFor } from "@testing-library/react";
import { getPokemons } from "../../service/pokemon";
import useFetchPokemons  from "../useFetchPokemons";

jest.mock("../../service/pokemon", () => ({
    ...jest.requireActual("../../service/pokemon"),
    getPokemons: jest.fn(),
}));

describe("useFetchPokemons", () => {
    const limit = 10;
    const offset = 0;

    it("Should set loading while fetching data", async () => {
        getPokemons.mockResolvedValue([{ name: "testmeleon" }]);
        const { result } = renderHook(() => useFetchPokemons(limit, offset, "paginator"));
        
        expect(result.current.loading).toBe(true);
        await waitFor(() => expect(result.current.loading).toBe(null));

        expect(getPokemons).toHaveBeenCalledTimes(1);
        expect(result.current.paginatorPokemons).toEqual([{ name: "testmeleon" }]);
        expect(result.current.paginatorError).toBe(null);
    });

    it("Should handle errors when fetching data fails", async () => {
        getPokemons.mockRejectedValue(new Error("Pokemon not found"));
        const { result } = renderHook(() => useFetchPokemons(limit, offset, "paginator"));

        expect(result.current.loading).toBe(true);
        await waitFor(() => expect(result.current.loading).toBe(null));

        expect(getPokemons).toHaveBeenCalledTimes(1);
        expect(result.current.paginatorPokemons).toBe(null);
        expect(result.current.paginatorError).toEqual(new Error("Pokemon not found"));
    });
});