import { usePokedexContext } from "../../context/PokedexContext";
import { Bar } from "./Pokemon";
import Logo from "./Logo";
import Searchbox from "./Searchbox";
import CatchPokemon from "./CatchPokemon";

function Navbar() {
    const { searchbox, card, catchPokemon, error } = usePokedexContext();

    return (
        <Bar 
            data-cy={"navbar-section"}
            data-testid={"navbar-section"}
        >
            <Logo />
            <Searchbox 
                filteredPokemons={searchbox.filteredPokemons}
                dropdownVisibility={searchbox.dropdownVisibility}
                handleSearchPokemon={searchbox.handleSearchPokemon}
                handleInputFocus={searchbox.handleInputFocus}
                handleInputOnBlur={searchbox.handleInputOnBlur}
                selectPokemon={card.handleSelectedCard}
                searchboxError={searchbox.searchboxError}
                errorCauseMessage={error.errorCauseMessage}
                errorMessage={error.errorMessage}
                searchboxErrorMessageVisibility={error.searchboxErrorMessageVisibility}
                handleCloseErrorMessage={error.handleCloseErrorMessage}
            />
            <CatchPokemon 
                selectPokemon={card.handleSelectedCard}
                isShaking={catchPokemon.isShaking}
                caughtPokemons={catchPokemon.caughtPokemons}
                caughtPokemonSprite={catchPokemon.caughtPokemonSprite}
                handlePokeballClick={catchPokemon.handlePokeballClick}
            />
        </Bar>
    );
};

export default Navbar;