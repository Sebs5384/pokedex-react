const initialHandleCardState = {
    modalVisibility: false
};

function handleCardReducer(state = initialHandleCardState, action) {
    const { type, payload } = action;

    switch(type) {
        case "SET_MODAL_VISIBILITY":
            return {
                ...state,
                modalVisibility: payload
            };
        case "SET_DEBOUNCE_LOADING":
            return {
                ...state,
                debounceLoading: payload
            };
        default:
            return state;
    };
};

export {
    initialHandleCardState,
    handleCardReducer
};