import {
    parsePokemonName,
    getPokemonSkills,
    getPokemonStats,
    getPokemonTypes,
    getPokemonAdvantage,
    getPokemonGenus,
    getDescription,
    getSpriteUrl,
    loadSpriteUrl,
    getBackgroundStyle,
    getBackgroundTexture,
    getAdvantageImage,
    getTypeImage,
    backgroundChart,
    advantageChart,
} from "../utils/pokemonDataHandlers";
import { convertDecimeterToFeet, convertGramToLb } from "../utils/general";
import pokemonTypeImage from "../assets/img/pokemon-type/index";
import textures from "../assets/img/modal-texture/index";

class Pokemon {
    constructor(pokemon, species) {
        this.id = pokemon.id;
        this.fullName = pokemon.name;
        this.name = parsePokemonName(pokemon.name);
        this.skills = getPokemonSkills(pokemon.abilities);
        this.stats = getPokemonStats(pokemon.stats);
        this.types = getPokemonTypes(pokemon.types);
        this.height = convertDecimeterToFeet(pokemon.height);
        this.weight = convertGramToLb(pokemon.weight);
        this.typeAdvantage = getPokemonAdvantage(this.types.mainType, advantageChart);
        this.evolutionGenus = getPokemonGenus(species);
        this.description = getDescription(species.flavor_text_entries, "en");
        this.backgroundStyle = getBackgroundStyle(this.types, backgroundChart);
        this.backgroundTexture = getBackgroundTexture(this.types, textures);
        this.advantageImage = getAdvantageImage(this.typeAdvantage, pokemonTypeImage);
        this.typeImage = getTypeImage(this.types, pokemonTypeImage);
    };
};

export default Pokemon;