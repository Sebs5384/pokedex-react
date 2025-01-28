import { totalPagesReducer, initialTotalPagesState } from "../totalPagesReducer";

describe("totalPagesReducer", () => {
    it("Should return the default state if no action is passed", () => {
        expect(initialTotalPagesState).toEqual(initialTotalPagesState);
        const state = totalPagesReducer(undefined, {});

        expect(state).toEqual(initialTotalPagesState);
    });

    it("Should update the state with the totalPages array in it", () => {
        expect(initialTotalPagesState.totalPages).toEqual([]);
        const state = totalPagesReducer(initialTotalPagesState, { type: "SET_TOTAL_PAGES", payload: [1, 2, 3] });

        expect(state.totalPages).toEqual([1, 2, 3]);
        expect(state.totalPages).not.toEqual([]);
        expect(typeof state.totalPages).toEqual("object");
    });

    it("Should update the state with the lastPage integer in it", () => {
        expect(initialTotalPagesState.lastPage).toEqual(0);
        const state = totalPagesReducer(initialTotalPagesState, { type: "SET_LAST_PAGE", payload: 3 });

        expect(state.lastPage).toEqual(3);
        expect(state.lastPage).not.toEqual(0);
        expect(typeof state.lastPage).toEqual("number");
    });
});