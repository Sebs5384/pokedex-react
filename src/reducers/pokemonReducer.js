const initialPokemonState = {
    loading: null,
    data: null,
    error: null
};

function pokemonReducer(state = initialPokemonState, action) {
    const { type, payload } = action;

    switch(type) {
        case "FETCH_REQUEST":
            return {
                ...state,
                loading: true,
                data: null,
                error: null
            };
        case "FETCH_SUCCESS":
            return {
                ...state,
                loading: null,
                data: payload,
                error: null
            };
        case "FETCH_FAILURE":
            return {
                ...state,
                loading: null,
                data: null,
                error: payload
            };
        default:
            return state;
    };
};

export {
    pokemonReducer,
    initialPokemonState
};