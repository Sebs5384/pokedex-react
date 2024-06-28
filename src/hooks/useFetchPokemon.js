import { useReducer, useEffect } from "react";
import { pokemonReducer, initialPokemonState } from "../reducers/pokemonReducer";
import { getPokemon } from "../api/pokemon";

function useFetchPokemon(id) {
    const [state, dispatch] = useReducer(pokemonReducer, initialPokemonState);

    useEffect(() => {
        const fetchPokemonData = async () => {
            dispatch({ type: "FETCH_REQUEST" });
        
            try {
                const pokemonData = await getPokemon(id);
                dispatch({ type: "FETCH_SUCCESS", payload: pokemonData });
            } catch (error) {
                dispatch({ type: "FETCH_FAILURE", payload: error });
            };
        };

        fetchPokemonData();
    }, [id]);

    return {
        loading: state.loading,
        pokemon: state.data,
        error: state.error
    };
};

export default useFetchPokemon;
