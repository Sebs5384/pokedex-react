const initialPaginationState = {
    currentPage: 1,
    totalPages: 0,
};

function paginationReducer(state = initialPaginationState, action) {
    const { type, payload } = action;

    switch(type) {
        case "SET_CURRENT_PAGE": 
            return {
                ...state,
                currentPage: payload
            };
        default: 
            return state
    };
};

export {
    paginationReducer,
    initialPaginationState
};