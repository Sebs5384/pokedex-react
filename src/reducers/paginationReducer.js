const initialPaginationState = {
    currentPage: 1,
    nextPageItems: 0,
    pokemonsInPage: [],
    searchboxValue: "",
    invalidPageWarning: false
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
        case "SET_POKEMONS_IN_PAGE": 
            return {
                ...state,
                pokemonsInPage: payload
            };
        case "SET_SEARCHBOX_VALUE":
            return {
                ...state,
                searchboxValue: payload
            };
        case "SET_INVALID_PAGE_WARNING":
            return {
                ...state,
                invalidPageWarning: payload
            };
        default: 
            return state
    };
};

export {
    paginationReducer,
    initialPaginationState
};