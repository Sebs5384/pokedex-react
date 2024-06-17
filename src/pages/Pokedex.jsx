import useFetchPokemons from "../hooks/useFetchPokemons";
import Banner from "../components/Banner/Banner";
import Grid from "../components/Grid/Grid";
import Paginator from "../components/Paginator/Paginator";
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