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
import {
    loadSpriteUrl,
    getSpriteUrl
} from "../utils/index";

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
        const loadedPokemon =  loadPokemonFromStorage(name);
        return loadedPokemon;
    } catch(error) {
        const pokemon = await getPokemonFromApi(name);

        try {
            storePokemon(name, pokemon);
        } catch(error) {
            if(error.name === "QuotaExceededError") {
                localStorage.clear();
            };
        };

        return pokemon;
    };
};

async function getPokemonSpecies(name, completeName) {
    try {
        return loadPokemonSpeciesFromStorage(name);
    } catch(error) {
        const species = await getPokemonSpeciesFromApi(name, completeName);
        storeSpecies(completeName, species);
        return species;
    };
};

async function getPokemonSprite(pokemon, artwork = "") {
    try {
        const loadedPokemonSprite = await loadPokemonSpriteFromStorage(pokemon, artwork);
        return loadedPokemonSprite;
    } catch(error) {
        const sprite = await getPokemonSpriteFromApi(pokemon, artwork, getSpriteUrl, loadSpriteUrl);
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