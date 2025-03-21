const initialPaginationState = {
    currentPage: 1,
    nextPageItems: 0,
    pokemonsInPage: [],
    searchboxValue: "",
    popupMessage: "",
    cardBackground: "",
    noCards: false,
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
        case "CLEAR_POKEMONS_IN_PAGE": 
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
        case "SET_CARD_BACKGROUND": 
            return {
                ...state,
                cardBackground: payload
            };
        case "SET_NO_CARDS_IN_PAGE":
            return {
                ...state,
                noCards: payload
            };
        default: 
            return state
    };
};

export {
    paginationReducer,
    initialPaginationState
};