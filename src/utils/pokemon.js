import { convertDecimeterToFeet, convertGramToLb, randomizeNumber } from "./general";
import pokemonTypeImage from "../assets/img/pokemon-type/index";
import textures from "../assets/img/modal-texture/index";

function getPokemonNames(pokemons) {
  const pokemonNames = pokemons.map((pokemon) => {
    return pokemon.name;
  });

  return pokemonNames;
};

function parsePokemonName(name) {
  const words = name.split('-');
  const pokemonName = words[0].lenght === 2 ? `${words[0]}${words[1]}` : words[0];

  return  pokemonName;
};

function getPokemonSkills(skills) {
  const pokemonSkills = {
    firstSkill: skills[0].ability.name,
    secondSkill: skills[1] ? skills[1].ability.name : undefined
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

function getBackgroundStyle(types) {
  const backgroundStyle = typeBackground[types.mainType];

  return backgroundStyle;
};

function getBackgroundTexture(types) {
  const texture = textures[types.mainType];

  return texture;
};

function getAdvantageImage(typeAdvantage) {
  const advantageImage = {
    weakness: pokemonTypeImage[typeAdvantage.weakness].icon,
    resistance: pokemonTypeImage[typeAdvantage.resistance].icon,
    retreat: pokemonTypeImage.retreat.icon,
  };

  return advantageImage;
};

function getTypeImage(types) {
  const typeImage = {
    mainTypeLogo: pokemonTypeImage[types.mainType].logo,
    secondaryTypeLogo: types.secondaryType ? pokemonTypeImage[types.secondaryType].logo : pokemonTypeImage[undefined].logo,
    mainTypeIcon: pokemonTypeImage[types.mainType].icon
  };

  return typeImage;
};

function getRandomPokemon(pokemonsCount, pokemonList) {
  const randomNumber = randomizeNumber(pokemonsCount);

  return pokemonList[randomNumber];
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

const typeBackground = {
  water: "linear-gradient(rgb(107, 254, 154), rgb(30, 103, 198), rgb(13, 52, 104), rgb(0, 0, 0))",
  fire: "linear-gradient(rgb(36, 17, 17), rgb(117, 28, 28), rgb(248, 141, 1), rgb(255, 0, 0))",
  bug: "linear-gradient(rgba(172, 211, 110, 0.747), rgb(196, 240, 3), rgb(101, 112, 0))",
  dark: "linear-gradient(rgba(61, 54, 65, 0.747), rgb(150, 132, 160), rgb(44, 43, 44))",
  dragon: "linear-gradient(rgba(7, 201, 185, 0.747), rgb(208, 236, 240)), rgb(117, 239, 248)",
  electric: "linear-gradient(rgba(252, 241, 226, 0.747), rgb(80, 80, 80), rgb(0, 0, 0))",
  fairy: "linear-gradient(rgb(8, 196, 186), rgb(1, 35, 41), rgb(255, 255, 255))",
  fighting: "linear-gradient(rgba(0, 0, 0, 0.747), rgb(255, 255, 255), rgb(255, 255, 255))",
  flying: "linear-gradient(rgba(21, 46, 43, 0.747), rgb(182, 105, 105), rgb(129, 0, 71))",
  ghost: "linear-gradient(rgba(0, 0, 0, 0.747), rgb(121, 2, 218), rgb(240, 221, 253))",
  grass: "linear-gradient(rgba(0, 0, 0, 0.747), rgb(76, 134, 0), rgb(0, 88, 84), rgb(128, 228, 181))",
  ground: "linear-gradient(rgba(252, 73, 73, 0.747), rgb(206, 141, 0), rgb(254, 255, 197))",
  ice: "linear-gradient(rgba(153, 223, 255, 0.747), rgb(114, 61, 0), rgb(112, 51, 1))",
  normal: "linear-gradient(rgba(51, 50, 45, 0.747), rgb(0, 0, 0), rgb(59, 49, 49))",
  poison: "linear-gradient(rgba(221, 193, 253, 0.747), rgb(157, 255, 190), rgb(15, 35, 53))",
  psychic: "linear-gradient(rgba(126, 91, 97, 0.747), rgb(247, 1, 95), rgb(0, 0, 0))",
  rock: "linear-gradient(rgba(139, 51, 0, 0.747), rgb(253, 191, 97), rgb(185, 53, 0))",
  steel: "linear-gradient(rgba(0, 0, 0, 0.747), rgba(133, 133, 133, 0), rgb(255, 255, 255))"
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
  const backgroundStyle = getBackgroundStyle(types);
  const backgroundTexture = getBackgroundTexture(types);
  const advantageImage = getAdvantageImage(typeAdvantage);
  const typeImage = getTypeImage(types);

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
    description,
    backgroundStyle,
    backgroundTexture,
    advantageImage,
    typeImage
  };

  return pokemonData;
};

export {
  parsePokemonData,
  getPokemonSpriteUrl,
  getPokemonNames,
  getRandomPokemon,
};