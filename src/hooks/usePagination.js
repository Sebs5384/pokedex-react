import { useReducer, useEffect } from "react";
import { paginationReducer, initialPaginationState } from "../reducers/index";
import useFetchPokemons from "./useFetchPokemons";

function usePagination() {
    const initialPageIndex = initialPaginationState.INITIAL_PAGE_INDEX;
    const POKEMONS_PER_PAGE = initialPaginationState.ITEMS_PER_PAGE;

    const [state, dispatch] = useReducer(paginationReducer, initialPaginationState);
    const currentPage = state.currentPage;
    const offset = ( currentPage - initialPageIndex) * POKEMONS_PER_PAGE;
    const { loading, pokemons, error } = useFetchPokemons(POKEMONS_PER_PAGE, offset);

    return {
        loading,
        pokemons,
        error,
    };

};

export default usePagination;