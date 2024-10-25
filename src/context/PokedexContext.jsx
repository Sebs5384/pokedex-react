import { useContext, createContext } from "react";
import { usePagination, useSelectedCard, useHandleCard, useHandleSearchbox, useHandleCatchPokemon, useHandleErrorMessage } from "../hooks/index";
import { setItemRange, getPokemonSpriteUrl } from "../utils/index";
import PropTypes from "prop-types";

const PokedexContext = createContext();

export function PokedexProvider({ children }) {
    const MAX_LIMIT = 100000;
    const INITIAL_PAGE_OFFSET = 0;
    const POKEMONS_PER_PAGE = 20;
    const INITIAL_PAGE_INDEX = 1;
    const artwork = "other/official-artwork/";

    const {
        cardData,
        loadingCardData,
        loadingSpeciesData,
        loadingSprite,
        pokemonSprite,
        cardError,
        cardSpeciesError,
        setSelectedCard
    } = useSelectedCard(artwork);
    const {
        currentPage,
        pokemonsInPage,
        totalPages,
        firstPage,
        lastPage,
        noCards,
        loadingPokemons,
        paginatorError,
        popupMessage,
        invalidPagePopup,
        setNextPage,
        setPreviousPage,
        setCurrentPage,
        setSearchboxValue,
        handleKeyDown
    } = usePagination(POKEMONS_PER_PAGE, INITIAL_PAGE_INDEX, getPokemonSpriteUrl);
    const {
        loadingCard,
        modalVisibility,
        handleSelectedCard,
        handleCloseCard
    } = useHandleCard(setSelectedCard, loadingCardData, loadingSpeciesData, cardData, loadingSprite, pokemonSprite, cardError, cardSpeciesError);
    const {
        pokemonList,
        dropdownVisibility,
        filteredPokemons,
        pokemonsCount,
        searchboxError,
        handleSearchPokemon,
        handleInputFocus,
        handleInputOnBlur
    } = useHandleSearchbox(MAX_LIMIT, INITIAL_PAGE_OFFSET, setSelectedCard);
    const {
        caughtPokemons,
        caughtPokemon,
        caughtPokemonError,
        caughtPokemonSprite,
        isShaking,
        caughtModalVisibility,
        registrationModalVisibility,
        topText,
        bottomText,
        textChange,
        handlePokeballClick
    } = useHandleCatchPokemon(pokemonsCount, pokemonList);
    const {
        errorCauseMessage,
        errorMessage,
        cardErrorMessageVisibility,
        caughtPokemonErrorMessageVisibility,
        searchboxErrorMessageVisibility,
        paginatorErrorMessageVisibility,
        handleCloseErrorMessage
    } = useHandleErrorMessage(cardError, caughtPokemonError, searchboxError, paginatorError);

    return (
        <PokedexContext.Provider
            value={
                {
                    cardData, loadingCardData, cardError, cardSpeciesError, setSelectedCard,
                    currentPage, pokemonsInPage, totalPages, firstPage, lastPage, loadingPokemons, paginatorError, popupMessage, invalidPagePopup, 
                    noCards, setNextPage, setPreviousPage, setCurrentPage, setItemRange, setSearchboxValue, handleKeyDown,
                    loadingCard, modalVisibility, pokemonSprite, handleSelectedCard, handleCloseCard,
                    pokemonList, dropdownVisibility, filteredPokemons, pokemonsCount, searchboxError, 
                    handleSearchPokemon, handleInputFocus, handleInputOnBlur,
                    caughtPokemons, caughtPokemon, caughtPokemonError, caughtPokemonSprite, isShaking, 
                    caughtModalVisibility, registrationModalVisibility, topText, bottomText, textChange, handlePokeballClick,
                    errorCauseMessage, errorMessage, cardErrorMessageVisibility, caughtPokemonErrorMessageVisibility, 
                    searchboxErrorMessageVisibility, paginatorErrorMessageVisibility, handleCloseErrorMessage
                }
            }
        >
            {children}
        </PokedexContext.Provider>
    )
};
PokedexProvider.propTypes = {
    children: PropTypes.node
};

export const usePokedexContext = () => useContext(PokedexContext);