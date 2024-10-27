const initialSelectedCardState = {
    selectedCardName: null,
    selectedCardData: null,
    emptySelectedCardData: null
};

function selectedCardReducer(state = initialSelectedCardState, action) {
    const { type, payload } = action;

    switch(type) {
        case "SET_SELECTED_CARD_NAME":
            return {
                ...state,
                selectedCardName: payload
            };
        case "SET_SELECTED_CARD_DATA": 
            return {
                ...state,
                selectedCardData: payload
            };
        case "RESET_SELECTED_CARD_DATA": 
            return {
                ...state,
                selectedCardData: null
            };
        case "EMPTY_SELECTED_CARD_DATA":
            return {
                ...state,
                emptySelectedCardData: payload
            };
        default:
            return state;
    };
};

export {
    initialSelectedCardState,
    selectedCardReducer
};