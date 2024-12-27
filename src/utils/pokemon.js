  import { 
  getSpriteUrl, 
  loadSpriteUrl,
  getPokemonNames,
  getPokemonsInPage,
  parsePokemonName,
  getPokemonSkills,
  getPokemonStats,
  getPokemonTypes,
  getPokemonAdvantage,
  getPokemonGenus,
  getDescription,
  getBackgroundStyle,
  getBackgroundTexture,
  getAdvantageImage,
  getTypeImage,
  backgroundChart,
  advantageChart,
} from "./pokemonDataHandlers";
import {
  convertDecimeterToFeet,
  convertGramToLb,
  randomizeNumber,
} from "./general";
import pokemonTypeImage from "../assets/img/pokemon-type/index";
import textures from "../assets/img/modal-texture/index";

function getRandomPokemon(pokemonsCount, pokemonList) {
  if(pokemonList === undefined || pokemonList === null || !pokemonList.length) return undefined;
  const randomNumber = randomizeNumber(pokemonsCount);
  const randomPokemon = randomNumber < pokemonList.length ? pokemonList[randomNumber] : undefined;

  return randomPokemon;
};

async function getPokemonSprites(pokemons) {
  const sprites = await Promise.all(pokemons.map(async (pokemon) => {
    const id = pokemon.url.split('/')[6];
    const spriteUrl = getSpriteUrl(id);
    const sprite =  await loadSpriteUrl(spriteUrl);
  
    return sprite;
  }));
    
  return sprites; 
};

function parsePokemonData(pokemon, species) {
  const id = pokemon.id;
  const fullName = pokemon.name;
  const name = parsePokemonName(pokemon.name);
  const skills = getPokemonSkills(pokemon.abilities);
  const stats = getPokemonStats(pokemon.stats);
  const types = getPokemonTypes(pokemon.types);
  const height = convertDecimeterToFeet(pokemon.height);
  const weight = convertGramToLb(pokemon.weight);
  const typeAdvantage = getPokemonAdvantage(types.mainType, advantageChart);
  const evolutionGenus = getPokemonGenus(species);
  const description = getDescription(species.flavor_text_entries, "en");
  const backgroundStyle = getBackgroundStyle(types, backgroundChart);
  const backgroundTexture = getBackgroundTexture(types, textures);
  const advantageImage = getAdvantageImage(typeAdvantage, pokemonTypeImage);
  const typeImage = getTypeImage(types, pokemonTypeImage);
  
  const pokemonData = {
    id,
    fullName,
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

export { getRandomPokemon, getPokemonSprites, parsePokemonData };