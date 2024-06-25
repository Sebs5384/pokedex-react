import { useReducer, useEffect } from "react";
import { paginationReducer, initialPaginationState } from "../reducers/index";

function usePagination(ITEMS_PER_PAGE, INITIAL_PAGE_INDEX) {
    const [state, dispatch] = useReducer(paginationReducer, initialPaginationState);

    const setCurrentPage = (pageIndex) => {
        const currentPage = pageIndex;
        dispatch({ type: "SET_CURRENT_PAGE", payload: currentPage });
    };

    const nextOffset = (state.currentPage - 1) * ITEMS_PER_PAGE;

    return {
        currentPage: state.currentPage,
        nextPageItems: nextOffset,
        setCurrentPage,
    };
};

export default usePagination;