import { renderHook } from "@testing-library/react";
import useHandleErrorMessage from "../useHandleErrorMessage";
import React from "react";

describe("useHandleErrorMessage", () => {
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
    });
});