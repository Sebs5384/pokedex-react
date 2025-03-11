import { useReducer, useEffect } from "react";
import { paginationReducer, initialPaginationState } from "../reducers/index";
import { useFetchPokemons, useTotalPages } from "./index";
import { getPokemonsInPage, validateSearchboxPage, getPokemonSprites } from "../utils/index";

function usePagination(ITEMS_PER_PAGE, INITIAL_PAGE_INDEX) {
    const [state, dispatch] = useReducer(paginationReducer, initialPaginationState);
    const nextOffset = (state.currentPage - INITIAL_PAGE_INDEX) * ITEMS_PER_PAGE;

    const { loading, paginatorPokemons, paginatorError } = useFetchPokemons(ITEMS_PER_PAGE, nextOffset, "paginator");
    const { totalPages, firstPage, lastPage } = useTotalPages(ITEMS_PER_PAGE, paginatorPokemons);

    const setCurrentPage = (pageIndex) => {
        const currentPage = pageIndex;
        dispatch({ type: "CLEAR_POKEMONS_IN_PAGE", payload: [] });
        dispatch({ type: "SET_CURRENT_PAGE", payload: currentPage });
    };

    const setNextPage = () => {
        const nextPage = state.currentPage + 1;
        dispatch({ type: "CLEAR_POKEMONS_IN_PAGE", payload: [] });
        dispatch({ type: "SET_CURRENT_PAGE", payload: nextPage });
    };

    const setPreviousPage = () => {
        const previousPage = state.currentPage - 1;
        dispatch({ type: "CLEAR_POKEMONS_IN_PAGE", payload: [] });
        dispatch({ type: "SET_CURRENT_PAGE", payload: previousPage });
    };

    const setSearchboxValue = (event) => {
        const inputValue = event.target.value;
        dispatch({ type: "SET_SEARCHBOX_VALUE", payload: inputValue });
    };

    const setPokemonsInPage = async () => {
        if(paginatorPokemons && paginatorPokemons.results) {
            const pokemonSprites = await getPokemonSprites(paginatorPokemons.results);
            const pokemonsInPage = await getPokemonsInPage(paginatorPokemons, pokemonSprites);

            dispatch({ type: "SET_NO_CARDS_IN_PAGE", payload: false });
            dispatch({ type: "SET_POKEMONS_IN_PAGE", payload: pokemonsInPage });
        };

        setTimeout(() => {
            if(paginatorPokemons && !paginatorPokemons.results.length){
                dispatch({ type: "SET_NO_CARDS_IN_PAGE", payload: true });
            };
        }, 10000);
    };

    const handleKeyDown = (event) => {
        if(event.key === "Enter") {
            dispatch({ type: "CLEAR_POKEMONS_IN_PAGE", payload: [] })
            const pageNumber = parseInt(state.searchboxValue);
            const validPage = validateSearchboxPage(pageNumber, totalPages);

            if(validPage === true) {
                dispatch({ type: "SET_CURRENT_PAGE", payload: pageNumber });
                dispatch({ type: "SET_SEARCHBOX_VALUE", payload: "" });
            } else {
                dispatch({ type: "SET_POPUP_MESSAGE", payload: validPage })
                dispatch({ type: "SET_POPUP_VISIBILITY", payload: true });
                dispatch({ type: "SET_SEARCHBOX_VALUE", payload: "" });

                setTimeout(() => {
                    dispatch({ type: "SET_POPUP_VISIBILITY", payload: false });
                }, 2000);
            };
        };
    };

    useEffect(() => {
        dispatch({ type: "SET_NEXT_PAGE_ITEMS", payload: nextOffset });
    }, [state.currentPage, ITEMS_PER_PAGE, nextOffset]);

    useEffect(() => {
        setPokemonsInPage();
    }, [paginatorPokemons]);

    return {
        loadingPokemons: loading,
        paginatorError: paginatorError,
        currentPage: state.currentPage,
        pokemonsInPage: state.pokemonsInPage,
        popupMessage: state.popupMessage,
        invalidPagePopup: state.invalidPagePopup,
        noCards: state.noCards,
        searchboxValue: state.searchboxValue,
        totalPages,
        firstPage,
        lastPage,
        setNextPage,
        setPreviousPage,
        setCurrentPage,
        setSearchboxValue,
        handleKeyDown,
        setPokemonsInPage,
    };
};

export default usePagination;