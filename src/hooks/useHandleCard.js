import { useEffect, useReducer } from "react";
import { handleCardReducer, initialHandleCardState } from "../reducers/handleCardReducer";
import { useGetPokemonSprite } from "../hooks/index";

function useHandleCard(setSelectedCard, loadingCard, cardData, artwork) {
    const [state, dispatch] = useReducer(handleCardReducer, initialHandleCardState);
    const { loadingSprite, pokemonSprite } = useGetPokemonSprite(cardData, artwork);

    const handleSelectedCard = (card, id) => {
        setSelectedCard(card, id);
        dispatch({ type: "SET_MODAL_VISIBILITY", payload: true });
    };

    const handleCloseCard = () => {
        setSelectedCard(null);
        dispatch({ type: "SET_MODAL_VISIBILITY", payload: false });
    };

    useEffect(() => {
        const isLoading = loadingCard || loadingSprite;

        dispatch({ type: "SET_DEBOUNCE_LOADING", payload: isLoading });
    }, [loadingCard, loadingSprite]);

    return {
        loading: state.debounceLoading,
        modalVisibility: state.modalVisibility,
        pokemonSprite: pokemonSprite,
        handleSelectedCard,
        handleCloseCard
    }
};

export default useHandleCard;