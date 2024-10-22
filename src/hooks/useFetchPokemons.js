import { useReducer, useEffect } from "react";
import { pokemonReducer, initialPokemonState } from "../reducers/index";
import { getPokemons } from "../service/pokemon";

function useFetchPokemons(limit, offset, type) {
    const [state, dispatch] = useReducer(pokemonReducer, initialPokemonState);

    useEffect(() => {
        const fetchPokemonsData = async () => {
            dispatch({ type: "FETCH_REQUEST", source: type });
        
            try {
                const pokemonsData = await getPokemons(limit, offset);
                dispatch({ type: "FETCH_SUCCESS", payload: pokemonsData, source: type });
            } catch (error) {
                dispatch({ type: "FETCH_FAILURE", payload: error, source: type });
            };
        };

        fetchPokemonsData();
    }, [offset, limit]);

    return {
        loading: state.loading,
        paginatorPokemons: state.paginatorData,
        paginatorError: state.paginatorError,
        searchboxPokemons: state.searchboxData,
        searchboxError: state.searchboxError,
    };
};

export default useFetchPokemons;