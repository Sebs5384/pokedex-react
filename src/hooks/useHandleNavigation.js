import { useReducer, useEffect } from "react";
import { navigationReducer, initialNavigationState } from "../reducers/navigationReducer";
import { useFetchPokemons } from "./index";
import { randomizeNumber } from "../utils/general";

function useHandleNavigation(limit, offset) {
    const [state, dispatch] = useReducer(navigationReducer, initialNavigationState);
    const { loading, pokemons } = useFetchPokemons(limit, offset);

    const setRandomPokemon = () => {
        const randomPokemonId = randomizeNumber(pokemons.count);

        dispatch({ type: "SET_RANDOM_POKEMON", payload: randomPokemonId });
    };

    const setSearchBoxItems = () => {

    };

    useEffect(() => {
        console.log(pokemons)
    }, [limit, offset]);
};

export default useHandleNavigation;