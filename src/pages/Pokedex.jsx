import useFetchPokemons from "../hooks/useFetchPokemons";
import Banner from "../components/Banner";
import Grid from "../components/Grid";
import Paginator from "../components/Paginator";
import { useEffect } from "react";

function Pokedex() {
    const { loading, pokemons, error } = useFetchPokemons();
    useEffect(() => {
        console.log(pokemons);
    })

    return (
        <>
            <Banner />
            <Grid cards={pokemons}/>
            <Paginator />
        </>
    );
};

export default Pokedex;