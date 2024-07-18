const initialSelectedCardState = {
    name: null,
    data: null
};

function selectedCardReducer(state = initialSelectedCardState, action) {
    const { type, payload } = action;

    switch(type) {
        case "SET_SELECTED_CARD":
            return {
                ...state,
                name: payload
            };
        case "SET_CARD_DATA": 
            return {
                ...state,
                data: payload
            };
        case "RESET_CARD_DATA": 
            return {
                ...state,
                data: null
            };
        default:
            return state;
    };
};

export {
    initialSelectedCardState,
    selectedCardReducer
};