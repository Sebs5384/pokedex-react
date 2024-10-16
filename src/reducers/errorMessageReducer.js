const initialErrorMessageState = {
    errorMessage: null
};

function errorMessageReducer(state = initialErrorMessageState, action) {
    const { type, payload } = action;

    switch(type) {
        case "SET_ERROR_MESSAGE":
            return {
                ...state,
                errorMessage: payload
            };
        default:
            return state;
    };
};

export {
    initialErrorMessageState,
    errorMessageReducer
};