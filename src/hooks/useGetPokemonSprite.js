import { useReducer, useEffect } from "react";
import { pokemonReducer, initialPokemonState } from "../reducers";
import { getPokemonSprite } from "../api/pokemon";

function useGetPokemonSprite(pokemon, artwork) {
    const [state, dispatch] = useReducer(pokemonReducer, initialPokemonState);
    
    useEffect(() => {
        const fetchPokemonSprite = async () => {
            dispatch({ type: "FETCH_REQUEST" });
            try {
                const pokemonSprite = await getPokemonSprite(pokemon.id, artwork);
                dispatch({ type: "FETCH_SUCCESS", payload: pokemonSprite });
            } catch (error) {
                dispatch({ type: "FETCH_FAILURE", payload: error });
            }
        };
        fetchPokemonSprite();
    }, [pokemon, artwork]);

    return {
        loadingSprite: state.loading,
        pokemonSprite: state.data,
        errorSprite: state.error
    }
};

export default useGetPokemonSprite;
