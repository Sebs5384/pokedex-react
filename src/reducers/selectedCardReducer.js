const initialSelectedCardState = {
    id: null
};

function selectedCardReducer(state = initialSelectedCardState, action) {
    const { type, payload } = action;

    switch(type) {
        case "SET_SELECTED_CARD":
            return {
                ...state,
                id: payload
            };
        default:
            return state;
    };
};

export {
    initialSelectedCardState,
    selectedCardReducer
};