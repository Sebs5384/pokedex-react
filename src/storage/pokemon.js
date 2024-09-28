function getPokemonsKey(limit, offset) {
    return `pokemons_${limit}_${offset}`;
};

function getPokemonKey(name) {
    return `pokemon_${name}`;
};

function getPokemonSpeciesKey(id) {
    return `pokemon_species_${id}`;  
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

function loadPokemonSpecies(id) {
    const species = JSON.parse(localStorage.getItem(getPokemonSpeciesKey(id)));
    if(species === null) {
        throw new Error(`Pokemon species with given name: ${id} not found`);
    };

    return species;
};

function loadPokemonSprite(pokemon, artwork) {
    if(pokemon === undefined) {
        throw new Error(`Invalid pokemon: ${pokemon}`);
    };

    const sprite = JSON.parse(localStorage.getItem(getPokemonSpriteKey(pokemon, artwork)));
    if(sprite === null) {
        throw new Error(`Pokemon sprite of given pokemon: ${pokemon} not found`);
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

function storeSpecies(id, species) {
    if(id === undefined || typeof species !== "object") {
        throw new Error(`Name and species must be defined to be stored in localstorage, reading: name: ${id}, species: ${species}`);
    };

    localStorage.setItem(getPokemonSpeciesKey(id), JSON.stringify(species));
};

function storePokemonSprite(pokemon, sprite, artwork) {
    if(pokemon === undefined || typeof sprite !== "object") {
        throw new Error(`Id and sprite must be defined to be stored in localstorage, reading: id: ${pokemon}, sprite: ${sprite}`);
    };

    localStorage.setItem(getPokemonSpriteKey(pokemon, artwork), JSON.stringify(sprite.current));
};

export {
    loadPokemons,
    loadPokemon,
    loadPokemonSpecies,
    loadPokemonSprite,
    storePokemons,
    storePokemon,
    storeSpecies,
    storePokemonSprite
};

