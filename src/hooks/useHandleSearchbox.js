import { useReducer, useEffect } from "react";
import { searchboxReducer, initialSearchboxState } from "../reducers/index";
import { useFetchPokemons } from "./index";
import { getPokemonNames } from "../utils/index";

function useHandleSearchbox(limit, offset) {
    const [state, dispatch] = useReducer(searchboxReducer, initialSearchboxState);
    const { loading, pokemons, error } = useFetchPokemons(limit, offset);

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
        if(!state.searchBoxItems && pokemons) {
            dispatch({ type: "SET_SEARCH_BOX_ITEMS", payload: getPokemonNames(pokemons.results) });
        };
    }, [pokemons, state.searchBoxItems]);
    
    const filteredPokemons = state.searchBoxItems ? state.searchBoxItems.filter((item) => {
        return item.toLowerCase().includes(state.searchBoxPokemon.toLowerCase());
    }) : [];

    return {
        pokemonList: state.searchBoxItems,
        searchBoxPokemon: state.searchBoxPokemon,
        dropdownVisibility: state.dropdownVisibility,
        filteredPokemons: filteredPokemons,
        handleSearchPokemon,
        handleInputFocus,
        handleInputOnBlur,
    };
};

export default useHandleSearchbox;