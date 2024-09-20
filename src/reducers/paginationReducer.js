const initialPaginationState = {
    currentPage: 1,
    nextPageItems: 0,
    pokemonsInPage: [],
    searchboxValue: "",
    popupMessage: "",
    invalidPagePopup: false
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
        case "SET_POPUP_VISIBILITY":
            return {
                ...state,
                invalidPagePopup: payload
            };
        case "SET_POPUP_MESSAGE":
            return {
                ...state,
                popupMessage: payload
            };
        default: 
            return state
    };
};

export {
    paginationReducer,
    initialPaginationState
};