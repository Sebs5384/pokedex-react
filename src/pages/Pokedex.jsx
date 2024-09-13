import { usePagination, useSelectedCard, useHandleCard, useHandleSearchbox, useHandleCatchPokemon } from "../hooks/index";
import { setItemRange, getPokemonSpriteUrl } from "../utils/index";
import Navbar from "../components/Navbar/Navbar";
import Grid from "../components/Grid/Grid";
import Paginator from "../components/Paginator/Paginator";
import PokemonCard from "../components/Modal/Card/PokemonCard";
import CaughtPokemonAlert from "../components/Modal/CatchPokemon/CaughtPokemonAlert";
import CaughtPokemonRegistration from "../components/Modal/CatchPokemon/CaughtPokemonRegistration";

function Pokedex() {
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
        loadingPokemons, 
        pokemonsInPage, 
        errorWhileLoading, 
        totalPages, 
        firstPage, 
        lastPage, 
        renderPages,
        setNextPage, 
        setPreviousPage, 
        setCurrentPage 
    } = usePagination(POKEMONS_PER_PAGE, INITIAL_PAGE_INDEX);
    const {
        loading,
        modalVisibility,
        pokemonSprite,
        handleSelectedCard,
        handleCloseCard,
    } = useHandleCard(setSelectedCard, loadingCard, cardData, artwork);
    const { 
        pokemonList,
        searchBoxPokemon,
        dropdownVisibility,
        filteredPokemons,
        pokemonsCount,
        handleSearchPokemon,
        handleInputFocus,
        handleInputOnBlur,
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
        <>
            <Navbar 
                list={pokemonList}
                searchItem={searchBoxPokemon}
                listVisibility={dropdownVisibility}
                handleSearchbox={handleSearchPokemon}
                handleInput={handleInputFocus}
                handleInputOnBlur={handleInputOnBlur}
                selectPokemon={handleSelectedCard}
                filteredPokemons={filteredPokemons}
                handlePokeballClick={handlePokeballClick}
                isShaking={isShaking}
                caughtPokemons={caughtPokemons}
            />
            <Grid 
                cards={pokemonsInPage}
                pokemonSprite={getPokemonSpriteUrl}
                selectCard={handleSelectedCard}
            />
            <Paginator 
                totalPages={totalPages} 
                currentPage={currentPage}
                firstPage={firstPage}
                lastPage={lastPage} 
                nextPage={setNextPage} 
                previousPage={setPreviousPage} 
                setCurrentPage={setCurrentPage}
                setPaginatorPages={renderPages}
                setHiddenRange={setItemRange}
            />
            <PokemonCard 
                visibility={modalVisibility} 
                handleClose={handleCloseCard} 
                selectedCard={cardData} 
                pokemonSprite={pokemonSprite}
                loadingCard={loading}
                selectPreviousEvolution={handleSelectedCard}
            />
            <CaughtPokemonAlert 
                showModal={caughtModalVisibility}
                textChange={textChange} 
                topText={topText} 
                bottomText={bottomText} 
            />
            <CaughtPokemonRegistration 
                showModal={registrationModalVisibility}
                caughtPokemon={caughtPokemon}
            />
        </>
    );
};

export default Pokedex;