import { useReducer, useEffect } from "react";
import { searchboxReducer, initialSearchboxState } from "../reducers/index";
import { useFetchPokemons } from "./index";
import { getPokemonNames, handleProximitySearch } from "../utils/index";

function useHandleSearchbox(limit, offset) {
    const [state, dispatch] = useReducer(searchboxReducer, initialSearchboxState);
    const { searchboxPokemons, searchboxError } = useFetchPokemons(limit, offset, "searchbox");

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
        if(!state.searchboxItems && searchboxPokemons && searchboxPokemons.results) {
            const pokemonNames = getPokemonNames(searchboxPokemons.results);

            dispatch({ type: "SET_SEARCH_BOX_ITEMS", payload: pokemonNames });
            dispatch({ type: "SET_POKEMON_COUNT", payload: searchboxPokemons.count });
        };
    }, [searchboxPokemons, state.searchboxItems]);
    
    const filteredPokemons = handleProximitySearch(state.searchboxPokemon, state.searchboxItems);

    return {
        pokemonList: state.searchboxItems,
        dropdownVisibility: state.dropdownVisibility,
        filteredPokemons: filteredPokemons,
        pokemonsCount: state.pokemonCount,
        searchboxError: searchboxError,
        searchboxPokemon: state.searchboxPokemon,
        handleSearchPokemon,
        handleInputFocus,
        handleInputOnBlur,
    };
};

export default useHandleSearchbox;