const initialErrorMessageState = {
    errorCauseMessage: null,
    errorMessage: null,
    cardErrorMessageVisibility: false,
    caughtPokemonErrorMessageVisibility: false,
    searchboxErrorMessageVisibility: false
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
        case "SET_CARD_ERROR_MESSAGE_VISIBILITY":
            return {
                ...state,
                cardErrorMessageVisibility: payload
            };
        case "SET_CAUGHT_POKEMON_ERROR_MESSAGE_VISIBILITY":
            return {
                ...state,
                caughtPokemonErrorMessageVisibility: payload
            };
        case "SET_SEARCHBOX_ERROR_MESSAGE_VISIBILITY":
            return {
                ...state,
                searchboxErrorMessageVisibility: payload
            };
        default:
            return state;
    };
};

export {
    initialErrorMessageState,
    errorMessageReducer
};