import { useFetchPokemons, usePagination, useTotalPages } from "../hooks/index";
import Banner from "../components/Banner/Banner";
import Grid from "../components/Grid/Grid";
import Paginator from "../components/Paginator/Paginator";

function Pokedex() {
    const POKEMONS_PER_PAGE = 20;
    const INITIAL_PAGE_INDEX = 1;

    const { currentPage, nextPageItems, setNextPage, setPreviousPage, setCurrentPage } = usePagination(POKEMONS_PER_PAGE, INITIAL_PAGE_INDEX);
    const { loading, pokemons, error } = useFetchPokemons(POKEMONS_PER_PAGE, nextPageItems);
    const { totalPages } = useTotalPages(POKEMONS_PER_PAGE, pokemons);

    return (
        <>
            <Banner />
            <Grid cards={pokemons}/>
            <Paginator totalPages={totalPages} currentPage={currentPage} nextPage={setNextPage} previousPage={setPreviousPage} setCurrentPage={setCurrentPage}/>
        </>
    );
};

export default Pokedex;