import { convertDecimeterToFeet, convertGramToLb } from "./general";

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
    hp: `${stats[0].base_stat} HP`,
    atk: `ATTACK: ${stats[1].base_stat}`,
    def: `DEFENSE: ${stats[2].base_stat}`,
    spAtk: `SP ATK: ${stats[3].base_stat}`,
    spDef: `SP DEF: ${stats[4].base_stat}`,
    speed: `SPEED: ${stats[5].base_stat}`
  };

  return pokemonStats; 
};

function getPokemonTypes(types) {
  const pokemonTypes = {
    mainType: types[0].type.name,
    secondaryType: types[1] ? types[1].type.name : undefined
  };
    
  return pokemonTypes;
};

function getPokemonAdvantage(type, advantageChart) {
  const pokemonAdvantage = advantageChart[type];

  return pokemonAdvantage;
};

function getPokemonGenus(species) {
  const pokemonGenus = {
    name: species.evolves_from_species ? `Evolves from ${species.evolves_from_species.name}` : 'Basic Pokemon',
    id: species.evolves_from_species ? species.evolves_from_species.url.split('/')[6] : 'None',
    genus: species.genera.length ? species.genera.find((genus) => genus.language.name === 'en').genus : '',
  };

  return pokemonGenus;
};

function getDescription(entry, language) {
  const pokemonTextEntry = entry;
  const textEntry = pokemonTextEntry.find((pokemonEntry) => pokemonEntry.language.name === "en");
    
  const pokemonEntry = textEntry ? textEntry.flavor_text.replace(/\u000c/g, ' ') : '';
    
  return pokemonEntry;
};

function getPokemonSpriteUrl(url) {
  const pokemonId = `${url.split("/")[url.split("/").length - 2]}`;
  const pokemonSpriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`;

  return pokemonSpriteUrl;
};

const advantageChart = {
  fire: {
    resistance: 'grass',
    weakness: 'water',
  },
  water: {
    resistance: 'fire',
    weakness: 'electric',
  },
  grass: {
    resistance: 'water',
    weakness: 'fire',
  },
  electric: {
    resistance: 'water',
    weakness: 'ground',
  },
  normal: {
    resistance: 'ghost',
    weakness: 'fighting',
  },
  fighting: {
    resistance: 'normal',
    weakness: 'flying',
  },
  flying: {
    resistance: 'fighting',
    weakness: 'rock',
  },
  poison: {
    resistance: 'fairy',
    weakness: 'ground',
  },
  ground: {
    resistance: 'electric',
    weakness: 'grass',
  },
  rock: {
    resistance: 'fire',
    weakness: 'water',
  },
  bug: {
    resistance: 'grass',
    weakness: 'fire',
  },
  ghost: {
    resistance: 'normal',
    weakness: 'dark',
  },
  steel: {
    resistance: 'fairy',
    weakness: 'fire',
  },
  psychic: {
    resistance: 'fighting',
    weakness: 'dark',
  },
  ice: {
    resistance: 'ice',
    weakness: 'fire',
  },
  dragon: {
    resistance: 'dragon',
    weakness: 'fairy',
  },
  fairy: {
    resistance: 'dark',
    weakness: 'poison',
  },
  dark: {
    resistance: 'ghost',
    weakness: 'fairy',
  },
};

function parsePokemonData(pokemon, species) {
  const id = pokemon.id;
  const name = parsePokemonName(pokemon.name);
  const skills = getPokemonSkills(pokemon.abilities);
  const stats = getPokemonStats(pokemon.stats);
  const types = getPokemonTypes(pokemon.types);
  const height = convertDecimeterToFeet(pokemon.height);
  const weight = convertGramToLb(pokemon.weight);
  const typeAdvantage = getPokemonAdvantage(types.mainType, advantageChart);
  const evolutionGenus = getPokemonGenus(species);
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
    evolutionGenus,
    description
  };

  return pokemonData;
};

export {
  parsePokemonData,
  getPokemonSpriteUrl
}