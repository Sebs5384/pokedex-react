const initialPaginationState = {
    currentPage: 1,
    nextPageItems: 0,
    pokemonsInPage: []
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
        default: 
            return state
    };
};

export {
    paginationReducer,
    initialPaginationState
};