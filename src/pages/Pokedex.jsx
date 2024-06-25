import { useFetchPokemons, usePagination, useTotalPages } from "../hooks/index";
import Banner from "../components/Banner/Banner";
import Grid from "../components/Grid/Grid";
import Paginator from "../components/Paginator/Paginator";

function Pokedex(pokemonsPerPage, initialPageIndex) {
    const { currentPage, nextPageItems, setCurrentPage } = usePagination(pokemonsPerPage, initialPageIndex);
    const { loading, pokemons, error } = useFetchPokemons(pokemonsPerPage, nextPageItems);
    const { totalPages } = useTotalPages(pokemonsPerPage, pokemons);
    
    return (
        <>
            <Banner />
            <Grid cards={pokemons}/>
            <Paginator totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
        </>
    );
};

export default Pokedex;