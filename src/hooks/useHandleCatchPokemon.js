import { useReducer, useEffect } from "react";
import { catchPokemonReducer, initialCatchPokemonState } from "../reducers/index";
import { useFetchPokemon, useFetchSpecies, useGetPokemonSprite } from "./index";
import { getRandomPokemon, replaceNullItem } from "../utils/index";
import Pokemon from "../entities/Pokemon";

function useHandleCatchPokemon(pokemonsCount, pokemonList, initialStates = initialCatchPokemonState) {
    const [state, dispatch] = useReducer(catchPokemonReducer, initialStates);
    const { caughtPokemonData, caughtPokemonError } = useFetchPokemon(state.randomPokemon, "caughtPokemon");
    const { caughtSpeciesData } = useFetchSpecies(state.randomPokemon, "caughtPokemon");
    const { loadingSprite, caughtPokemonSprite } = useGetPokemonSprite(state.caughtPokemon, "", "caughtPokemon");

    const handlePokeballClick = () => {
        if(state.caughtPokemons.includes(null) && pokemonList) {
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
        dispatch({type: "SET_BOTTOM_TEXT", payload: `${state.randomPokemon?.split('-')[0].toUpperCase()} was caught`});

        setTimeout(() => {
            dispatch({type: "SET_TOP_TEXT", payload: ""});
            dispatch({type: "SET_BOTTOM_TEXT", payload: ""});
            dispatch({type: "TEXT_CHANGE", payload: false});

            setTimeout(() => {
                dispatch({type: "TEXT_CHANGE", payload: true});
                dispatch({type: "SET_TOP_TEXT", payload: `${state.randomPokemon?.split('-')[0].toUpperCase()}'S data was`})
                dispatch({type: "SET_BOTTOM_TEXT", payload: "added to the POKéDEX"});

                setTimeout(() => {
                    dispatch({type: "SET_MODAL_VISIBILITY", payload: false});
                    dispatch({type: "SET_REGISTRATION_MODAL_VISIBILITY", payload: true});
                    
                    setTimeout(() => {
                        dispatch({type: "SET_REGISTRATION_MODAL_VISIBILITY", payload: false});
                    }, 10000);
                }, 3000);
            }, 500);
        }, 3000);
    };

    useEffect(() => {
        if(state.randomPokemon && caughtPokemonData && caughtSpeciesData) {
            const parsedPokemon = new Pokemon(caughtPokemonData, caughtSpeciesData);
            dispatch({ type: "SET_CAUGHT_POKEMON", payload: parsedPokemon });
            
            const updatedCaughtPokemons = replaceNullItem(state.caughtPokemons, parsedPokemon);
            dispatch({ type: "SET_CAUGHT_POKEMONS", payload: updatedCaughtPokemons });
        };
    }, [caughtPokemonData, caughtSpeciesData]);

    useEffect(() => {
        if(!loadingSprite && caughtPokemonSprite) {
            dispatch({ type: "SET_CAUGHT_POKEMON_SPRITE", payload: caughtPokemonSprite });
        };
    }, [caughtPokemonSprite, loadingSprite]);

    useEffect(() => {
        if(state.isShaking) {
            if(caughtPokemonError) dispatch ({type: "SET_MODAL_VISIBILITY", payload: false});
            handleTextChange();
        };
    }, [state.isShaking]);

    return {
        caughtPokemons: state.caughtPokemons,
        caughtPokemon: state.caughtPokemon,
        caughtPokemonError: caughtPokemonError,
        caughtPokemonSprite: state.caughtPokemonSprite,
        loadingSprite: loadingSprite,
        isShaking: state.isShaking,
        caughtModalVisibility: state.modalVisibility,
        registrationModalVisibility: state.registrationModalVisibility,
        topText: state.topText,
        bottomText: state.bottomText,
        textChange: state.textChange,
        randomPokemon: state.randomPokemon,
        handlePokeballClick,
    };
};

export default useHandleCatchPokemon;