import { Bar } from "./Pokemon";
import Logo from "./Logo";
import Searchbox from "./Searchbox";
import CatchPokemon from "./CatchPokemon";

function Navbar() {
    return (
        <Bar>
            <Logo />
            <Searchbox />
            <CatchPokemon />
        </Bar>
    );
};

export default Navbar;