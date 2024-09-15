import { useReducer, useEffect } from "react";
import { paginationReducer, initialPaginationState } from "../reducers/index";
import { useFetchPokemons, useTotalPages } from "./index";
import { getPokemonsInPage } from "../utils/index";

function usePagination(ITEMS_PER_PAGE, INITIAL_PAGE_INDEX, getPokemonSpriteUrl) {
    const [state, dispatch] = useReducer(paginationReducer, initialPaginationState);
    const nextOffset = (state.currentPage - INITIAL_PAGE_INDEX) * ITEMS_PER_PAGE;

    const { loading, pokemons, error } = useFetchPokemons(ITEMS_PER_PAGE, nextOffset);
    const { totalPages, firstPage, lastPage } = useTotalPages(ITEMS_PER_PAGE, pokemons);

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
        const fetchPokemonsInPage = async () => {
            if(pokemons) {
                const pokemonsInPage = await getPokemonsInPage(pokemons, getPokemonSpriteUrl);
                console.log(pokemonsInPage);
                dispatch({ type: "SET_POKEMONS_IN_PAGE", payload: pokemonsInPage });
            };  
        };

        dispatch({ type: "SET_NEXT_PAGE_ITEMS", payload: nextOffset });
        fetchPokemonsInPage();
    }, [state.currentPage, ITEMS_PER_PAGE, INITIAL_PAGE_INDEX, nextOffset, pokemons]);

    return {
        currentPage: state.currentPage,
        loadingPokemons: loading,
        pokemonsInPage: state.pokemonsInPage,
        errorWhileLoading: error,
        totalPages,
        firstPage,
        lastPage,
        setNextPage,
        setPreviousPage,
        setCurrentPage,
    };
};

export default usePagination;