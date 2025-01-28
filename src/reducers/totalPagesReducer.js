const initialTotalPagesState = {
    totalPages: [],
    firstPage: 1,
    lastPage: 0
};

function totalPagesReducer(state = initialTotalPagesState, action) {
    const { type, payload } = action;

    switch(type) {
        case "SET_TOTAL_PAGES":
            return {
                ...state,
                totalPages: payload
            };
        case "SET_LAST_PAGE": 
            return {
                ...state,
                lastPage: payload
            };
        default:
            return state;
    };
};

export {
    totalPagesReducer,
    initialTotalPagesState
};