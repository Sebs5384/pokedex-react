import { selectedCardReducer, initialSelectedCardState } from "../selectedCardReducer";

describe("selectedCardReducer", () => {
    it("Should return the default state if no action is passed", () => {
        expect(initialSelectedCardState).toEqual(initialSelectedCardState);
        const state = selectedCardReducer(undefined, {});

        expect(state).toEqual(initialSelectedCardState);
    });

    it("Should update the state with the selectedCardName in it", () => {
        expect(initialSelectedCardState.selectedCardName).toEqual(null);
        const state = selectedCardReducer(initialSelectedCardState, { type: "SET_SELECTED_CARD_NAME", payload: "testmeleon" });

        expect(state.selectedCardName).toEqual("testmeleon");
        expect(state.selectedCardName).not.toEqual(null);
        expect(typeof state.selectedCardName).toEqual("string");
    });

    it("Should update the state with the selectedCardData in it", () => {
        expect(initialSelectedCardState.selectedCardData).toEqual(null);
        const state = selectedCardReducer(initialSelectedCardState, { type: "SET_SELECTED_CARD_DATA", payload: { name: "testmeleon" } });

        expect(state.selectedCardData).toEqual({ name: "testmeleon" }); 
        expect(state.selectedCardData).not.toEqual(null);
        expect(typeof state.selectedCardData).toEqual("object");
    });

    it("Should update the state with the emptySelectedCardData in it", () => {
        expect(initialSelectedCardState.emptySelectedCardData).toEqual(null);
        const state = selectedCardReducer(initialSelectedCardState, { type: "EMPTY_SELECTED_CARD_DATA", payload: { empty: "emptyMock" } });

        expect(state.emptySelectedCardData).toEqual({ empty: "emptyMock" }); 
        expect(state.emptySelectedCardData).not.toEqual(null);
        expect(typeof state.emptySelectedCardData).toEqual("object");
    });

    it("Should reset the selectedCardData state when the RESET_SELECTED_CARD_DATA action is dispatched", () => {
        initialSelectedCardState.selectedCardData = { name: "testmeleon" };
        expect(initialSelectedCardState.selectedCardData).toEqual({ name: "testmeleon" });
        const state = selectedCardReducer(initialSelectedCardState, { type: "RESET_SELECTED_CARD_DATA" });

        expect(state.selectedCardData).toEqual(null);
        expect(state.selectedCardData).not.toEqual({ name: "testmeleon" });
    });
});