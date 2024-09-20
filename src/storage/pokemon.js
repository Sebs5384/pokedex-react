function getPokemonsKey(limit, offset) {
    return `pokemons_${limit}_${offset}`;
};

function getPokemonKey(name) {
    return `pokemon_${name}`;
};

function getPokemonSpeciesKey(name) {
    return `pokemon_species_${name}`;  
};

function getPokemonSpriteKey(id, artwork = "classic") {
    return `pokemon_sprite_${id}_${artwork}`;
};

function loadPokemons(limit = 20, offset = 0) {
    const pokemons = JSON.parse(localStorage.getItem(getPokemonsKey(limit, offset)));
    if(pokemons === undefined) {
        throw new Error(`Pokemon with given limit: ${limit} and offset: ${offset} not found`);
    };

    return pokemons;
};

function loadPokemon(name) {
    const pokemon = JSON.parse(localStorage.getItem(getPokemonKey(name)));
    if(pokemon === undefined) {
        throw new Error(`Pokemon with given name: ${name} not found`);
    };

    return pokemon;
};

function loadPokemonSpecies(name) {
    const species = JSON.parse(localStorage.getItem(getPokemonSpeciesKey(name)));
    if(species === undefined) {
        throw new Error(`Pokemon species with given name: ${name} not found`);
    };

    return species;
};

function loadPokemonSprite(id, artwork) {
    if(id === undefined) {
        throw new Error(`Invalid sprite id: ${id}`);
    };

    const sprite = JSON.parse(localStorage.getItem(getPokemonSpriteKey(id, artwork)));
    if(sprite === undefined) {
        throw new Error(`Pokemon sprite with given id: ${id} not found`);
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

function storePokemonSprite(id, sprite, artwork) {
    if(id === undefined || typeof sprite !== "string") {
        throw new Error(`Id and sprite must be defined to be stored in localstorage, reading: id: ${id}, sprite: ${sprite}`);
    };

    localStorage.setItem(getPokemonSpriteKey(id, artwork), JSON.stringify(sprite));
};

export {
    loadPokemons,
    loadPokemon,
    loadPokemonSpecies,
    loadPokemonSprite,
    storePokemons,
    storePokemon,
    storeSpecies,
};

