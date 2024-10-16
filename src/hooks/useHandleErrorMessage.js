import { useReducer, useEffect } from "react";
import { errorMessageReducer, initialErrorMessageState } from "../reducers/index";

function useHandleErrorMessage(error) {
    const [state, dispatch] = useReducer(errorMessageReducer, initialErrorMessageState);

    useEffect(() => {
        if(error) {
            console.log(error);
            dispatch({ type: "SET_ERROR_MESSAGE", payload: error.message });
        } else {
            dispatch({ type: "RESET_ERROR_MESSAGE" });
        };
    }, [error]);

    return {
        errorMessage: state.errorMessage,
    };
};

export default useHandleErrorMessage;