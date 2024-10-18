import { useReducer, useEffect } from "react";
import { errorMessageReducer, initialErrorMessageState } from "../reducers/index";

function useHandleErrorMessage(error) {
    const [state, dispatch] = useReducer(errorMessageReducer, initialErrorMessageState);

    const handleCloseErrorMessage = () => {
        dispatch({ type: "SET_ERROR_MESSAGE_VISIBILITY", payload: false})
    };

    useEffect(() => {
        if(error) {
            dispatch({ type: "SET_ERROR_CAUSE_MESSAGE", payload: error.message });
            dispatch({ type: "SET_ERROR_MESSAGE_VISIBILITY", payload: true});
        };
    }, [error]);

    return {
        errorCauseMessage: state.errorCauseMessage,
        errorMessageVisibility: state.errorMessageVisibility,
        handleCloseErrorMessage
    };
};

export default useHandleErrorMessage;