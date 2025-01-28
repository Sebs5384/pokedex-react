import { handleCardReducer, initialHandleCardState } from "../handleCardReducer";

describe("handleCardReducer", () => {
    it("Should return the default state when no action is passed", () => {
        expect(initialHandleCardState).toEqual(initialHandleCardState);
        const state = handleCardReducer(undefined, {});

        expect(state).toEqual(initialHandleCardState);
    });

    it("Should update the state with the cardModalVisibility boolean in it", () => {
        expect(initialHandleCardState.cardModalVisibility).toEqual(false);
        const state = handleCardReducer(initialHandleCardState, { type: "SET_CARD_MODAL_VISIBILITY", payload: true });

        expect(state.cardModalVisibility).toEqual(true);
    });

    it("Should update the state with the isLoading boolean in it", () => {
        expect(initialHandleCardState.isLoading).toEqual(false);
        const state = handleCardReducer(initialHandleCardState, { type: "SET_IS_LOADING", payload: true });

        expect(state.isLoading).toEqual(true);
        expect(state.loadingText).toEqual("Loading...");
    });
});