import { useEffect, useReducer } from "react";
import { selectedCardReducer, initialSelectedCardState } from "../reducers/index";
import { useFetchPokemon, useFetchSpecies } from "./index";
import { parsePokemonData } from "../utils/pokemon";

function useSelectedCard() {
    const [state, dispatch] = useReducer(selectedCardReducer, initialSelectedCardState);
    const { loading, pokemon } = useFetchPokemon(state.name);
    const { species } = useFetchSpecies(state.id);

    const setSelectedCard = (name, id) => {
        dispatch({ type: "RESET_CARD_DATA" });
        dispatch({ type: "SET_SELECTED_CARD_NAME", payload: name });
        dispatch({ type: "SET_SELECTED_CARD_ID", payload: id });
    };

    useEffect(() => {
        if(pokemon && species) {
            const parsedPokemonName = parsePokemonData(pokemon, species)
            dispatch({ type: "SET_CARD_DATA", payload: parsedPokemonName }); 
        };
    }, [pokemon, species]);

    return {
        cardData: state.data,
        loadingCard: loading,
        setSelectedCard
    };
};

export default useSelectedCard;