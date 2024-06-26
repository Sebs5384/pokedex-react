const initialPaginationState = {
    currentPage: 1,
    nextPageItems: 0
};

function paginationReducer(state = initialPaginationState, action) {
    const { type, payload } = action;

    switch(type) {
        case "SET_CURRENT_PAGE": 
            return {
                ...state,
                currentPage: payload
            };
        case "SET_NEXT_PAGE_ITEMS": 
            return {
                ...state,
                nextPageItems: payload
            };
        default: 
            return state
    };
};

export {
    paginationReducer,
    initialPaginationState
};