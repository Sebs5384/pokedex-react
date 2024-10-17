const initialHandleCardState = {
    cardModalVisibility: false,
    isLoading: false
};

function handleCardReducer(state = initialHandleCardState, action) {
    const { type, payload } = action;

    switch(type) {
        case "SET_CARD_MODAL_VISIBILITY":
            return {
                ...state,
                cardModalVisibility: payload
            };
        case "SET_IS_LOADING":
            return {
                ...state,
                isLoading: payload
            };
        default:
            return state;
    };
};

export {
    initialHandleCardState,
    handleCardReducer
};