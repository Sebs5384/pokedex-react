import { NavInputGroup, NavContainer, NavInputGroupText, NavForm, NavDropdown, NavDropdownMenu, NavDropdownItem } from "./Pokemon";
import ImageContainer from "../shared/ImageContainer";
import magnifier from "../../assets/img/misc/magnifier.png"
import PropTypes from "prop-types";

function Searchbox({ pokemonList, searchPokemon, dropdownVisibility, handleSearchPokemon, handleInputFocus, handleInputOnBlur, selectPokemon, filteredPokemons }) {
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
                        onChange={handleSearchPokemon}
                        onFocus={handleInputFocus}
                        onBlur={handleInputOnBlur}
                    />
                </NavInputGroup>
                { dropdownVisibility && <NavDropdown show>
                        <NavDropdownMenu>
                            {
                                filteredPokemons.map((pokemon) => {
                                    return (
                                        <NavDropdownItem
                                            key={pokemon}
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
Searchbox.PropTypes = {
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