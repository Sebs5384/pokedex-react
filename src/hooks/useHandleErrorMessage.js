import { useReducer, useEffect } from "react";
import { errorMessageReducer, initialErrorMessageState } from "../reducers/index";

function useHandleErrorMessage(cardError, caughtPokemonError, searchboxError, paginatorError) {
    const [state, dispatch] = useReducer(errorMessageReducer, initialErrorMessageState);
    const errorSourceMap = {
        card: {
            message: "There was an error while loading the Pokemon Card, please try again later.",
            visibilityType: "SET_CARD_ERROR_MESSAGE_VISIBILITY"
        },
        caughtPokemon: {
            message: "There was an error while loading the caught Pokemon, please try again later.",
            visibilityType: "SET_CAUGHT_POKEMON_ERROR_MESSAGE_VISIBILITY"
        },
        searchbox: {
            message: "There was an error while loading the searchbox, please try again later.",
            visibilityType: "SET_SEARCHBOX_ERROR_MESSAGE_VISIBILITY"
        },
        paginator: {
            message: "There was an error while loading the paginator, please try again later.",
            visibilityType: "SET_PAGINATOR_ERROR_MESSAGE_VISIBILITY"
        }
    };
    

    const handleCloseErrorMessage = () => {
        Object.values(errorSourceMap).forEach(source => {
            dispatch({ type: source.visibilityType, payload: false });
        });
    };

    useEffect(() => {
        const errors = {
            card: cardError,
            caughtPokemon: caughtPokemonError,
            searchbox: searchboxError,
            paginator: paginatorError
        };

        Object.keys(errors).forEach(key => {
            const error = errors[key];
            const { message, visibilityType } = errorSourceMap[key];

            if(error) {
                dispatch({ type: "SET_ERROR_CAUSE_MESSAGE", payload: error.message });
                dispatch({ type: "SET_ERROR_MESSAGE", payload: message });
                dispatch({ type: visibilityType, payload: true });
            };
        });
    }, [cardError, caughtPokemonError, searchboxError, paginatorError]);

    return {
        errorCauseMessage: state.errorCauseMessage,
        errorMessage: state.errorMessage,
        cardErrorMessageVisibility: state.cardErrorMessageVisibility,
        caughtPokemonErrorMessageVisibility: state.caughtPokemonErrorMessageVisibility,
        searchboxErrorMessageVisibility: state.searchboxErrorMessageVisibility,
        paginatorErrorMessageVisibility: state.paginatorErrorMessageVisibility,
        handleCloseErrorMessage
    };
};

export default useHandleErrorMessage;