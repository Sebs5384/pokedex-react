import { NavInputGroup, NavContainer, NavInputGroupText, NavForm } from "./Pokemon";
import ImageContainer from "../shared/ImageContainer";
import magnifier from "../../assets/img/misc/magnifier.png"
import { Dropdown } from "react-bootstrap";

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
                { dropdownVisibility && <Dropdown show>
                        <Dropdown.Menu style={{ maxHeight: '250px', width: '96%', overflowY: 'scroll' }}>
                            {filteredPokemons.map((pokemon) => {
                                return(
                                    <Dropdown.Item key={pokemon} onMouseDown={() => selectPokemon(pokemon)}>
                                        {pokemon}
                                    </Dropdown.Item>
                                )
                            })}
                    </Dropdown.Menu>
                    </Dropdown>
                }
            </NavContainer>
        </>
    );
};

export default Searchbox;