import { PokemonSearchInput, NavContainer } from "./Pokemon";

function Searchbox() {
    return(
        <NavContainer >
            <PokemonSearchInput
                type="search"
                placeholder="Search"
            />
        </NavContainer>
    );
};

export default Searchbox;