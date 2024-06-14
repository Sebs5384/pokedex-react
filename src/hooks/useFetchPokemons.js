import { useReducer, useEffect } from "react";
import { pokemonReducer, intialState } from "../reducers/pokemonReducer";
import getPokemons from "../api/pokemon";

function useFetchPokemons(limit, offset) {
    const [state, dispatch] = useReducer(pokemonReducer, intialState);

    useEffect(() => {
        const fetchPokemonsData = async () => {
            dispatch({ type: "FETCH_REQUEST" });
        
            try {
                const pokemonsData = await getPokemons(limit, offset);
                dispatch({ type: "FETCH_SUCCESS", payload: pokemonsData });
            } catch (error) {
                dispatch({ type: "FETCH_FAILURE", payload: error });
            };
        };

        fetchPokemonsData();
    }, [offset, limit]);

    return {
        loading: state.loading,
        pokemons: state.data,
        error: state.error
    };
};

export default useFetchPokemons;