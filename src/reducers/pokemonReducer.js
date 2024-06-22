const initialPokemonState = {
    loading: false,
    data: null,
    error: null
};

const pokemonReducer = (state = initialPokemonState, action) => {
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
                loading: false,
                data: payload,
                error: null
            };
        case "FETCH_FAILURE":
            return {
                ...state,
                loading: false,
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