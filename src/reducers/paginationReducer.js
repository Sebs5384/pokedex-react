const initialPaginationState = {
    currentPage: 1,
    totalPages: 0,
    ITEMS_PER_PAGE: 20,
    INITIAL_PAGE_INDEX: 1
};

function paginationReducer(state = initialPaginationState, action) {
    const { type, payload } = action;

    switch(type) {
        case "SET_CURRENT_PAGE": 
            return {
                ...state,
                currentPage: payload
            };
        case "SET_TOTAL_PAGES":
            return {
                ...state,
                totalPages: payload
            };
        default: 
            return state
    };
};

export {
    paginationReducer,
    initialPaginationState
};