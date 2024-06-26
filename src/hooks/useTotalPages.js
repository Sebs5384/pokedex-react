import { useReducer, useEffect } from "react";
import { totalPagesReducer, initialTotalPagesState } from "../reducers/index";

function useTotalPages(ITEMS_PER_PAGE, items) {
    const [state, dispatch] = useReducer(totalPagesReducer, initialTotalPagesState);

    useEffect(() => {
        const setTotalPages = (totalCount) => {
            const totalPages = Array.from({ length: Math.ceil(totalCount / ITEMS_PER_PAGE) }, (_, index) => index + 1);
            dispatch({ type: "SET_TOTAL_PAGES", payload: totalPages });
        };

        if (items) {
            const totalItems = items.count;
            setTotalPages(totalItems);
        };
    }, [items, ITEMS_PER_PAGE]);

    return {
        totalPages: state.totalPages,
    };
};

export default useTotalPages;