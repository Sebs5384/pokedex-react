import { useReducer, useEffect } from "react";
import { catchPokemonReducer, initialCatchPokemonState } from "../reducers/index";
import { useFetchPokemon, useFetchSpecies, useGetPokemonSprite } from "./index";
import { getRandomPokemon, replaceNullItem, parsePokemonData } from "../utils/index";

function useHandleCatchPokemon(pokemonsCount, pokemonList) {
    const [state, dispatch] = useReducer(catchPokemonReducer, initialCatchPokemonState);
    const { pokemon, error } = useFetchPokemon(state.randomPokemon);
    const { species } = useFetchSpecies(state.randomPokemon);
    const { loadingSprite, pokemonSprite } = useGetPokemonSprite(state.caughtPokemon);

    const handlePokeballClick = () => {
        if(state.caughtPokemons.includes(null)) { 
            const randomPokemon = getRandomPokemon(pokemonsCount, pokemonList);

            dispatch({ type: "SET_SHAKING_EFFECT", payload: true });
            dispatch({ type: "SET_MODAL_VISIBILITY", payload: true });
            dispatch({ type: "SET_RANDOM_POKEMON", payload: randomPokemon });
            setTimeout(() => {
                dispatch({ type: "SET_SHAKING_EFFECT", payload: false });
            }, 6000);
        };
    };

    const handleTextChange = () => {
        dispatch({type: "SET_TOP_TEXT", payload: "Gotcha !"});
        dispatch({type: "SET_BOTTOM_TEXT", payload: `${state.randomPokemon.split('-')[0].toUpperCase()} was caught`});

        const textCleanupTimeout = setTimeout(() => {
            dispatch({type: "SET_TOP_TEXT", payload: ""});
            dispatch({type: "SET_BOTTOM_TEXT", payload: ""});
            dispatch({type: "TEXT_CHANGE", payload: false});

            setTimeout(() => {
                dispatch({type: "TEXT_CHANGE", payload: true});
                dispatch({type: "SET_TOP_TEXT", payload: `${state.randomPokemon.split('-')[0].toUpperCase()}'S data was`})
                dispatch({type: "SET_BOTTOM_TEXT", payload: "added to the POKéDEX"});

                setTimeout(() => {
                    dispatch({type: "SET_MODAL_VISIBILITY", payload: false});
                    dispatch({type: "SET_REGISTRATION_MODAL_VISIBILITY", payload: true});

                    if(error) dispatch({type: "SET_REGISTRATION_MODAL_VISIBILITY", payload: false});

                    setTimeout(() => {
                        dispatch({type: "SET_REGISTRATION_MODAL_VISIBILITY", payload: false});
                    }, 10000);
                }, 3000);
            }, 500);
        }, 3000);

        return () => {
            clearTimeout(textCleanupTimeout);
        };
    };

    useEffect(() => {
        if(state.randomPokemon && pokemon && species) {
            const parsedPokemon = parsePokemonData(pokemon, species);
            dispatch({ type: "SET_CAUGHT_POKEMON", payload: parsedPokemon });

            const updatedCaughtPokemons = replaceNullItem(state.caughtPokemons, parsedPokemon);
            dispatch({ type: "SET_CAUGHT_POKEMONS", payload: updatedCaughtPokemons });
        };
    }, [pokemon, species]);

    useEffect(() => {
        if(!loadingSprite && pokemonSprite) {
            dispatch({ type: "SET_CAUGHT_POKEMON_SPRITE", payload: pokemonSprite });
        };
    }, [pokemonSprite, loadingSprite]);

    useEffect(() => {
        if(state.isShaking) {
            handleTextChange();
        };
    }, [state.isShaking]);

    return {
        caughtPokemons: state.caughtPokemons,
        caughtPokemon: state.caughtPokemon,
        caughtPokemonSprite: state.caughtPokemonSprite,
        loadingSprite: loadingSprite,
        isShaking: state.isShaking,
        caughtModalVisibility: state.modalVisibility,
        registrationModalVisibility: state.registrationModalVisibility,
        topText: state.topText,
        bottomText: state.bottomText,
        textChange: state.textChange,
        handlePokeballClick
    };
};

export default useHandleCatchPokemon;