import { useEffect, useReducer } from "react";
import { handleCardReducer, initialHandleCardState } from "../reducers/index";
import { useGetPokemonSprite } from "../hooks/index";

function useHandleCard(setSelectedCard, loadingCardData, cardData, cardError, artwork) {
    const [state, dispatch] = useReducer(handleCardReducer, initialHandleCardState);
    const { loadingSprite, pokemonSprite } = useGetPokemonSprite(cardData, artwork);

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

        if(!loadingCardData && loadingSprite) {
            dispatch({ type: "SET_IS_LOADING", payload: false });
            dispatch({ type: "SET_CARD_MODAL_VISIBILITY", payload: true });
        };

        if(loadingCardData) {
            dispatch({ type: "SET_IS_LOADING", payload: isLoading }); 
        };
    }, [loadingCardData, loadingSprite]);

    return {
        loadingCard: state.isLoading,
        modalVisibility: state.cardModalVisibility,
        pokemonSprite: pokemonSprite,
        handleSelectedCard,
        handleCloseCard
    }
};

export default useHandleCard;