import { useEffect, useReducer } from "react";
import { pokemonReducer, initialPokemonState } from "../reducers";
import { getPokemonSpecies } from "../service/pokemon";

function useFetchSpecies(species) {
    const [state, dispatch] = useReducer(pokemonReducer, initialPokemonState);

    useEffect(() => {
        const fetchSpeciesData = async () => {
            dispatch({ type: "FETCH_REQUEST" });

            try {
                const speciesId = species.split('-')[0];
                const speciesData = await getPokemonSpecies(speciesId);
                dispatch({ type: "FETCH_SUCCESS", payload: speciesData });
            } catch (error) {
                dispatch({ type: "FETCH_FAILURE", payload: error });
            };
        };

        fetchSpeciesData();
    }, [species]);

    return {
        loading: state.loading,
        species: state.data,
        error: state.error
    };
};

export default useFetchSpecies;