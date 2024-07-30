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
        default:
            return state;
    };
};

export {
    initialHandleCardState,
    handleCardReducer
};