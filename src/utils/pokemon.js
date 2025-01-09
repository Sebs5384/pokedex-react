import { getSpriteUrl, loadSpriteUrl } from "./pokemonDataHandlers";
import { randomizeNumber } from "./general";

function getRandomPokemon(pokemonsCount, pokemonList) {
  if(pokemonList === undefined || pokemonList === null || !pokemonList.length) return undefined;
  const randomNumber = randomizeNumber(pokemonsCount);
  const randomPokemon = randomNumber < pokemonList.length ? pokemonList[randomNumber] : undefined;

  return randomPokemon;
};

async function getPokemonSprites(pokemons) {
  if(pokemons === undefined || pokemons === null) return [];

  const sprites = await Promise.all(pokemons.map(async (pokemon) => {
    const id = pokemon.url.split('/')[6];
    const spriteUrl = getSpriteUrl(id);
    const sprite =  await loadSpriteUrl(spriteUrl);
  
    return sprite;
  }));
    
  return sprites; 
};

export { getRandomPokemon, getPokemonSprites };