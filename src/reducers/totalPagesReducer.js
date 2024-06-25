const initialTotalPagesState = {
    totalPages: []
};

function totalPagesReducer(state = initialTotalPagesState, action) {
    const { type, payload } = action;

    switch(type) {
        case "SET_TOTAL_PAGES":
            return {
                ...state,
                totalPages: payload
            };
        default:
            return state;
    };
};

export {
    totalPagesReducer,
    initialTotalPagesState
};