import { useReducer, useEffect } from "react";
import { paginationReducer, initialPaginationState } from "../reducers/index";
import { useFetchPokemons, useTotalPages } from "../hooks/index";

function usePagination(ITEMS_PER_PAGE, INITIAL_PAGE_INDEX) {
    const [state, dispatch] = useReducer(paginationReducer, initialPaginationState);
    const nextOffset = (state.currentPage - INITIAL_PAGE_INDEX) * ITEMS_PER_PAGE;
    const { loading, pokemons, error } = useFetchPokemons(ITEMS_PER_PAGE, nextOffset);
    const { totalPages, firstPage, lastPage, renderPages } = useTotalPages(ITEMS_PER_PAGE, pokemons);

    const setCurrentPage = (pageIndex) => {
        const currentPage = pageIndex;
        dispatch({ type: "SET_CURRENT_PAGE", payload: currentPage });
    };

    const setNextPage = () => {
        const nextPage = state.currentPage + 1;
        dispatch({ type: "SET_CURRENT_PAGE", payload: nextPage });
    };

    const setPreviousPage = () => {
        const previousPage = state.currentPage - 1;
        dispatch({ type: "SET_CURRENT_PAGE", payload: previousPage });
    };

    useEffect(() => {
        dispatch({ type: "SET_NEXT_PAGE_ITEMS", payload: nextOffset });
    }, [state.currentPage, ITEMS_PER_PAGE, INITIAL_PAGE_INDEX, nextOffset]);

    return {
        currentPage: state.currentPage,
        loadingPokemons: loading,
        pokemonsInPage: pokemons,
        errorWhileLoading: error,
        totalPages,
        firstPage,
        lastPage,
        renderPages,
        setNextPage,
        setPreviousPage,
        setCurrentPage,
    };
};

export default usePagination;