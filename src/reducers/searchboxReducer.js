const initialSearchboxState = {
    searchboxPokemon: "",
    searchBoxItems: null,
    dropdownVisibility: false
};

function searchboxReducer(state = initialSearchboxState, action) {
    const { type, payload } = action;

    switch(type) {
        case "SET_SEARCH_BOX_ITEMS":
            return {
                ...state,
                searchBoxItems: payload
            };
        case "SET_SEARCH_BOX_POKEMON":
            return {
                ...state,
                searchboxPokemon: payload
            };
        case "SET_DROPDOWN_VISIBILITY":
            return {
                ...state,
                dropdownVisibility: payload
            };
        case "SET_POKEMON_COUNT": 
            return {
                ...state,
                pokemonCount: payload
            };
        default:
            return state;
    };
};

export {
    searchboxReducer,
    initialSearchboxState
};