import { useReducer } from "react";
import { handleCardReducer, initialHandleCardState } from "../reducers/handleCardReducer";

function useHandleCard(setSelectedCard) {
    const [state, dispatch] = useReducer(handleCardReducer, initialHandleCardState);

    const handleSelectedCard = (card) => {
        setSelectedCard(card);
        dispatch({ type: "SET_MODAL_VISIBILITY", payload: true });
    };

    const handleCloseCard = () => {
        setSelectedCard(null);
        dispatch({ type: "SET_MODAL_VISIBILITY", payload: false });
    };

    return {
        modalVisibility: state.modalVisibility,
        handleSelectedCard,
        handleCloseCard
    }
};

export default useHandleCard;