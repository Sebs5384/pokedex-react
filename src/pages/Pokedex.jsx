import { usePagination, useSelectedCard } from "../hooks/index";
import { setItemRange, getPokemonSpriteUrl } from "../utils/general";
import Banner from "../components/Banner/Banner";
import Grid from "../components/Grid/Grid";
import Paginator from "../components/Paginator/Paginator";

function Pokedex() {
    const POKEMONS_PER_PAGE = 20;
    const INITIAL_PAGE_INDEX = 1;

    const { selectedPokemon, setSelectedCard } = useSelectedCard();
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

    return (
        <>
            <Banner />
            <Grid 
                cards={pokemonsInPage}
                pokemonSprite={getPokemonSpriteUrl}
                selectCard={setSelectedCard}
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
        </>
    );
};

export default Pokedex;