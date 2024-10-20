import { useEffect, useReducer } from "react";
import { selectedCardReducer, initialSelectedCardState } from "../reducers/index";
import { useFetchPokemon, useFetchSpecies, useGetPokemonSprite } from "./index";
import { parsePokemonData } from "../utils/pokemon";

function useSelectedCard(artwork) {
    const [state, dispatch] = useReducer(selectedCardReducer, initialSelectedCardState);
    const { loading, pokemon, error } = useFetchPokemon(state.name);
    const { loadingSpecies, species, speciesError } = useFetchSpecies(state.name);
    const { loadingSprite, pokemonSprite } = useGetPokemonSprite(state.data, artwork);

    const setSelectedCard = (name) => {
        dispatch({ type: "RESET_CARD_DATA" });
        dispatch({ type: "SET_SELECTED_CARD_NAME", payload: name });
    };

    useEffect(() => {
        if(pokemon && species) {
            const parsedPokemonName = parsePokemonData(pokemon, species)
            dispatch({ type: "SET_CARD_DATA", payload: parsedPokemonName }); 
        };
    }, [pokemon, species]);

    return {
        cardData: state.data,
        loadingCardData: loading,
        loadingSpeciesData: loadingSpecies,
        pokemonSprite: pokemonSprite,
        loadingSprite: loadingSprite,
        cardError: error,
        cardSpeciesError: speciesError,
        setSelectedCard
    };
};

export default useSelectedCard;