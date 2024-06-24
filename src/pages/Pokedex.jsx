import useFetchPokemons from "../hooks/useFetchPokemons";
import usePagination from "../hooks/usePagination";
import Banner from "../components/Banner/Banner";
import Grid from "../components/Grid/Grid";
import Paginator from "../components/Paginator/Paginator";
import { useEffect } from "react";

function Pokedex() {
    const POKEMONS_PER_PAGE = 20;
    const INITIAL_PAGE_INDEX = 1;
    const { totalPages, currentPage, offset, setCurrentPage, setTotalPages } = usePagination(POKEMONS_PER_PAGE, INITIAL_PAGE_INDEX);
    const { loading, pokemons, error } = useFetchPokemons(POKEMONS_PER_PAGE, offset);
    

    useEffect(() => {
        if(pokemons) {
            const totalPokemons = pokemons.count;
            setTotalPages(totalPokemons);
        };
        
    }, [pokemons])
    
    return (
        <>
            <Banner />
            <Grid cards={pokemons}/>
            <Paginator totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} setTotalPages={setTotalPages}/>
        </>
    );
};

export default Pokedex;