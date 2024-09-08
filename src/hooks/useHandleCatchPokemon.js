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

    return {
        caughtPokemons: state.caughtPokemons,
        isShaking: state.isShaking,
        handlePokeballClick
    };
};

export default useHandleCatchPokemon;