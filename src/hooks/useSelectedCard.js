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
        if(pokemonCardData && cardSpeciesData && pokemonCardData.id && cardSpeciesData.id) {
            const parsedPokemonName = parsePokemonData(pokemonCardData, cardSpeciesData)
            dispatch({ type: "SET_SELECTED_CARD_DATA", payload: parsedPokemonName });
             
        } else if(!loading && pokemonCardData && !pokemonCardData.id) {
            dispatch({ type: "SET_SELECTED_CARD_DATA", payload: null });
            dispatch({ type: "EMPTY_SELECTED_CARD_DATA", payload: { 
                emptyErrorCause: "Error empty response from the server",
                emptyErrorMessage: "Seems like there is no card data to display try again later"
            }});
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
        emptyCardData: state.emptySelectedCardData,
        cardName: state.selectedCardName,
        setSelectedCard
    };
};

export default useSelectedCard;