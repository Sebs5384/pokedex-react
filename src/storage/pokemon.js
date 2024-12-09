function getPokemonsKey(limit, offset) {
    return `pokemons_${limit}_${offset}`;
};

function getPokemonKey(name) {
    return `pokemon_${name}`;
};

function getPokemonSpeciesKey(name) {
    return `pokemon_species_${name}`;  
};

function getPokemonSpriteKey(pokemon, artwork = "classic") {
    return `pokemon_sprite_${pokemon.name}_${artwork}`;
};

function loadPokemons(limit = 20, offset = 0) {
    const pokemons = JSON.parse(localStorage.getItem(getPokemonsKey(limit, offset)));
    if(pokemons === null) {
        throw new Error(`Pokemon with given limit: ${limit} and offset: ${offset} not found`);
    };

    return pokemons;
};

function loadPokemon(name) {
    const pokemon = JSON.parse(localStorage.getItem(getPokemonKey(name)));
    if(pokemon === null) {
        throw new Error(`Pokemon with given name: ${name} not found`);
    };

    return pokemon;
};

function loadPokemonSpecies(name) {
    const species = JSON.parse(localStorage.getItem(getPokemonSpeciesKey(name)));
    if(species === null) {
        throw new Error(`Pokemon species with given name: ${name} not found`);
    };

    return species;
};

function loadPokemonSprite(pokemon, artwork) {
    if(pokemon === undefined) {
        throw new Error(`Pokemon is undefined`);
    };

    const sprite = JSON.parse(localStorage.getItem(getPokemonSpriteKey(pokemon, artwork)));
    if(sprite === null) {
        throw new Error(`Pokemon sprite of given pokemon: ${pokemon.name} not found`);
    };

    return sprite;
};

function storePokemons(limit, offset, pokemons) {
    if(limit === undefined || offset === undefined || typeof pokemons !== "object") {
        throw new Error(`Limit, offset and pokemons must be defined to be stored in localstorage, reading: limit: ${limit}, offset: ${offset}, pokemons: ${pokemons}`);
    };

    localStorage.setItem(getPokemonsKey(limit, offset), JSON.stringify(pokemons));
};

function storePokemon(name, pokemon) {
    if(name === undefined || typeof pokemon !== "object") {
        throw new Error(`Name and pokemon must be defined to be stored in localstorage, reading: name: ${name}, pokemon: ${pokemon}`);
    };
    
    localStorage.setItem(getPokemonKey(name), JSON.stringify(pokemon));
};

function storeSpecies(name, species) {
    if(name === undefined || typeof species !== "object") {
        throw new Error(`Name and species must be defined to be stored in localstorage, reading: name: ${name}, species: ${species}`);
    };

    localStorage.setItem(getPokemonSpeciesKey(name), JSON.stringify(species));
};

function storePokemonSprite(pokemon, sprite, artwork) {
    if(pokemon === undefined || typeof sprite !== "object") {
        throw new Error(`Id and sprite must be defined to be stored in localstorage, reading: id: ${pokemon}, sprite: ${sprite}`);
    };

    localStorage.setItem(getPokemonSpriteKey(pokemon, artwork), JSON.stringify(sprite));
};

export {
    loadPokemons,
    loadPokemon,
    loadPokemonSpecies,
    loadPokemonSprite,
    storePokemons,
    storePokemon,
    storeSpecies,
    storePokemonSprite,
    // Exporting directly into Jest tests
    getPokemonKey,
    getPokemonsKey,
    getPokemonSpriteKey,
    getPokemonSpeciesKey,
};

