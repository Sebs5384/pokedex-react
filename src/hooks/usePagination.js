import { useReducer, useEffect } from "react";
import { paginationReducer, initialPaginationState } from "../reducers/index";

function usePagination(ITEMS_PER_PAGE, INITIAL_PAGE_INDEX) {
    const [state, dispatch] = useReducer(paginationReducer, initialPaginationState);

    const setCurrentPage = (pageIndex) => {
        const currentPage = pageIndex;
        dispatch({ type: "SET_CURRENT_PAGE", payload: currentPage });
    };

    useEffect(() => {
        const nextOffset = (state.currentPage - INITIAL_PAGE_INDEX) * ITEMS_PER_PAGE;
        dispatch({ type: "SET_NEXT_PAGE_ITEMS", payload: nextOffset });
    }, [state.currentPage, ITEMS_PER_PAGE, INITIAL_PAGE_INDEX]);

    return {
        currentPage: state.currentPage,
        nextPageItems: state.nextPageItems,
        setCurrentPage,
    };
};

export default usePagination;