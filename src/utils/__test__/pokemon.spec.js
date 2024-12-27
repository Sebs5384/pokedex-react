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
} from "../pokemonDataHandlers";
import { 
    getPokemonSprites, 
    getRandomPokemon, 
    parsePokemonData 
} from "../pokemon";
import { 
    convertDecimeterToFeet, 
    convertGramToLb, 
    randomizeNumber 
} from "../general";
import pokemonTypeImage from "../../assets/img/pokemon-type/index";
import textures from "../../assets/img/modal-texture/index";

jest.mock("../pokemonDataHandlers", () => ({
    getSpriteUrl: jest.fn(),
    loadSpriteUrl: jest.fn(),
    getPokemonNames: jest.fn(),
    getPokemonsInPage: jest.fn(),
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
}));
jest.mock("../general", () => ({
    ...jest.requireActual("../general"),
    randomizeNumber: jest.fn(),
    convertDecimeterToFeet: jest.fn(),
    convertGramToLb: jest.fn(),
}));
jest.mock("../../assets/img/pokemon-type/index", () => jest.fn());
jest.mock("../../assets/img/modal-texture/index", () => jest.fn());

describe("getRandomPokemon", () => {
    it("Should get a random pokemon off the list", () => {
        const pokemonCount = 3;
        const pokemonList = ["Testsaur", "Testrtle", "Testmeleon"];       
        const randomIndex = 2;
        randomizeNumber.mockReturnValue(randomIndex);

        const randomPokemon = getRandomPokemon(pokemonCount, pokemonList);

        expect(randomizeNumber).toHaveBeenCalledWith(3);
        expect(randomPokemon).toEqual("Testmeleon");
    });

    it("Should return undefined if the random number is greater than the pokemon list length", () => {
        const pokemonCount = 3;
        const pokemonList = ["Testsaur", "Testrtle"];
        const randomIndex = 3;
        randomizeNumber.mockReturnValue(randomIndex);

        const randomPokemon = getRandomPokemon(pokemonCount, pokemonList);

        expect(randomizeNumber).toHaveBeenCalledWith(3);
        expect(randomPokemon).toEqual(undefined);
    });

    it("Should return undefined if pokemonList is undefined, null or has no length", () => {
        const pokemonCount = 3;
        let pokemonList = undefined;

        let randomPokemon = getRandomPokemon(pokemonCount, pokemonList);
        expect(randomPokemon).toEqual(undefined);

        pokemonList = null;
        randomPokemon = getRandomPokemon(pokemonCount, pokemonList);
        expect(randomPokemon).toEqual(undefined);

        pokemonList = [];
        randomPokemon = getRandomPokemon(pokemonCount, pokemonList);
        expect(randomPokemon).toEqual(undefined);
    });
});

describe("parsePokemonData", () => {
    it("Should parse the pokemon data correctly through its helper functions", () => {    
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

        const parsedPokemon = parsePokemonData(pokemonData, speciesData);

        expect(parsePokemonName).toHaveBeenCalledTimes(1);
        expect(getPokemonSkills).toHaveBeenCalledTimes(1);
        expect(getPokemonStats).toHaveBeenCalledTimes(1);
        expect(getPokemonTypes).toHaveBeenCalledTimes(1);
        expect(convertDecimeterToFeet).toHaveBeenCalledTimes(1);
        expect(convertGramToLb).toHaveBeenCalledTimes(1);
        expect(getPokemonAdvantage).toHaveBeenCalledTimes(1);
        expect(getPokemonGenus).toHaveBeenCalledTimes(1);
        expect(getDescription).toHaveBeenCalledTimes(1);
        expect(getBackgroundStyle).toHaveBeenCalledTimes(1);
        expect(getBackgroundTexture).toHaveBeenCalledTimes(1);
        expect(getAdvantageImage).toHaveBeenCalledTimes(1);
        expect(getTypeImage).toHaveBeenCalledTimes(1);
        expect(parsePokemonName).toHaveBeenCalledWith(pokemonData.name);
        expect(getPokemonSkills).toHaveBeenCalledWith(pokemonData.abilities);
        expect(getPokemonStats).toHaveBeenCalledWith(pokemonData.stats);
        expect(getPokemonTypes).toHaveBeenCalledWith(pokemonData.types);
        expect(convertDecimeterToFeet).toHaveBeenCalledWith(pokemonData.height);
        expect(convertGramToLb).toHaveBeenCalledWith(pokemonData.weight);
        expect(getPokemonAdvantage).toHaveBeenCalledWith("test", advantageChart);
        expect(getPokemonGenus).toHaveBeenCalledWith(speciesData);
        expect(getDescription).toHaveBeenCalledWith(speciesData.flavor_text_entries, "en");
        expect(getBackgroundStyle).toHaveBeenCalledWith({"mainType": "test", "secondaryType": "unit"}, backgroundChart);
        expect(getBackgroundTexture).toHaveBeenCalledWith({"mainType": "test", "secondaryType": "unit"}, textures);
        expect(getAdvantageImage).toHaveBeenCalledWith({ weakness: "SPHAGETTI", resistance: "FLAKY" }, pokemonTypeImage);
        expect(getTypeImage).toHaveBeenCalledWith({"mainType": "test", "secondaryType": "unit"}, pokemonTypeImage);

        expect(parsedPokemon).toEqual({
            id: 2,
            fullName: "Testmeleon",
            name: "Testmeleon",
            skills: { firstSkill: "SOLID", secondSkill: "DRY" },
            stats: { hp: 1, attack: 2, defense: 3, specialAttack: 4, specialDefense: 5, speed: 6 },
            types: { mainType: "test", secondaryType: "unit" },
            height: "3'28",
            weight: "2.20",
            typeAdvantage: { weakness: "SPHAGETTI", resistance: "FLAKY" },
            evolutionGenus: { name: "Evolves from Testmander", id: "1", genus: "Test Pokemon" },
            description: "A blazing test case is on its tail",
            backgroundStyle: "some-background-style",
            backgroundTexture: "some-background-texture",
            advantageImage: "some-advantage-image",
            typeImage: "some-type-image"
        });
    });
});