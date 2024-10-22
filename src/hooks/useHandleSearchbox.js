import { useReducer, useEffect } from "react";
import { searchboxReducer, initialSearchboxState } from "../reducers/index";
import { useFetchPokemons } from "./index";
import { getPokemonNames } from "../utils/index";

function useHandleSearchbox(limit, offset) {
    const [state, dispatch] = useReducer(searchboxReducer, initialSearchboxState);
    const { searchboxPokemons } = useFetchPokemons(limit, offset, "searchbox");

    const handleSearchPokemon = (pokemon) => {
        dispatch({ type: "SET_SEARCH_BOX_POKEMON", payload: pokemon.target.value });
        dispatch({ type: "SET_DROPDOWN_VISIBILITY", payload: true });
    };

    const handleInputFocus = () => {
        dispatch({ type: "SET_DROPDOWN_VISIBILITY", payload: true });
    };

    const handleInputOnBlur = () => {
        dispatch({ type: "SET_DROPDOWN_VISIBILITY", payload: false });
    };

    useEffect(() => {
        if(!state.searchBoxItems && searchboxPokemons) {
            dispatch({ type: "SET_SEARCH_BOX_ITEMS", payload: getPokemonNames(searchboxPokemons.results) });
            dispatch({ type: "SET_POKEMON_COUNT", payload: searchboxPokemons.count });
        };
    }, [searchboxPokemons, state.searchBoxItems]);
    
    const filteredPokemons = state.searchBoxItems ? state.searchBoxItems.filter((item) => {
        return item.toLowerCase().includes(state.searchboxPokemon.toLowerCase());
    }) : [];

    return {
        pokemonList: state.searchBoxItems,
        searchBoxPokemon: state.searchboxPokemon,
        dropdownVisibility: state.dropdownVisibility,
        filteredPokemons: filteredPokemons,
        pokemonsCount: state.pokemonCount,
        handleSearchPokemon,
        handleInputFocus,
        handleInputOnBlur,
    };
};

export default useHandleSearchbox;