const initialPokemonState = {
    loading: null,
    cardData: null,
    caughtPokemonData: null,
    paginatorData: null,
    searchboxData: null,
    cardError: null,
    caughtPokemonError: null,
    paginatorError: null,
    searchboxError: null
};

const sourceMap = {
    card: {
        data: "cardData",
        error: "cardError"
    },
    caughtPokemon: {
        data: "caughtPokemonData",
        error: "caughtPokemonError"
    },
    paginator: {
        data: "paginatorData",
        error: "paginatorError"
    },
    searchbox: {
        data: "searchboxData",
        error: "searchboxError"
    }
};

function pokemonReducer(state = initialPokemonState, action) {
    const { type, payload, source } = action;
    const sourceKeys = sourceMap[source];

    if(!sourceKeys) return state;

    switch(type) {
        case "FETCH_REQUEST":
            return {
                ...state,
                loading: true,
                [sourceKeys.data]: null,
                [sourceKeys.error]: null
            };
        case "FETCH_SUCCESS":
            return {
                ...state,
                loading: null,
                [sourceKeys.data]: payload,
                [sourceKeys.error]: null
            };
        case "FETCH_FAILURE":
            return {
                ...state,
                loading: null,
                [sourceKeys.data]: null,
                [sourceKeys.error]: payload
            };
        default:
            return state;
    };
};

export {
    pokemonReducer,
    initialPokemonState
};