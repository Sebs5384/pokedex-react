const URL = "https://pokeapi.co/api/v2";

async function getPokemons(limit, offset) {

    const pokemonsURL = `${URL}/pokemon?limit=${limit}&offset=${offset}`;
    return await fetch(pokemonsURL)
        .then(response => response.json())
        .catch((error) => {
            throw new Error(error);
        })
        .finally(() => {
            console.error(`Warning, using API call URL: ${pokemonsURL}`);
        });
};

async function getPokemon(id) {

    const pokemonURL = `${URL}/pokemon/${id}`;
    return await fetch(pokemonURL)
        .then(response => response.json())
        .catch((error) => {
            throw new Error(error);
        })
        .finally(() => {
            console.error(`Warning, using API call URL: ${pokemonURL}`);
        });
};

async function getPokemonSprite(id, artwork = "") {
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${artwork}${pokemonId}.png`;
};

export {
    getPokemons,
    getPokemon,
    getPokemonSprite
};