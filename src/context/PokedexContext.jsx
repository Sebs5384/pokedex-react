import { useContext, createContext } from "react";
import { usePagination, useSelectedCard, useHandleCard, useHandleSearchbox, useHandleCatchPokemon } from "../hooks/index";
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
        cardError,
        setSelectedCard
    } = useSelectedCard();
    const {
        currentPage,
        pokemonsInPage,
        totalPages,
        firstPage,
        lastPage,
        loadingPokemons,
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
        pokemonSprite,
        handleSelectedCard,
        handleCloseCard
    } = useHandleCard(setSelectedCard, loadingCardData, cardData, artwork);
    const {
        pokemonList,
        searchBoxPokemon,
        dropdownVisibility,
        filteredPokemons,
        pokemonsCount,
        handleSearchPokemon,
        handleInputFocus,
        handleInputOnBlur
    } = useHandleSearchbox(MAX_LIMIT, INITIAL_PAGE_OFFSET, setSelectedCard);
    const {
        caughtPokemons,
        caughtPokemon,
        caughtPokemonSprite,
        isShaking,
        caughtModalVisibility,
        registrationModalVisibility,
        topText,
        bottomText,
        textChange,
        handlePokeballClick
    } = useHandleCatchPokemon(pokemonsCount, pokemonList);

    return (
        <PokedexContext.Provider
            value={
                {
                    cardData, loadingCardData, cardError, setSelectedCard,
                    currentPage, pokemonsInPage, totalPages, firstPage, lastPage, loadingPokemons, popupMessage, invalidPagePopup,
                    setNextPage, setPreviousPage, setCurrentPage, setItemRange, setSearchboxValue, handleKeyDown,
                    loadingCard, modalVisibility, pokemonSprite, handleSelectedCard, handleCloseCard,
                    pokemonList, searchBoxPokemon, dropdownVisibility, filteredPokemons, pokemonsCount, handleSearchPokemon, handleInputFocus, handleInputOnBlur,
                    caughtPokemons, caughtPokemon, caughtPokemonSprite, isShaking, caughtModalVisibility, registrationModalVisibility, topText, bottomText, textChange, handlePokeballClick
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