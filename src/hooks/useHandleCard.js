import { useEffect, useReducer } from "react";
import { handleCardReducer, initialHandleCardState } from "../reducers/handleCardReducer";
import { useGetPokemonSprite } from "../hooks/index";

function useHandleCard(setSelectedCard, loadingCardData, cardData, artwork) {
    const [state, dispatch] = useReducer(handleCardReducer, initialHandleCardState);
    const { loadingSprite, pokemonSprite } = useGetPokemonSprite(cardData, artwork);

    const handleSelectedCard = (card) => {
        setSelectedCard(card);
        dispatch({ type: "SET_MODAL_VISIBILITY", payload: true });
    };

    const handleCloseCard = () => {
        setSelectedCard(null);
        dispatch({ type: "SET_MODAL_VISIBILITY", payload: false });
    };

    useEffect(() => {
        const isLoading = loadingCardData || loadingSprite;

        dispatch({ type: "SET_DEBOUNCE_LOADING", payload: isLoading });
    }, [loadingCardData, loadingSprite]);

    return {
        loadingCard: state.debounceLoading,
        modalVisibility: state.modalVisibility,
        pokemonSprite: pokemonSprite,
        handleSelectedCard,
        handleCloseCard
    }
};

export default useHandleCard;