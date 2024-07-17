function parsePokemonData(data) {
    const { pokemon, species } = data;
    
    const id = pokemon.id;
    const name = parsePokemonName(pokemon.name);
    const skills = getPokemonSkills(pokemon.abilities);
    const stats = getPokemonStats(pokemon.stats);
    const types = getPokemonTypes(pokemon.types);
    const height = convertDecimeterToFeet(pokemon.height);
    const weight = convertGramToLb(pokemon.weight);
    const typeAdvantage = getPokemonAdvantage(types.mainType, advantageChart);
    const previousEvolutions = getPreviousEvolutionString(species);
    const description = getDescription(species.flavor_text_entries, "en");

    const pokemonData = {
        id,
        name,
        skills,
        stats,
        types,
        height,
        weight,
        typeAdvantage,
        previousEvolutions,
        description
    };

    return pokemonData;
};

function parsePokemonName(name) {
    const words = name.split('-');
    const pokemonName = words[0].lenght === 2 ? `${words[0]}${words[1]}` : words[0];

    return  pokemonName;
};

function getPokemonSkills(skills) {
    const pokemonSkills = {
        firstSkill: skills[0].ability.name,
        secondSkill: skills[1].ability.name ? skills[1].ability.name : ''
    };
    
    return pokemonSkills; 
};

function getPokemonStats(stats) {
    const pokemonStats = {
        hp: stats[0].base_stat,
        attack: stats[1].base_stat,
        defense: stats[2].base_stat,
        spAtk: stats[3].base_stat,
        spDef: stats[4].base_stat,
        speed: stats[5].base_stat
    };

    return pokemonStats; 
};

function getPokemonTypes(types) {
    const pokemonTypes = {
        mainType: types[0].type.name,
        secondaryType: types[1].type.name ? types[1].type.name : undefined
    };
    
    return pokemonTypes;
};

function getPreviousEvolutionString(species) {
    const previousEvolutions = {
        name: species.evolves_from_species ? `Evolves from ${species.evolves_from_species.name}` : 'Basic Pokemon',
        id: species.evolves_from_species ? species.evolves_from_species.url.split('/')[6] : 'None',
        genus: species.genera.length ? species.genera.find((genus) => genus.language.name === 'en').genus : '',
    };

    return previousEvolutions;
};

function getDescription(entry, language) {
    const pokemonTextEntry = entry;
    const entry = pokemonTextEntry.find((pokemonEntry) => pokemonEntry.language.name === "en");
    
    const pokemonEntry = entry ? entry.flavor_text.replace(/\u000c/g, ' ') : '';
    
    return pokemonEntry;
};

export default parsePokemonData;