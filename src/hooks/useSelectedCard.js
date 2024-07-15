import { useEffect, useReducer } from "react";
import { selectedCardReducer, initialSelectedCardState } from "../reducers/index";
import { useFetchPokemon, useFetchSpecies } from "./index";

function useSelectedCard() {
    const [state, dispatch] = useReducer(selectedCardReducer, initialSelectedCardState);
    const { pokemon } = useFetchPokemon(state.name);
    const { species } = useFetchSpecies(state.name);

    const setSelectedCard = (name) => {
        dispatch({ type: "SET_SELECTED_CARD", payload: name });
    };

    useEffect(() => {
        if(pokemon && species) {
            try {
                dispatch({ type: "SET_CARD_DATA", payload: { pokemon, species } });
            } catch(error) {
                console.error(error);
            };
        };
    }, [pokemon, species]);

    return {
        pokemonData: state.data,
        setSelectedCard
    };
};

export default useSelectedCard;