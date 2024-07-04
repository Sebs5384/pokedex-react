import { usePagination, useSelectedCard } from "../hooks/index";
import { setItemRange, getPokemonSpriteUrl } from "../utils/general";
import { useState } from "react";
import Banner from "../components/Banner/Banner";
import Grid from "../components/Grid/Grid";
import Paginator from "../components/Paginator/Paginator";
import PokemonCard from "../components/Modal/PokemonCard";

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

    const [showModal, setShowModal] = useState(false);

    const handleCardClick = (pokemonId) => {
        console.log("Card clicked: ", pokemonId);
        setSelectedCard(pokemonId);
        setShowModal(true);
    };

    const handleClose = () => setShowModal(false);

    return (
        <>
            <Banner />
            <Grid 
                cards={pokemonsInPage}
                selectedCard={selectedPokemon}
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
            <PokemonCard show={showModal} handleClose={handleClose} selectedCard={selectedPokemon} />
        </>
    );
};

export default Pokedex;