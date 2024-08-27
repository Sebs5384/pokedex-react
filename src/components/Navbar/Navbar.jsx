import { Bar } from "./Pokemon";
import Logo from "./Logo";
import Searchbox from "./Searchbox";
import CatchPokemon from "./CatchPokemon";

function Navbar({ list }) {
    return (
        <Bar>
            <Logo />
            <Searchbox pokemonList={list} />
            <CatchPokemon />
        </Bar>
    );
};

export default Navbar;