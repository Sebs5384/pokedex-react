const initialNavigationState = {
    randomPokemonId: null,
    searchBoxItems: null,
};

function navigationReducer(state = initialNavigationState, action) {
    const { type, payload } = action;

    switch(type) {
        case "SET_RANDOM_POKEMON":
            return {
                ...state,
                randomPokemonId: payload
            };
        case "SET_SEARCH_BOX_ITEMS":
            return {
                ...state,
                searchBoxItems: payload
            };
        default:
            return state;
    };
};

export {
    navigationReducer,
    initialNavigationState
}