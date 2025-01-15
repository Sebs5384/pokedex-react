import { pokemonReducer, initialPokemonState } from "../pokemonReducer";

describe("pokemonReducer", () => {
    it("Should return the initial state if no source type is passed", () => {
        expect(initialPokemonState).toEqual(initialPokemonState);
        const state = pokemonReducer(undefined, { type: "", payload: "", source: "" });

        expect(state).toEqual(initialPokemonState);
    });

    it("Should return the default state if no type or payload is passed", () => {
        expect(initialPokemonState).toEqual(initialPokemonState);
        const state = pokemonReducer(undefined, { type: "", payload: "", source: "card" });

        expect(state).toEqual(initialPokemonState);
    });

    it("Should update the state when a fetch request is made", () => {
        const mockedSourceMap = {
            card: {
                data: "cardData",
                error: "cardError"
            }
        };

        expect(initialPokemonState).toEqual(initialPokemonState);
        const state = pokemonReducer(initialPokemonState, { type: "FETCH_REQUEST", source: "card" });
        expect(state).toEqual({
            ...initialPokemonState,
            loading: true,
            [mockedSourceMap.card.data]: null,
            [mockedSourceMap.card.error]: null
        });
    });

    it("Should update the stat when a fetch request is successful", () => {
        const mockedSourceMap = {
            card: {
                data: "cardData",
                error: "cardError"
            }
        };

        expect(initialPokemonState).toEqual(initialPokemonState);
        const state = pokemonReducer(initialPokemonState, { type: "FETCH_SUCCESS", payload: { name: "Tesmeleon" }, source: "card" });
        expect(state).toEqual({
            ...initialPokemonState,
            loading: null,
            [mockedSourceMap.card.data]: { name: "Tesmeleon" },
            [mockedSourceMap.card.error]: null
        });
    });

    it("Should update the state when a fetch request fails", () => {
        const mockedSourceMap = {
            card: {
                data: "cardData",
                error: "cardError"
            }
        };

        expect(initialPokemonState).toEqual(initialPokemonState);
        const state = pokemonReducer(initialPokemonState, { type: "FETCH_FAILURE", payload: "some error", source: "card" });
        expect(state).toEqual({
            ...initialPokemonState,
            loading: null,
            [mockedSourceMap.card.data]: null,
            [mockedSourceMap.card.error]: "some error"
        });
    });
});