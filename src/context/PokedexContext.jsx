import { useContext, createContext } from "react";
import { usePagination, useSelectedCard, useHandleCard, useHandleSearchbox, useHandleCatchPokemon, useHandleErrorMessage } from "../hooks/index";
import { setItemRange } from "../utils/index";
import PropTypes from "prop-types";

export const PokedexContext = createContext();

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
        emptyCardData,
        setSelectedCard
    } = useSelectedCard(artwork);
    const {
        currentPage,
        pokemonsInPage,
        totalPages,
        firstPage,
        lastPage,
        cardBackground,
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
    } = usePagination(POKEMONS_PER_PAGE, INITIAL_PAGE_INDEX);
    const {
        loadingCard,
        loadingCardText,
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

    const contextValue = {
        card: {
            cardData,
            loadingCardData,
            loadingSpeciesData,
            loadingSprite,
            pokemonSprite,
            cardError,
            cardSpeciesError,
            emptyCardData,
            setSelectedCard,
            loadingCard,
            loadingCardText,
            modalVisibility,
            handleSelectedCard,
            handleCloseCard
        },
        pagination: {
            currentPage,
            pokemonsInPage,
            totalPages,
            firstPage,
            lastPage,
            cardBackground,
            noCards,
            loadingPokemons,
            paginatorError,
            popupMessage,
            invalidPagePopup,
            setNextPage,
            setPreviousPage,
            setCurrentPage,
            setSearchboxValue,
            handleKeyDown,
            setItemRange,
        },
        searchbox: {
            pokemonList,
            dropdownVisibility,
            filteredPokemons,
            pokemonsCount,
            searchboxError,
            handleSearchPokemon,
            handleInputFocus,
            handleInputOnBlur
        },
        catchPokemon: {
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
        },
        error: {
            errorCauseMessage,
            errorMessage,
            cardErrorMessageVisibility,
            caughtPokemonErrorMessageVisibility,
            searchboxErrorMessageVisibility,
            paginatorErrorMessageVisibility,
            handleCloseErrorMessage
        },
    };

    return (
        <PokedexContext.Provider value={contextValue} >
            {children}
        </PokedexContext.Provider>
    )
};
PokedexProvider.propTypes = {
    children: PropTypes.node
};

export const usePokedexContext = () => useContext(PokedexContext);