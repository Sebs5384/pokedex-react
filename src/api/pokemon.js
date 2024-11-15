const URL = "https://pokeapi.co/api/v2";

async function getPokemons(limit, offset) {
    if(limit === null || offset === null) return;

    const pokemonsURL = `${URL}/pokemon?limit=${limit}&offset=${offset}`;
    try {
        const response = await fetch(pokemonsURL);
        if(!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        };

        const pokemons = await response.json();
        return pokemons;
    } catch(error) {
        throw new Error(error);
    };
};

async function getPokemon(name) {
    if(name === null || name === undefined) return;

    const pokemonURL = `${URL}/pokemon/${name}`;
    try {
        const response = await fetch(pokemonURL);
        if(!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        };

        const pokemon = await response.json();
        return pokemon;
    } catch(error) {
        throw new Error(error);
    };
};

async function getPokemonSpecies(species, speciesCompleteName) {
    if(species === null) return;

    const speciesURL = `${URL}/pokemon-species/${species}`;
    const speciesCompleteNameUrl = `${URL}/pokemon-species/${speciesCompleteName}`;

    try {
        const response = await fetch(speciesURL);

        if(response.ok) {
            const pokemonSpecies = await response.json();

            return pokemonSpecies;
        } else if (response.status === 404 && speciesCompleteName) {
            const completeNameResponse = await fetch(speciesCompleteNameUrl);
            
            if(completeNameResponse.ok) {
                const pokemonSpecies = await completeNameResponse.json();

                return pokemonSpecies;
            };
        };

        if(!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText);
        };

    } catch(error) {
        throw new Error(error.message);
    };
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
    URL,
    getPokemons,
    getPokemon,
    getPokemonSpecies,
    getPokemonSprite
};