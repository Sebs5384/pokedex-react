import { useReducer, useEffect } from "react";
import { paginationReducer, initialPaginationState } from "../reducers/index";
import { useFetchPokemons, useTotalPages } from "./index";
import { getPokemonsInPage, validateSearchboxPage, getSpriteUrl, loadSpriteUrl } from "../utils/index";

function usePagination(ITEMS_PER_PAGE, INITIAL_PAGE_INDEX) {
    const [state, dispatch] = useReducer(paginationReducer, initialPaginationState);
    const nextOffset = (state.currentPage - INITIAL_PAGE_INDEX) * ITEMS_PER_PAGE;

    const { loading, paginatorPokemons, paginatorError } = useFetchPokemons(ITEMS_PER_PAGE, nextOffset, "paginator");
    const { totalPages, firstPage, lastPage } = useTotalPages(ITEMS_PER_PAGE, paginatorPokemons);

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

    const setSearchboxValue = (event) => {
        const inputValue = event.target.value;
        dispatch({ type: "SET_SEARCHBOX_VALUE", payload: inputValue });
    };

    const handleKeyDown = (event) => {
        if(event.key === "Enter") {
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
        const setPokemonsInPage = async () => {
            if(paginatorPokemons && paginatorPokemons.results) {
                const sprites = await Promise.all(paginatorPokemons.results.map(async (pokemon) => { 
                    const id = pokemon.url.split('/')[6];
                    const sprite =  await loadSpriteUrl(getSpriteUrl(id))
                
                    return sprite
                }));
                const pokemonsInPage = await getPokemonsInPage(paginatorPokemons, sprites);
                
                dispatch({ type: "SET_POKEMONS_IN_PAGE", payload: pokemonsInPage });
            } else {
                setTimeout(() => {
                    dispatch({ type: "SET_NO_CARDS_IN_PAGE", payload: true });
                }, 10000);
            };
        };

        dispatch({ type: "SET_NEXT_PAGE_ITEMS", payload: nextOffset });
        setPokemonsInPage();
    }, [state.currentPage, ITEMS_PER_PAGE, nextOffset, paginatorPokemons]);

    return {
        loadingPokemons: loading,
        paginatorError: paginatorError,
        currentPage: state.currentPage,
        pokemonsInPage: state.pokemonsInPage,
        popupMessage: state.popupMessage,
        invalidPagePopup: state.invalidPagePopup,
        noCards: state.noCards,
        totalPages,
        firstPage,
        lastPage,
        setNextPage,
        setPreviousPage,
        setCurrentPage,
        setSearchboxValue,
        handleKeyDown,
    };
};

export default usePagination;