const initialSearchboxState = {
    searchBoxPokemon: "",
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
                searchBoxPokemon: payload
            };
        case "SET_DROPDOWN_VISIBILITY":
            return {
                ...state,
                dropdownVisibility: payload
            };
        default:
            return state;
    };
};

export {
    searchboxReducer,
    initialSearchboxState
};