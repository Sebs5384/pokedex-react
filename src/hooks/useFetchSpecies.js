import { useEffect, useReducer } from "react";
import { pokemonReducer, initialPokemonState } from "../reducers";
import { getPokemonSpecies } from "../api/pokemon";

function useFetchSpecies(name) {
    const [state, dispatch] = useReducer(pokemonReducer, initialPokemonState);

    useEffect(() => {
        const fetchSpeciesData = async () => {
            dispatch({ type: "FETCH_REQUEST" });

            try {
                const speciesData = await getPokemonSpecies(name);
                dispatch({ type: "FETCH_SUCCESS", payload: speciesData });
            } catch (error) {
                dispatch({ type: "FETCH_FAILURE", payload: error });
            };
        };

        fetchSpeciesData();
    }, [name]);

    return {
        loading: state.loading,
        species: state.data,
        error: state.error
    };
};

export default useFetchSpecies;