import { usePagination, useSelectedCard, useGetPokemonSprite, useHandleCard, useHandleNavigation } from "../hooks/index";
import { setItemRange } from "../utils/general";
import { getPokemonSpriteUrl } from "../utils/pokemon";
import Navbar from "../components/Navbar/Navbar";
import Grid from "../components/Grid/Grid";
import Paginator from "../components/Paginator/Paginator";
import PokemonCard from "../components/Modal/Card/PokemonCard";

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
        errorSprite, 
        pokemonSprite, 
        loadingSprite 
    } = useGetPokemonSprite(cardData, artwork);
    const {
        loading,
        modalVisibility,
        handleSelectedCard,
        handleCloseCard,
    } = useHandleCard(setSelectedCard, loadingCard, loadingSprite);
    const { pokemonList } = useHandleNavigation(MAX_LIMIT, OFFSET);

    return (
        <>
            <Navbar list={pokemonList}  />
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
        </>
    );
};

export default Pokedex;