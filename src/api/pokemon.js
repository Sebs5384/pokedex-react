const URL = "https://pokeapi.co/api/v2";

async function getPokemons(limit, offset) {
    if(limit === null || offset === null) return;

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
    if(name === null || name === undefined) return;

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

async function getPokemonSpecies(species) {
    if(species === null) return;

    const speciesURL = `${URL}/pokemon-species/${species}`;
    return await fetch(speciesURL)
        .then(response => response.json())
        .catch((error) => {
            throw new Error(error);
        })
        .finally(() => {
            console.error(`Warning, using API call URL: ${speciesURL}`);
        });
};

async function getPokemonSprite(pokemon, artwork = "") {
    const getSpriteUrl = (id) => `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${artwork}/${id}.png`; 

    const loadSprite = (url) => 
        new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(url);
            img.onerror = async () => {
                const fallbackImg = await import("../assets/img/misc/404-shocked.png");
                resolve(fallbackImg.default);
            };
            img.src = url;
        });
    
    try {
        const currentSpriteUrl = getSpriteUrl(pokemon.id);
        const currentSpritePromise = loadSprite(currentSpriteUrl);

        let previousSpritePromise = Promise.resolve(null);
        
        if(pokemon.evolutionGenus.id === "None") {

            previousSpritePromise = Promise.resolve(null);
        } else if(pokemon.evolutionGenus && pokemon.evolutionGenus.id) {
            
            const previousSpriteUrl = getSpriteUrl(pokemon.evolutionGenus.id);
            previousSpritePromise = loadSprite(previousSpriteUrl);
        };

        const [currentSprite, previousSprite] = await Promise.all([currentSpritePromise, previousSpritePromise]);

        return {
            current: currentSprite,
            previous: previousSprite
        }
    } catch (error) {
        throw new Error(`Error loading sprite: ${error.message}`);
    };
};

export {
    getPokemons,
    getPokemon,
    getPokemonSpecies,
    getPokemonSprite
};