import { renderHook, act } from "@testing-library/react";
import useHandleErrorMessage from "../useHandleErrorMessage";
import React from "react";

describe("useHandleErrorMessage", () => {
    it("Should set visibility off when using handleCloseErrorMessage method", () => {
        const cardError = { message: "An error happened while loading the card" };
        const paginatorError = { message: "An error happened while loading the paginator" };
        const caughtPokemonError = { message: "An error happened while loading the caught pokemon" };
        const searchboxError = { message: "An error happened while loading the searchbox" };

        const { result } = renderHook(() => useHandleErrorMessage(cardError, paginatorError, caughtPokemonError, searchboxError));
        
        expect(result.current.cardErrorMessageVisibility).toBe(true);
        expect(result.current.paginatorErrorMessageVisibility).toBe(true);
        expect(result.current.caughtPokemonErrorMessageVisibility).toBe(true);
        expect(result.current.searchboxErrorMessageVisibility).toBe(true);
    
        act(() => {
            result.current.handleCloseErrorMessage();
        });

        expect(result.current.cardErrorMessageVisibility).toBe(false);
        expect(result.current.paginatorErrorMessageVisibility).toBe(false);
        expect(result.current.caughtPokemonErrorMessageVisibility).toBe(false);
        expect(result.current.searchboxErrorMessageVisibility).toBe(false);
    });
    
    it("Should update card error states when cardError prop is true", () => {
        const cardError = { message: "An error happened while loading the card" };
        
        const { result, rerender } = renderHook(
            ({ cardError }) => 
                useHandleErrorMessage(cardError, null, null, null),
            { initialProps: { cardError: null } }
        );

        rerender({ cardError });

        expect(result.current.errorCauseMessage).toBe("An error happened while loading the card");
        expect(result.current.errorMessage).toBe("There was an error while loading the Pokemon Card, please try again later.");
        expect(result.current.cardErrorMessageVisibility).toBe(true);
        expect(result.current.paginatorErrorMessageVisibility).toBe(false);
        expect(result.current.caughtPokemonErrorMessageVisibility).toBe(false);
        expect(result.current.searchboxErrorMessageVisibility).toBe(false);
    });

    it("Should update paginator error states when paginatorError prop is true", () => {
        const paginatorError = { message: "An error happened while loading the paginator" };

        const { result, rerender } = renderHook(
            ({ paginatorError }) => 
                useHandleErrorMessage(null, null, null, paginatorError),
            { initialProps: { paginatorError: null } }
        );

        rerender({ paginatorError });

        expect(result.current.errorCauseMessage).toBe("An error happened while loading the paginator");
        expect(result.current.errorMessage).toBe("There was an error while loading the paginator, please try again later.");
        expect(result.current.cardErrorMessageVisibility).toBe(false);
        expect(result.current.paginatorErrorMessageVisibility).toBe(true);
        expect(result.current.caughtPokemonErrorMessageVisibility).toBe(false);
        expect(result.current.searchboxErrorMessageVisibility).toBe(false);
    });

    it("Should update caught pokemon error states when caughtPokemonError prop is true", () => {
        const caughtPokemonError = { message: "An error happened while loading the caught pokemon" };

        const { result, rerender } = renderHook(
            ({ caughtPokemonError }) => 
                useHandleErrorMessage(null, caughtPokemonError, null, null),
            { initialProps: { caughtPokemonError: null } }
        );
    
        rerender({ caughtPokemonError });

        expect(result.current.errorCauseMessage).toBe("An error happened while loading the caught pokemon");
        expect(result.current.errorMessage).toBe("There was an error while loading the caught Pokemon, please try again later.");
        expect(result.current.cardErrorMessageVisibility).toBe(false);
        expect(result.current.paginatorErrorMessageVisibility).toBe(false);
        expect(result.current.caughtPokemonErrorMessageVisibility).toBe(true);
        expect(result.current.searchboxErrorMessageVisibility).toBe(false);
    });

    it("Should update searchbox error states when searchboxError prop is true", () => {
        const searchboxError = { message: "An error happened while loading the searchbox" };

        const { result, rerender } = renderHook(
            ({ searchboxError }) => 
                useHandleErrorMessage(null, null, searchboxError, null),
            { initialProps: { searchboxError: null } }
        );

        rerender({ searchboxError });

        expect(result.current.errorCauseMessage).toBe("An error happened while loading the searchbox");
        expect(result.current.errorMessage).toBe("There was an error while loading the searchbox, please try again later.");
        expect(result.current.cardErrorMessageVisibility).toBe(false);
        expect(result.current.paginatorErrorMessageVisibility).toBe(false);
        expect(result.current.caughtPokemonErrorMessageVisibility).toBe(false);
        expect(result.current.searchboxErrorMessageVisibility).toBe(true);
    });

    it("Should make sure it dispatches the correct error message", () => {
        let mockDispatch = jest.fn();

        jest.spyOn(React, "useReducer").mockImplementation((reducer, initialState) => {
            return [initialState, mockDispatch];
        });

        const cardError = { message: "An error happened while loading the card" };
        renderHook(() => useHandleErrorMessage(cardError, null, null, null));

        expect(mockDispatch).toHaveBeenCalledTimes(3);
        expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_ERROR_CAUSE_MESSAGE", payload: "An error happened while loading the card" });
        expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_CARD_ERROR_MESSAGE_VISIBILITY", payload: true });
        expect(mockDispatch).toHaveBeenCalledWith({ type: "SET_ERROR_MESSAGE", payload: "There was an error while loading the Pokemon Card, please try again later." });
    });
});