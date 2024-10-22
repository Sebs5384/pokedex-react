import { useEffect, useReducer } from "react";
import { pokemonReducer, initialPokemonState } from "../reducers/index";
import { getPokemonSpecies } from "../service/pokemon";

function useFetchSpecies(species, type) {
    const [state, dispatch] = useReducer(pokemonReducer, initialPokemonState);

    useEffect(() => {
        const fetchSpeciesData = async () => {
            dispatch({ type: "FETCH_REQUEST", source: type });

            try {
                const speciesName = species.split('-')[0];
                const completeName = species;
                const speciesData = await getPokemonSpecies(speciesName, completeName);
                dispatch({ type: "FETCH_SUCCESS", payload: speciesData, source: type });
            } catch (error) {
                dispatch({ type: "FETCH_FAILURE", payload: error, source: type });
            };
        };

        fetchSpeciesData();
    }, [species, type]);

    return {
        loadingSpecies: state.loading,
        cardSpeciesData: state.cardData,
        cardSpeciesError: state.cardError,
        caughtSpeciesData: state.caughtPokemonData,
        caughtSpeciesError: state.caughtPokemonError
    };
};

export default useFetchSpecies;