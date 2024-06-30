import { useEffect, useReducer } from "react";
import { selectedCardReducer, initialSelectedCardState } from "../reducers/index";
import { useFetchPokemon } from "./useFetchPokemon";

function useSelectedCard() {
    const { state, dispatch } = useReducer(selectedCardReducer, initialSelectedCardState);
    const { pokemon } = useFetchPokemon(state.id);
    
    const setSelectedCard = (id) => {
        dispatch({ type: "SET_SELECTED_CARD", payload: id });
    };

    return {
        selectedPokemon: pokemon,
        setSelectedCard
    };
};