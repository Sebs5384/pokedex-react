import { NavInputGroup, NavContainer, NavInputGroupText, NavForm, NavDropdown, NavDropdownMenu, NavDropdownItem } from "./Pokemon";
import ImageContainer from "../shared/ImageContainer";
import ErrorMessage from "../shared/ErrorMessage";
import magnifier from "../../assets/img/misc/magnifier.png";
import PropTypes from "prop-types";

function Searchbox({ 
    filteredPokemons, 
    dropdownVisibility, 
    handleSearchPokemon, 
    handleInputFocus, 
    handleInputOnBlur, 
    selectPokemon, 
    searchboxError,
    errorCauseMessage,
    errorMessage,
    searchboxErrorMessageVisibility,
    handleCloseErrorMessage }) {
    return(
        <>
            <NavContainer >
                <NavInputGroup>
                    <NavInputGroupText className="magnifier">
                        <ImageContainer src={magnifier} alt="magnifier" />
                    </NavInputGroupText>
                    <NavForm 
                        type="search"
                        placeholder="Search Pokemon"
                        className="search-input form-control pokedex-search-box"
                        data-cy={"navbar-search-input"}
                        onChange={handleSearchPokemon}
                        onFocus={handleInputFocus}
                        onBlur={handleInputOnBlur}
                    />
                </NavInputGroup>
                {   searchboxError ? 
                        <>
                            <ErrorMessage 
                                errorCauseMessage={errorCauseMessage}
                                errorText={errorMessage}
                                errorMessageVisibility={searchboxErrorMessageVisibility}
                                closeErrorModal={handleCloseErrorMessage}
                            />
                            { dropdownVisibility && 
                                <NavDropdown show>
                                    <NavDropdownMenu data-cy={"nav-bar-dropdown-menu"}>
                                        <NavDropdownItem>
                                            No pokemons found
                                        </NavDropdownItem>
                                    </NavDropdownMenu>
                                </NavDropdown> 
                            }
                        </>
                    :
                    dropdownVisibility && 
                        <NavDropdown show>
                            <NavDropdownMenu data-cy={"navbar-dropdown-menu"}>
                                {
                                    filteredPokemons.map((pokemon) => {
                                        return (
                                            <NavDropdownItem
                                                key={pokemon}
                                                data-cy={pokemon}
                                                onMouseDown={() => {
                                                    selectPokemon(pokemon);
                                                }}
                                            >
                                                {pokemon}
                                            </NavDropdownItem>
                                        )
                                    })
                                }
                            </NavDropdownMenu>
                        </NavDropdown>
                }
            </NavContainer>
        </>
    );
};
Searchbox.propTypes = {
    pokemonList: PropTypes.array,
    searchPokemon: PropTypes.func,
    dropdownVisibility: PropTypes.bool,
    handleSearchPokemon: PropTypes.func,
    handleInputFocus: PropTypes.func,
    handleInputOnBlur: PropTypes.func,
    selectPokemon: PropTypes.func,
    filteredPokemons: PropTypes.array
};

export default Searchbox;