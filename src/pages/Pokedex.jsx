import { PokedexProvider } from "../context/PokedexContext";
import Navbar from "../components/Navbar/Navbar";
import Grid from "../components/Grid/Grid";
import Paginator from "../components/Paginator/Paginator";
import PokemonCard from "../components/Modal/Card/PokemonCard";
import CaughtPokemonAlert from "../components/Modal/CatchPokemon/CaughtPokemonAlert";
import CaughtPokemonRegistration from "../components/Modal/CatchPokemon/CaughtPokemonRegistration";

function Pokedex() {
    return (
        <PokedexProvider>
            <Navbar />
            <Grid />
            <Paginator />
            <PokemonCard />
            <CaughtPokemonAlert />
            <CaughtPokemonRegistration />
        </PokedexProvider>
    );
};

export default Pokedex;