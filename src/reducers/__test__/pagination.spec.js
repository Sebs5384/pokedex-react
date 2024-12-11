import { paginationReducer, initialPaginationState } from "../paginationReducer";

describe("paginationReducer", () => {
    it("Should return the default state when no action is passed", () => {
        expect(initialPaginationState).toEqual(initialPaginationState);
        const state = paginationReducer(undefined, {});

        expect(state).toEqual(initialPaginationState);
    });

    it("Should update the state with the currentPage integer in it", () => {
        expect(initialPaginationState.currentPage).toEqual(1);
        const state = paginationReducer(initialPaginationState, { type: "SET_CURRENT_PAGE", payload: 2 });

        expect(state.currentPage).toEqual(2);
        expect(state.currentPage).not.toEqual(1);
        expect(typeof state.currentPage).toEqual("number");
    });

    it("Should update the state with the nextPageItems", () => {
        expect(initialPaginationState.nextPageItems).toEqual(0);
        const state = paginationReducer(initialPaginationState, { type: "SET_NEXT_PAGE_ITEMS", payload: 20 });

        expect(state.nextPageItems).toEqual(20);
        expect(state.nextPageItems).not.toEqual(0);
        expect(typeof state.nextPageItems).toEqual("number");
    });

    it("Should update the state with the pokemonsInPage array in it", () => {
        expect(initialPaginationState.pokemonsInPage).toEqual([]);
        const state = paginationReducer(initialPaginationState, { type: "SET_POKEMONS_IN_PAGE", payload: [{ name: "testmeleon" }] });

        expect(state.pokemonsInPage).toEqual([{ name: "testmeleon" }]);
        expect(state.pokemonsInPage).not.toEqual([]);
        expect(state.pokemonsInPage).toHaveLength(1);
    });

    it("Should update the state with the searchboxValue string in it", () => {
        expect(initialPaginationState.searchboxValue).toEqual("");
        const state = paginationReducer(initialPaginationState, { type: "SET_SEARCHBOX_VALUE", payload: "testmeleon" });

        expect(state.searchboxValue).toEqual("testmeleon");
        expect(state.searchboxValue).not.toEqual("");
        expect(typeof state.searchboxValue).toEqual("string");
    });

    it("Should update the state with the popupMessage string in it", () => {
        expect(initialPaginationState.popupMessage).toEqual("");
        const state = paginationReducer(initialPaginationState, { type: "SET_POPUP_MESSAGE", payload: "testmeleon" });

        expect(state.popupMessage).toEqual("testmeleon");
        expect(state.popupMessage).not.toEqual("");
        expect(typeof state.popupMessage).toEqual("string");
    });

    it("Should update the state with the noCards boolean in it", () => {
        expect(initialPaginationState.noCards).toEqual(false);
        const state = paginationReducer(initialPaginationState, { type: "SET_NO_CARDS_IN_PAGE", payload: true });

        expect(state.noCards).toEqual(true);
        expect(state.noCards).not.toEqual(false);
        expect(typeof state.noCards).toEqual("boolean");
    });

    it("Should update the state with the invalidPagePopup boolean in it", () => {
        expect(initialPaginationState.invalidPagePopup).toEqual(false);
        const state = paginationReducer(initialPaginationState, { type: "SET_POPUP_VISIBILITY", payload: true });

        expect(state.invalidPagePopup).toEqual(true);
        expect(state.invalidPagePopup).not.toEqual(false);
        expect(typeof state.invalidPagePopup).toEqual("boolean");
    });
});