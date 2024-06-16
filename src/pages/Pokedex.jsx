import useFetchPokemons from "../hooks/useFetchPokemons";
import Grid from "../components/Grid";
import { useEffect } from "react";

function Pokedex() {
    const { loading, pokemons, error } = useFetchPokemons();
    useEffect(() => {
        console.log(pokemons);
    })

    return (
        <>
            <div>
                <h1>Banner</h1>
            </div>
            <Grid cards={pokemons}/>
            <div>
                <h1>Paginator</h1>
            </div>
        </>
    );
};

export default Pokedex;