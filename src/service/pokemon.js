import {
    getPokemons as getPokemonsFromApi,
    getPokemon as getPokemonFromApi,
    getPokemonSpecies as getPokemonSpeciesFromApi,
    getPokemonSprite as getPokemonSpriteFromApi
} from "../api/pokemon";
import {
    loadPokemons as loadPokemonsFromStorage,
    loadPokemon as loadPokemonFromStorage,
    loadPokemonSpecies as loadPokemonSpeciesFromStorage,
    loadPokemonSprite as loadPokemonSpriteFromStorage,
    storePokemons,
    storePokemon,
    storeSpecies,
    storePokemonSprite,
} from "../storage/pokemon";

async function getPokemons(limit, offset) {
    try {
        return loadPokemonsFromStorage(limit, offset);
    } catch(error) {
        const pokemons = await getPokemonsFromApi(limit, offset);
        storePokemons(limit, offset, pokemons);
        return pokemons;
    };
};

async function getPokemon(name) {
    try {
        return loadPokemonFromStorage(name);
    } catch(error) {
        const pokemon = await getPokemonFromApi(name);
        storePokemon(name, pokemon);
        return pokemon;
    };
};

async function getPokemonSpecies(name, completeName) {
    try {
        return loadPokemonSpeciesFromStorage(name);
    } catch(error) {
        const species = await getPokemonSpeciesFromApi(name, completeName);
        storeSpecies(name, species);
        return species;
    };
};

async function getPokemonSprite(pokemon, artwork = "") {
    try {
        return loadPokemonSpriteFromStorage(pokemon.name, artwork);
    } catch(error) {
        const sprite = await getPokemonSpriteFromApi(pokemon, artwork);
        storePokemonSprite(pokemon, sprite, artwork);
        return sprite;
    };
};

export {
    getPokemons,
    getPokemon,
    getPokemonSpecies,
    getPokemonSprite,
};