import Pokedex from "./Pokedex";

function App() {
    const POKEMONS_PER_PAGE = 20;
    const INITIAL_PAGE_INDEX = 1;

    return (
        <>
            <Pokedex pokemonsPerPage={POKEMONS_PER_PAGE} initialPageIndex={INITIAL_PAGE_INDEX}/>
        </>
    );
};

export default App;