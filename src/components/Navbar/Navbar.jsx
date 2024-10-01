import { usePokedexContext } from "../../context/PokedexContext";
import { Bar } from "./Pokemon";
import Logo from "./Logo";
import Searchbox from "./Searchbox";
import CatchPokemon from "./CatchPokemon";

function Navbar() {
    const {
        pokemonList,
        searchBoxPokemon,
        dropdownVisibility,
        handleSearchPokemon,
        handleInputFocus,
        handleInputOnBlur,
        handleSelectedCard,
        filteredPokemons,
        handlePokeballClick,
        isShaking,
        caughtPokemons,
        caughtPokemon,
        caughtPokemonSprite,
    } = usePokedexContext();

    return (
        <Bar>
            <Logo />
            <Searchbox 
                pokemonList={pokemonList}  
                searchItem={searchBoxPokemon}
                dropdownVisibility={dropdownVisibility}
                handleSearchPokemon={handleSearchPokemon}
                handleInputFocus={handleInputFocus}
                handleInputOnBlur={handleInputOnBlur}
                selectPokemon={handleSelectedCard}
                filteredPokemons={filteredPokemons}
            />
            <CatchPokemon 
                selectPokemon={handleSelectedCard}
                isShaking={isShaking}
                caughtPokemons={caughtPokemons}
                caughtPokemonSprite={caughtPokemonSprite}
                handlePokeballClick={handlePokeballClick}
            />
        </Bar>
    );
};

export default Navbar;