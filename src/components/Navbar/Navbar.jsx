import { usePokedexContext } from "../../context/PokedexContext";
import { Bar } from "./Pokemon";
import Logo from "./Logo";
import Searchbox from "./Searchbox";
import CatchPokemon from "./CatchPokemon";

function Navbar() {
    const {
        filteredPokemons,
        dropdownVisibility,
        handleSearchPokemon,
        handleInputFocus,
        handleInputOnBlur,
        handleSelectedCard,
        handlePokeballClick,
        isShaking,
        caughtPokemons,
        caughtPokemonSprite,
        searchboxError,
        errorCauseMessage,
        errorMessage,
        searchboxErrorMessageVisibility,
        handleCloseErrorMessage
    } = usePokedexContext();

    return (
        <Bar data-cy={"navbar-section"}>
            <Logo />
            <Searchbox 
                filteredPokemons={filteredPokemons}
                dropdownVisibility={dropdownVisibility}
                handleSearchPokemon={handleSearchPokemon}
                handleInputFocus={handleInputFocus}
                handleInputOnBlur={handleInputOnBlur}
                selectPokemon={handleSelectedCard}
                searchboxError={searchboxError}
                errorCauseMessage={errorCauseMessage}
                errorMessage={errorMessage}
                searchboxErrorMessageVisibility={searchboxErrorMessageVisibility}
                handleCloseErrorMessage={handleCloseErrorMessage}
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