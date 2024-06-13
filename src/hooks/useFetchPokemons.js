import { useReducer, useEffect } from "react";
import { pokemonReducer, intialState } from "../reducers/pokemonReducer";
import { getPokemons } from "../api/pokemon";

function useFetchPokemons(offset, limit) {
    const [state, dispatch] = pokemonReducer(pokemonReducer, intialState);

    useEffect(() => {
        const fetchPokemonsData = async () => {
            dispatch({ type: "FETCH_REQUEST" });
        
            try {
                const pokemonsData = await getPokemons(limit, offset);
                dispatch({ type: "FETCH_SUCCESS", payload: pokemonsData });
            } catch (error) {
                dispatch({ type: "FETCH_FAILURE", payload: error });
            };
        };

        fetchPokemonsData();
    }, [offset, limit]);

    return state;
};

export default useFetchPokemons;