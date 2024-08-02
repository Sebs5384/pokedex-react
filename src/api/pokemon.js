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

async function getPokemon(name) {

    const pokemonURL = `${URL}/pokemon/${name}`;
    return await fetch(pokemonURL)
        .then(response => response.json())
        .catch((error) => {
            throw new Error(error);
        })
        .finally(() => {
            console.error(`Warning, using API call URL: ${pokemonURL}`);
        });
};

async function getPokemonSpecies(name) {
    
    const speciesURL = `${URL}/pokemon-species/${name}`;
    return await fetch(speciesURL)
        .then(response => response.json())
        .catch((error) => {
            throw new Error(error);
        })
        .finally(() => {
            console.error(`Warning, using API call URL: ${speciesURL}`);
        });
};

async function getPokemonSprite(id, artwork = "") {
    return new Promise((resolve, reject) => {
        const pokemonSpriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${artwork}/${id}.png`;
        const pokemonSprite = new Image();
        pokemonSprite.onload = () => {
            resolve(pokemonSpriteUrl);
        };
        pokemonSprite.onerror = () => {
            reject(new Error("Pokemon Sprite Error"));
        };
        pokemonSprite.src = pokemonSpriteUrl;
    });
};

export {
    getPokemons,
    getPokemon,
    getPokemonSpecies,
    getPokemonSprite
};