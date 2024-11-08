import { NavInputGroup, NavContainer, NavInputGroupText, NavForm, NavDropdown, NavDropdownMenu, NavDropdownItem } from "./Pokemon";
import ImageContainer from "../shared/ImageContainer";
import ErrorMessage from "../Modal/ErrorMessage";
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
                        <ImageContainer src={magnifier} alt="magnifier" dataAttribute={"navbar-searchbox-icon"}/>
                    </NavInputGroupText>
                    <NavForm 
                        type="search"
                        placeholder="Search Pokemon"
                        className="search-input form-control pokedex-search-box"
                        data-cy={"navbar-search-input"}
                        data-testid={"navbar-search-input"}
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
                                data-testid={"searchbox-error-message"}
                            />
                            { dropdownVisibility && 
                                <NavDropdown show>
                                    <NavDropdownMenu data-cy={"navbar-dropdown-menu"} data-testid={"navbar-dropdown-menu"}>
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
                            <NavDropdownMenu data-cy={"navbar-dropdown-menu"} data-testid={"navbar-dropdown-menu"}>
                                {
                                    filteredPokemons && filteredPokemons.length ? filteredPokemons.map((pokemon) => {
                                        return (
                                            <NavDropdownItem
                                                key={pokemon}
                                                data-cy={pokemon}
                                                data-testid={"dropdown-item"}
                                                onMouseDown={() => {
                                                    selectPokemon(pokemon);
                                                }}
                                            >
                                                {pokemon}
                                            </NavDropdownItem>
                                        )
                                    })
                                    :
                                    <NavDropdownItem
                                        data-testid={"dropdown-item"}
                                    >
                                        No pokemons found
                                    </NavDropdownItem>
                                }
                            </NavDropdownMenu>
                        </NavDropdown>
                }
            </NavContainer>
        </>
    );
};
Searchbox.propTypes = {
    filteredPokemons: PropTypes.array,
    dropdownVisibility: PropTypes.bool,
    handleSearchPokemon: PropTypes.func,
    handleInputFocus: PropTypes.func,
    handleInputOnBlur: PropTypes.func,
    selectPokemon: PropTypes.func,
    searchboxError: PropTypes.bool,
    errorCauseMessage: PropTypes.string,
    errorMessage: PropTypes.string,
    searchboxErrorMessageVisibility: PropTypes.bool,
    handleCloseErrorMessage: PropTypes.func
};

export default Searchbox;