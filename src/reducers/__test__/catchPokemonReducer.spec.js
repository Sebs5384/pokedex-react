import { catchPokemonReducer, initialCatchPokemonState } from "../catchPokemonReducer";

describe("catchPokemonReducer", () => {
    it("Should return the initial state when no action is passed", () => {
        expect(initialCatchPokemonState).toEqual(initialCatchPokemonState);
        const state = catchPokemonReducer(undefined, {});

        expect(state).toEqual(initialCatchPokemonState);
    });

    it("Should update the state with the random pokemon in it", () => {
        expect(initialCatchPokemonState.randomPokemon).toEqual(null);
        const state = catchPokemonReducer(initialCatchPokemonState, { type: "SET_RANDOM_POKEMON", payload: "pikachu" });

        expect(state.randomPokemon).toEqual("pikachu");
    });

    it("Should update the state with the caught pokemons array in it", () => {
        expect(initialCatchPokemonState.caughtPokemons).toEqual([null, null, null]);
        const state = catchPokemonReducer(initialCatchPokemonState, { type: "SET_CAUGHT_POKEMONS", payload: ["pikachu", null] });

        expect(state.caughtPokemons).toEqual(["pikachu", null]);
        expect(state.caughtPokemons).toHaveLength(2);
    });

    it("Should update the state with the caught pokemon in it", () => {
        expect(initialCatchPokemonState.caughtPokemon).toEqual(null);
        const state = catchPokemonReducer(initialCatchPokemonState, { type: "SET_CAUGHT_POKEMON", payload: { name: "pikachu"} });

        expect(state.caughtPokemon).toEqual({ name: "pikachu"});
    });

    it("Should update the state with the caught pokemon sprite in it", () => {
        expect(initialCatchPokemonState.caughtPokemonSprite).toEqual([]);
        const state = catchPokemonReducer(initialCatchPokemonState, { type: "SET_CAUGHT_POKEMON_SPRITE", payload: "some-random.png" });

        expect(state.caughtPokemonSprite).toEqual(["some-random.png"]);
    });

    it("Should update the state with the isShaking boolean in it", () => {
        expect(initialCatchPokemonState.isShaking).toEqual(false);
        const state = catchPokemonReducer(initialCatchPokemonState, { type: "SET_SHAKING_EFFECT", payload: true });

        expect(state.isShaking).toEqual(true);
    });

    it("Should update the state with the modalVisibility boolean in it", () => {
        expect(initialCatchPokemonState.modalVisibility).toEqual(false);
        const state = catchPokemonReducer(initialCatchPokemonState, { type: "SET_MODAL_VISIBILITY", payload: true });

        expect(state.modalVisibility).toEqual(true);
    });

    it("Should update the state with the registrationModalVisibility boolean in it", () => {
        expect(initialCatchPokemonState.registrationModalVisibility).toEqual(false);
        const state = catchPokemonReducer(initialCatchPokemonState, { type: "SET_REGISTRATION_MODAL_VISIBILITY", payload: true });

        expect(state.registrationModalVisibility).toEqual(true);
    });

    it("Should update the state with the topText string in it", () => {
        expect(initialCatchPokemonState.topText).toEqual("");
        const state = catchPokemonReducer(initialCatchPokemonState, { type: "SET_TOP_TEXT", payload: "Gotcha !" });

        expect(state.topText).toEqual("Gotcha !");
    });

    it("Should update the state with the bottomText string in it", () => {
        expect(initialCatchPokemonState.bottomText).toEqual("");
        const state = catchPokemonReducer(initialCatchPokemonState, { type: "SET_BOTTOM_TEXT", payload: "pikachu was caught" });

        expect(state.bottomText).toEqual("pikachu was caught");
    });

    it("Should update the state with the textChange boolean in it", () => {
        expect(initialCatchPokemonState.textChange).toEqual(true);
        const state = catchPokemonReducer(initialCatchPokemonState, { type: "TEXT_CHANGE", payload: false });

        expect(state.textChange).toEqual(false);
    });
});