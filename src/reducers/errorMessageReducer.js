const initialErrorMessageState = {
    errorCauseMessage: null,
    errorMessage: null,
    errorMessageVisibility: false
};

function errorMessageReducer(state = initialErrorMessageState, action) {
    const { type, payload } = action;

    switch(type) {
        case "SET_ERROR_CAUSE_MESSAGE":
            return {
                ...state,
                errorCauseMessage: payload
            };
        case "SET_ERROR_MESSAGE": 
            return {
                ...state,
                errorMessage: payload
            };
        case "SET_ERROR_MESSAGE_VISIBILITY":
            return {
                ...state,
                errorMessageVisibility: payload
            };
        default:
            return state;
    };
};

export {
    initialErrorMessageState,
    errorMessageReducer
};