import { useEffect, useReducer, useState } from "react";
import { selectedCardReducer, initialSelectedCardState } from "../reducers/index";
import { useFetchPokemon, useFetchSpecies, useGetPokemonSprite } from "./index";
import { parsePokemonData } from "../utils/pokemon";

function useSelectedCard(artwork) {
    const [state, dispatch] = useReducer(selectedCardReducer, initialSelectedCardState);
    const { loading, pokemonCardData, pokemonCardError } = useFetchPokemon(state.selectedCardName, "card");
    const { loadingSpecies, cardSpeciesData, cardSpeciesError } = useFetchSpecies(state.selectedCardName, "card");
    const { loadingSprite, pokemonCardSprite } = useGetPokemonSprite(state.selectedCardData, artwork, "card");

    const setSelectedCard = (name) => {
        dispatch({ type: "RESET_SELECTED_CARD_DATA" });
        dispatch({ type: "SET_SELECTED_CARD_NAME", payload: name });
    };

    useEffect(() => {
        if(pokemonCardData && cardSpeciesData) {
            const parsedPokemonName = parsePokemonData(pokemonCardData, cardSpeciesData)
            dispatch({ type: "SET_SELECTED_CARD_DATA", payload: parsedPokemonName }); 
        };
    }, [pokemonCardData, cardSpeciesData]);

    return {
        cardData: state.selectedCardData,
        loadingCardData: loading,
        loadingSpeciesData: loadingSpecies,
        pokemonSprite: pokemonCardSprite,
        loadingSprite: loadingSprite,
        cardError: pokemonCardError,
        cardSpeciesError: cardSpeciesError,
        setSelectedCard
    };
};

export default useSelectedCard;