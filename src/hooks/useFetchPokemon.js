import { useReducer, useEffect } from "react";
import { pokemonReducer, initialPokemonState } from "../reducers/index";
import { getPokemon } from "../service/pokemon";

function useFetchPokemon(name, type) {
    const [state, dispatch] = useReducer(pokemonReducer, initialPokemonState);

    useEffect(() => {
        const fetchPokemonData = async () => {
            dispatch({ type: "FETCH_REQUEST", source: type });
        
            try {
                const pokemonData = await getPokemon(name);
                dispatch({ type: "FETCH_SUCCESS", payload: pokemonData, source: type });
            } catch (error) {
                dispatch({ type: "FETCH_FAILURE", payload: error, source: type });
            };
        };

        fetchPokemonData();
    }, [name,type]);

    return {
        loading: state.loading,
        pokemonCardData: state.cardData,
        pokemonCardError: state.cardError,
        caughtPokemonData: state.caughtPokemonData,
        caughtPokemonError: state.caughtPokemonError,
    };
};

export default useFetchPokemon;
