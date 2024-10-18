import { useEffect, useReducer } from "react";
import { handleCardReducer, initialHandleCardState } from "../reducers/index";

function useHandleCard(setSelectedCard, loadingCardData, cardData, loadingSprite, cardSprite, cardError) {
    const [state, dispatch] = useReducer(handleCardReducer, initialHandleCardState);

    const handleSelectedCard = (card) => {
        setSelectedCard(card);
    };

    const handleCloseCard = () => {
        setSelectedCard(null);
        dispatch({ type: "SET_CARD_MODAL_VISIBILITY", payload: false });
    };

    useEffect(() => {
        if(cardError) {
            dispatch({ type: "SET_IS_LOADING", payload: false });
        };

        const isLoading = loadingCardData || loadingSprite;

        if(!loadingCardData && !loadingSprite && cardData && cardSprite) {
            dispatch({ type: "SET_IS_LOADING", payload: false });
            dispatch({ type: "SET_CARD_MODAL_VISIBILITY", payload: true });
        };

        if(loadingCardData) {
            dispatch({ type: "SET_IS_LOADING", payload: isLoading }); 
        };
    }, [loadingCardData, loadingSprite, cardSprite, cardData]);

    return {
        loadingCard: state.isLoading,
        modalVisibility: state.cardModalVisibility,
        handleSelectedCard,
        handleCloseCard
    }
};

export default useHandleCard;