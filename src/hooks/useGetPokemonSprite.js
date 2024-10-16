import { useReducer, useEffect } from "react";
import { pokemonReducer, initialPokemonState } from "../reducers/index";
import { getPokemonSprite } from "../service/pokemon";

function useGetPokemonSprite(pokemon, artwork) {
    const [state, dispatch] = useReducer(pokemonReducer, initialPokemonState);
    
    useEffect(() => {
        const fetchPokemonSprite = async () => {
            dispatch({ type: "FETCH_REQUEST" });
            
            try {
                const pokemonSprite = await getPokemonSprite(pokemon, artwork);
                dispatch({ type: "FETCH_SUCCESS", payload: pokemonSprite });
            } catch (error) {
                dispatch({ type: "FETCH_FAILURE", payload: error });
            };
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
