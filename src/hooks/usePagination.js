import { useReducer, useEffect } from "react";
import { paginationReducer, initialPaginationState } from "../reducers/index";

function usePagination(ITEMS_PER_PAGE, INITIAL_PAGE_INDEX, ) {
    const [state, dispatch] = useReducer(paginationReducer, initialPaginationState);
    const setTotalPages = (totalCount) => {
        const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
        dispatch({ type: "SET_TOTAL_PAGES", payload: totalPages });
    };

    const setCurrentPage = (pageIndex) => {
        const currentPage = pageIndex + 1;
        dispatch({ type: "SET_CURRENT_PAGE", payload: currentPage });
    };
    
    const offset = (state.currentPage - 1) * ITEMS_PER_PAGE;

    return {
        currentPage: state.currentPage,
        totalPages: state.totalPages,
        offset,
        setCurrentPage,
        setTotalPages
    };
};

export default usePagination;