import { errorMessageReducer, initialErrorMessageState } from "../errorMessageReducer";

describe("errorMessageReducer", () => {
    it("Should return the default state if no action is passed", () => {
        expect(initialErrorMessageState).toEqual(initialErrorMessageState);
        const state = errorMessageReducer(undefined, {});

        expect(state).toEqual(initialErrorMessageState);
    });

    it("Should update the state with the errorCauseMessage in it", () => {
        expect(initialErrorMessageState.errorCauseMessage).toEqual(null);
        const state = errorMessageReducer(initialErrorMessageState, { type: "SET_ERROR_CAUSE_MESSAGE", payload: "error cause message" });

        expect(state.errorCauseMessage).toEqual("error cause message");
    });

    it("Should update the state with the errorMessage in it", () => {
        expect(initialErrorMessageState.errorMessage).toEqual(null);
        const state = errorMessageReducer(initialErrorMessageState, { type: "SET_ERROR_MESSAGE", payload: "error message" });

        expect(state.errorMessage).toEqual("error message");
    });

    it("Should update the state with the cardErrorMessageVisibility boolean in it", () => {
        expect(initialErrorMessageState.cardErrorMessageVisibility).toEqual(false);
        const state = errorMessageReducer(initialErrorMessageState, { type: "SET_CARD_ERROR_MESSAGE_VISIBILITY", payload: true });

        expect(state.cardErrorMessageVisibility).toEqual(true);
    });

    it("Should update the state with the caughtPokemonErrorMessageVisibility boolean in it", () => {
        expect(initialErrorMessageState.caughtPokemonErrorMessageVisibility).toEqual(false);
        const state = errorMessageReducer(initialErrorMessageState, { type: "SET_CAUGHT_POKEMON_ERROR_MESSAGE_VISIBILITY", payload: true });

        expect(state.caughtPokemonErrorMessageVisibility).toEqual(true);
    });

    it("Should update the state with the searchboxErrorMessageVisibility boolean in it", () => {
        expect(initialErrorMessageState.searchboxErrorMessageVisibility).toEqual(false);
        const state = errorMessageReducer(initialErrorMessageState, { type: "SET_SEARCHBOX_ERROR_MESSAGE_VISIBILITY", payload: true });

        expect(state.searchboxErrorMessageVisibility).toEqual(true);
    });

    it("Should update the state with the paginatorErrorMessageVisibility boolean in it", () => {
        expect(initialErrorMessageState.paginatorErrorMessageVisibility).toEqual(false);
        const state = errorMessageReducer(initialErrorMessageState, { type: "SET_PAGINATOR_ERROR_MESSAGE_VISIBILITY", payload: true });

        expect(state.paginatorErrorMessageVisibility).toEqual(true);
    });
});