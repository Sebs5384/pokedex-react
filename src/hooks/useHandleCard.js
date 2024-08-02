import { useEffect, useReducer } from "react";
import { handleCardReducer, initialHandleCardState } from "../reducers/handleCardReducer";

function useHandleCard(setSelectedCard, loadingCard, loadingSprite) {
    const [state, dispatch] = useReducer(handleCardReducer, initialHandleCardState);

    const handleSelectedCard = (card) => {
        setSelectedCard(card);
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
        handleSelectedCard,
        handleCloseCard
    }
};

export default useHandleCard;