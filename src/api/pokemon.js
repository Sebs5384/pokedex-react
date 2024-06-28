const URL = "https://pokeapi.co/api/v2";

async function getPokemons(limit, offset) {
    if(limit || offset === undefined) throw new Error(`limit and offset are required, reading: ${limit}, ${offset}`);

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
    if(id === undefined) throw new Error(`id is required, reading: ${id}`);

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

export {
    getPokemons,
    getPokemon
};