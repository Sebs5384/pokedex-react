const initialCatchPokemonState = {
    randomNumber: null,
    caughtPokemons: [null, null, null],
    isShaking: false
};

function catchPokemonReducer(state = initialCatchPokemonState, action) {
    const { type, payload } = action;

    switch(type) {
        case "SET_RANDOM_POKEMON":
            return {
                ...state,
                randomPokemon: payload
            };
        case "SET_CAUGHT_POKEMONS":
            return {
                ...state,
                caughtPokemons: payload
            };
        case "SET_SHAKING_EFFECT":
            return {
                ...state,
                isShaking: payload
            };
        default:
            return state;
    };
};

export {
    initialCatchPokemonState,
    catchPokemonReducer
};