import { searchboxReducer, initialSearchboxState } from "../searchboxReducer";

describe("searchboxReducer", () => {
    it("Should return the default state when no action is passed", () => {
        expect(initialSearchboxState).toEqual(initialSearchboxState);
        const state = searchboxReducer(undefined, {});

        expect(state).toEqual(initialSearchboxState);
    });

    it("Should update the state with the searchboxPokemon string in it", () => {
        expect(initialSearchboxState.searchboxPokemon).toEqual("");
        const state = searchboxReducer(initialSearchboxState, { type: "SET_SEARCH_BOX_POKEMON", payload: "testmeleon" });

        expect(state.searchboxPokemon).toEqual("testmeleon");
        expect(state.searchboxPokemon).not.toEqual("");
        expect(typeof state.searchboxPokemon).toEqual("string");
    });

    it("Should update the state with the searchboxItems in it", () => {
        expect(initialSearchboxState.searchboxItems).toEqual(null);
        const state = searchboxReducer(initialSearchboxState, { type: "SET_SEARCH_BOX_ITEMS", payload: [{ name: "testmeleon" }] });

        expect(state.searchboxItems).toEqual([{ name: "testmeleon" }]);
        expect(state.searchboxItems).not.toEqual(null);
        expect(typeof state.searchboxItems).toEqual("object");
    }); 

    it("Should update the state with the dropdownVisibility boolean in it", () => {
        expect(initialSearchboxState.dropdownVisibility).toEqual(false);
        const state = searchboxReducer(initialSearchboxState, { type: "SET_DROPDOWN_VISIBILITY", payload: true });

        expect(state.dropdownVisibility).toEqual(true);
        expect(state.dropdownVisibility).not.toEqual(false);
        expect(typeof state.dropdownVisibility).toEqual("boolean");
    });

    it("Should update the state with the pokemonCount in it", () => {
        expect(initialSearchboxState.pokemonCount).toEqual(null);
        const state = searchboxReducer(initialSearchboxState, { type: "SET_POKEMON_COUNT", payload: 1000 });

        expect(state.pokemonCount).toEqual(1000);
        expect(state.pokemonCount).not.toEqual(null);
        expect(typeof state.pokemonCount).toEqual("number");
    });
});