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
    const previousEvolutions = getPreviousEvolutions(species);
    const description = getDescription(species.flavor_text_entries, "en");

    return {
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
};