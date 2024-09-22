import { useReducer, useEffect } from "react";
import { pokemonReducer, initialPokemonState } from "../reducers/pokemonReducer";
import { getPokemon } from "../service/pokemon";

function useFetchPokemon(name) {
    const [state, dispatch] = useReducer(pokemonReducer, initialPokemonState);

    useEffect(() => {
        const fetchPokemonData = async () => {
            dispatch({ type: "FETCH_REQUEST" });
        
            try {
                const pokemonData = await getPokemon(name);
                dispatch({ type: "FETCH_SUCCESS", payload: pokemonData });
            } catch (error) {
                dispatch({ type: "FETCH_FAILURE", payload: error });
            };
        };

        fetchPokemonData();
    }, [name]);

    return {
        loading: state.loading,
        pokemon: state.data,
        error: state.error
    };
};

export default useFetchPokemon;
