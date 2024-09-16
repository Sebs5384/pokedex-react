import { useContext, createContext } from "react";
import { usePagination, useSelectedCard, useHandleCard, useHandleSearchbox, useHandleCatchPokemon } from "../hooks/index";
import { setItemRange, getPokemonSpriteUrl } from "../utils/index";

const PokedexContext = createContext();

export function PokedexProvider({ children }) {
    const MAX_LIMIT = 100000;
    const OFFSET = 0;
    const POKEMONS_PER_PAGE = 20;
    const INITIAL_PAGE_INDEX = 1;
    const artwork = "other/official-artwork/";

    const {
        cardData,
        loadingCard,
        setSelectedCard
    } = useSelectedCard();
    const {
        currentPage,
        pokemonsInPage,
        totalPages,
        firstPage,
        lastPage,
        loadingPokemons,
        setNextPage,
        setPreviousPage,
        setCurrentPage
    } = usePagination(POKEMONS_PER_PAGE, INITIAL_PAGE_INDEX, getPokemonSpriteUrl);
    const {
        loading,
        modalVisibility,
        pokemonSprite,
        handleSelectedCard,
        handleCloseCard
    } = useHandleCard(setSelectedCard, loadingCard, cardData, artwork);
    const {
        pokemonList,
        searchBoxPokemon,
        dropdownVisibility,
        filteredPokemons,
        pokemonsCount,
        handleSearchPokemon,
        handleInputFocus,
        handleInputOnBlur
    } = useHandleSearchbox(MAX_LIMIT, OFFSET, setSelectedCard);
    const {
        caughtPokemons,
        caughtPokemon,
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
                    cardData, loadingCard, setSelectedCard,
                    currentPage, pokemonsInPage, totalPages, firstPage, lastPage, loadingPokemons, setNextPage, setPreviousPage, setCurrentPage, setItemRange,
                    loading, modalVisibility, pokemonSprite, handleSelectedCard, handleCloseCard,
                    pokemonList, searchBoxPokemon, dropdownVisibility, filteredPokemons, pokemonsCount, handleSearchPokemon, handleInputFocus, handleInputOnBlur,
                    caughtPokemons, caughtPokemon, isShaking, caughtModalVisibility, registrationModalVisibility, topText, bottomText, textChange, handlePokeballClick
                }
            }
        >
            {children}
        </PokedexContext.Provider>
    )
};

export const usePokedexContext = () => useContext(PokedexContext);