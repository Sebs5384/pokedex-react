import { usePagination, useSelectedCard, useGetPokemonSprite } from "../hooks/index";
import { setItemRange } from "../utils/general";
import { getPokemonSpriteUrl } from "../utils/pokemon";
import { useState, useEffect } from "react";
import Banner from "../components/Banner/Banner";
import Grid from "../components/Grid/Grid";
import Paginator from "../components/Paginator/Paginator";
import PokemonCard from "../components/Modal/PokemonCard";

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

    const [showModal, setShowModal] = useState(false);
    const handleCardClick = (pokemonName) => {
        console.log("Card clicked: ", pokemonName);
        setSelectedCard(pokemonName);
        setShowModal(true);
    };
    const closeModal = () => {  
        setSelectedCard(null);
        setShowModal(false);
    }

    return (
        <>
            <Banner />
            <Grid 
                cards={pokemonsInPage}
                pokemonSprite={getPokemonSpriteUrl}
                selectCard={handleCardClick}
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
                show={showModal} 
                handleClose={closeModal} 
                selectedCard={cardData} 
                pokemonSprite={pokemonSprite}
            />
        </>
    );
};

export default Pokedex;