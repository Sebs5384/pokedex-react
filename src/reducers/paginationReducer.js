const intialState = {
    currentPage: 1,
    totalPages: 0,
    limit: 0,
    offset: 0
};

function paginationReducer(state = intialState, action) {
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
        case "SET_LIMIT":
            return {
                ...state,
                limit: payload
            };
        case "SET_OFFSET":
            return {
                ...state,
                offset: payload
            };
        default: 
            return state
    };
};

export {
    paginationReducer,
    intialState
};