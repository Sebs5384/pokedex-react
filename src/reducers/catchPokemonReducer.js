const initialCatchPokemonState = {
    randomNumber: null,
    caughtPokemons: [null, null, null],
    caughtPokemon: null,
    caughtPokemonSprite: [],
    isShaking: false,
    modalVisibility: false,
    registrationModalVisibility: false,
    topText: "",
    bottomText: "",
    textChange: true
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
        case "SET_CAUGHT_POKEMON":
            return {
                ...state,
                caughtPokemon: payload
            };
        case "SET_CAUGHT_POKEMON_SPRITE": 
            return {
                ...state,
                caughtPokemonSprite: [...state.caughtPokemonSprite, payload]
            };
        case "SET_SHAKING_EFFECT":
            return {
                ...state,
                isShaking: payload
            };
        case "SET_MODAL_VISIBILITY": 
            return {
                ...state,
                modalVisibility: payload
            }
        case "SET_REGISTRATION_MODAL_VISIBILITY":
            return {
                ...state,
                registrationModalVisibility: payload
            };
        case "SET_TOP_TEXT": 
            return {
                ...state,
                topText: payload
            };
        case "SET_BOTTOM_TEXT": 
            return {
                ...state,
                bottomText: payload
            };
        case "TEXT_CHANGE": 
            return {
                ...state,
                textChange: payload
            }
        default:
            return state;
    };
};

export {
    initialCatchPokemonState,
    catchPokemonReducer
};