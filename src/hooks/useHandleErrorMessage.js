import { useReducer, useEffect } from "react";
import { errorMessageReducer, initialErrorMessageState } from "../reducers/index";

function useHandleErrorMessage(cardError, caughtPokemonError) {
    const [state, dispatch] = useReducer(errorMessageReducer, initialErrorMessageState);

    const handleCloseErrorMessage = () => {
        dispatch({ type: "SET_ERROR_MESSAGE_VISIBILITY", payload: false})
    };

    useEffect(() => {
        if(cardError) {
            dispatch({ type: "SET_ERROR_CAUSE_MESSAGE", payload: cardError.message });
            dispatch({ type: "SET_ERROR_MESSAGE", payload: "There was an error while loading the Pokemon Card, please try again later." });
            dispatch({ type: "SET_ERROR_MESSAGE_VISIBILITY", payload: true });
        };

        if(caughtPokemonError) {
            dispatch({ type: "SET_ERROR_CAUSE_MESSAGE", payload: caughtPokemonError.message });
            dispatch({ type: "SET_ERROR_MESSAGE", payload: "There was an error while loading the caught Pokemon, please try again later." });
            dispatch({ type: "SET_ERROR_MESSAGE_VISIBILITY", payload: true });
        };
    }, [cardError, caughtPokemonError]);

    return {
        errorCauseMessage: state.errorCauseMessage,
        errorMessage: state.errorMessage,
        errorMessageVisibility: state.errorMessageVisibility,
        handleCloseErrorMessage
    };
};

export default useHandleErrorMessage;