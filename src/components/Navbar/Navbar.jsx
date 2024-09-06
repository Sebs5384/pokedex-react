import { Bar } from "./Pokemon";
import Logo from "./Logo";
import Searchbox from "./Searchbox";
import CatchPokemon from "./CatchPokemon";
import { useEffect} from "react";

function Navbar({ list, searchItem, listVisibility, handleSearchbox, handleInput, handleInputOnBlur, selectPokemon, filteredPokemons }) {
    return (
        <Bar>
            <Logo />
            <Searchbox 
                pokemonList={list}  
                searchItem={searchItem}
                dropdownVisibility={listVisibility}
                handleSearchPokemon={handleSearchbox}
                handleInputFocus={handleInput}
                handleInputOnBlur={handleInputOnBlur}
                selectPokemon={selectPokemon}
                filteredPokemons={filteredPokemons}
            />
            <CatchPokemon 
                selectPokemon={selectPokemon} 
            />
        </Bar>
    );
};

export default Navbar;