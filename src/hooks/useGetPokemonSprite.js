import { useReducer, useEffect } from "react";
import { pokemonReducer, initialPokemonState } from "../reducers/index";
import { getPokemonSprite } from "../service/pokemon";

function useGetPokemonSprite(pokemon, artwork, type) {
    const [state, dispatch] = useReducer(pokemonReducer, initialPokemonState);
    
    useEffect(() => {
        const fetchPokemonSprite = async () => {
            dispatch({ type: "FETCH_REQUEST", source: type });
            
            try {
                const pokemonSprite = await getPokemonSprite(pokemon, artwork);
                dispatch({ type: "FETCH_SUCCESS", payload: pokemonSprite, source: type });
            } catch (error) {
                dispatch({ type: "FETCH_FAILURE", payload: error, source: type });
            };
        };
        fetchPokemonSprite();
    }, [pokemon, artwork]);

    return {
        loadingSprite: state.loading,
        pokemonCardSprite: state.cardData,
        cardErrorSprite: state.cardError,
        caughtPokemonSprite: state.caughtPokemonData,
        caughtPokemonError: state.caughtPokemonError,
    }
};

export default useGetPokemonSprite;
