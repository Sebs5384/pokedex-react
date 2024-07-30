import { usePagination, useSelectedCard, useGetPokemonSprite, useHandleCard } from "../hooks/index";
import { setItemRange } from "../utils/general";
import { getPokemonSpriteUrl } from "../utils/pokemon";
import Banner from "../components/Banner/Banner";
import Grid from "../components/Grid/Grid";
import Paginator from "../components/Paginator/Paginator";
import PokemonCard from "../components/Modal/Card/PokemonCard";

function Pokedex() {
    const POKEMONS_PER_PAGE = 20;
    const INITIAL_PAGE_INDEX = 1;
    const artwork = "other/official-artwork/";

    const { 
        cardData,
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
        modalVisibility,
        handleSelectedCard,
        handleCloseCard,
    } = useHandleCard(setSelectedCard);

    return (
        <>
            <Banner />
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
                show={modalVisibility} 
                handleClose={handleCloseCard} 
                selectedCard={cardData} 
                pokemonSprite={pokemonSprite}
            />
        </>
    );
};

export default Pokedex;