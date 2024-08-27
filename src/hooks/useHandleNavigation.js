import { useReducer, useEffect } from "react";
import { navigationReducer, initialNavigationState } from "../reducers/navigationReducer";
import { useFetchPokemons } from "./index";
import { getPokemonNames, randomizeNumber } from "../utils/index";

function useHandleNavigation(limit, offset) {
    const [state, dispatch] = useReducer(navigationReducer, initialNavigationState);
    const { loading, pokemons, error } = useFetchPokemons(limit, offset);

    const setRandomPokemon = () => {
        const randomPokemonId = randomizeNumber(pokemons.count);

        dispatch({ type: "SET_RANDOM_POKEMON", payload: randomPokemonId });
    };

    useEffect(() => {
        if(state.searchBoxItems) {
            dispatch({ type: "SET_SEARCHED_POKEMONS", payload: getPokemonNames(state.searchBoxItems) });
        };
    }, [state.searchBoxItems]);
    
    return {
        pokemonList: state.searchBoxItems,
    }
};

export default useHandleNavigation;