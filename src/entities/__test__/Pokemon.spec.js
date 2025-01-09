import {
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
} from "../../utils/pokemonDataHandlers";
import { convertDecimeterToFeet, convertGramToLb } from "../../utils/general";
import pokemonTypeImage from "../../assets/img/pokemon-type/index";
import textures from "../../assets/img/modal-texture/index";
import Pokemon from "../Pokemon";

jest.mock("../../utils/pokemonDataHandlers", () => ({
   parsePokemonName: jest.fn(),
   getPokemonSkills: jest.fn(),
   getPokemonStats: jest.fn(),
   getPokemonTypes: jest.fn(),
   getPokemonAdvantage: jest.fn(),
   getPokemonGenus: jest.fn(),
   getDescription: jest.fn(),
   getBackgroundStyle: jest.fn(),
   getBackgroundTexture: jest.fn(),
   getAdvantageImage: jest.fn(),
   getTypeImage: jest.fn(),
   backgroundChart: jest.fn(),
   advantageChart: jest.fn(),
   getAdvantageImage: jest.fn(),
}));
jest.mock("../../utils/general", () => ({
    convertDecimeterToFeet: jest.fn(),
    convertGramToLb: jest.fn(),
}));
jest.mock("../../assets/img/pokemon-type/index", () => jest.fn());
jest.mock("../../assets/img/modal-texture/index", () => jest.fn());

describe("Pokemon", () => {
    beforeEach(() => {
        parsePokemonName.mockReturnValue("Testmeleon");
        getPokemonSkills.mockReturnValue({ firstSkill: "SOLID", secondSkill: "DRY" });
        getPokemonStats.mockReturnValue({ hp: 1, attack: 2, defense: 3, specialAttack: 4, specialDefense: 5, speed: 6 });
        getPokemonTypes.mockReturnValue({ mainType: "test", secondaryType: "unit" });
        convertDecimeterToFeet.mockReturnValue("3'28");
        convertGramToLb.mockReturnValue("2.20");
        getPokemonAdvantage.mockReturnValue({ weakness: "SPHAGETTI", resistance: "FLAKY" });
        getPokemonGenus.mockReturnValue({ name: "Evolves from Testmander", id: "1", genus: "Test Pokemon" });
        getDescription.mockReturnValue("A blazing test case is on its tail");
        getBackgroundStyle.mockReturnValue("some-background-style");
        getBackgroundTexture.mockReturnValue("some-background-texture");
        getAdvantageImage.mockReturnValue("some-advantage-image");
        getTypeImage.mockReturnValue("some-type-image");
        advantageChart.mockReturnValue({ test: { weakness: "SPHAGETTI", resistance: "FLAKY" } });
        backgroundChart.mockReturnValue({ test: "some-background-style" });
        pokemonTypeImage.mockReturnValue("some-type-image");
        textures.mockReturnValue("some-background-texture");
    });

    const pokemonData = {
        id: 2,
        name: "Testmeleon",
        types: [{ type: { name: "test" } }, { type: { name: "unit" } }],
        abilities: [{ ability: { name: "SOLID" } }, { ability: { name: "DRY" } }],
        height: 10,
        weight: 20,
        stats: [{ base_stat: 1 }, { base_stat: 2 }, { base_stat: 3 }, { base_stat: 4 }, { base_stat: 5 }, { base_stat: 6 }],
    };
    const speciesData = {
        evolves_from_species: { name: "Testmander", url: "https://pokeapi.co/api/v2/mocked-url/1/" },
        flavor_text_entries: [{ flavor_text: "A blazing test is on its tail", language: { name: "en" } }],
        genera: [{ genus: "Test Pokemon", language: { name: "en" } }],
    };

    it("Should instantiate a Pokemon and return the correct values", () => {
        const pokemon = new Pokemon(pokemonData, speciesData);

        expect(pokemon.id).toBe(2);
        expect(pokemon.fullName).toBe("Testmeleon");
        expect(pokemon.name).toBe("Testmeleon");
        expect(pokemon.skills).toEqual({ firstSkill: "SOLID", secondSkill: "DRY" });
        expect(pokemon.stats).toEqual({ hp: 1, attack: 2, defense: 3, specialAttack: 4, specialDefense: 5, speed: 6 });
        expect(pokemon.types).toEqual({ mainType: "test", secondaryType: "unit" });
        expect(pokemon.height).toBe("3'28");
        expect(pokemon.weight).toBe("2.20");
        expect(pokemon.typeAdvantage).toEqual({ weakness: "SPHAGETTI", resistance: "FLAKY" });
        expect(pokemon.evolutionGenus).toEqual({ name: "Evolves from Testmander", id: "1", genus: "Test Pokemon" });
        expect(pokemon.description).toBe("A blazing test case is on its tail");
        expect(pokemon.backgroundStyle).toBe("some-background-style");
        expect(pokemon.backgroundTexture).toBe("some-background-texture");
        expect(pokemon.advantageImage).toBe("some-advantage-image");
        expect(pokemon.typeImage).toBe("some-type-image");
    });
});