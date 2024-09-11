import { useReducer, useEffect } from "react";
import { catchPokemonReducer, initialCatchPokemonState } from "../reducers/index";
import { useFetchPokemon } from "./index";
import { getRandomPokemon, replaceNullItem } from "../utils/index";

function useHandleCatchPokemon(pokemonsCount, pokemonList) {
    const [state, dispatch] = useReducer(catchPokemonReducer, initialCatchPokemonState);
    const { pokemon } = useFetchPokemon(state.randomPokemon);

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

    useEffect(() => {
        if(state.randomPokemon && pokemon) {
            const updatedCaughtPokemons = replaceNullItem(state.caughtPokemons, pokemon);
            dispatch({ type: "SET_CAUGHT_POKEMONS", payload: updatedCaughtPokemons });
        };
    }, [pokemon]);

    useEffect(() => {
        if(state.isShaking) {
            dispatch({type: "SET_TOP_TEXT", payload: "Gotcha !"});
            dispatch({type: "SET_BOTTOM_TEXT", payload: `${state.randomPokemon.split('-')[0].toUpperCase()} was caught`});

            const firstTimeout = setTimeout(() => {
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

                        setTimeout(() => {
                            dispatch({type: "SET_REGISTRATION_MODAL_VISIBILITY", payload: false});
                        }, 10000);
                    }, 3000);
                }, 500);
            }, 3000);

            return () => {
                clearTimeout(firstTimeout);
            };
        }
    }, [state.isShaking]);

    return {
        caughtPokemons: state.caughtPokemons,
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