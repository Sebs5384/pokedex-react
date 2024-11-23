<reference types="Jest" />

import {
    getPokemonNames,
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
    getRandomPokemon,
    getPokemonsInPage,
    parsePokemonData
} from "../pokemon";
import {
    randomizeNumber,
} from "../general";

jest.mock("../general", () => ({
    ...jest.requireActual("../general"),
    randomizeNumber: jest.fn(),
}));

describe("getPokemonNames", () => {
    it("Should return the name of a pokemon", () => {
        const pokemon = [{
            name: "Testmeleon",
        }];
        const pokemonName = getPokemonNames(pokemon);
        expect(pokemonName).toEqual(["Testmeleon"]);
    });

    it("Should return an empty array if the pokemon parameter is null or undefined", () => {
        let pokemon = null;
        let pokemonName = getPokemonNames(pokemon);
        expect(pokemonName).toEqual([]);

        pokemon = undefined;
        pokemonName = getPokemonNames(pokemon);
        expect(pokemonName).toEqual([]);
    });

    it("Should handle multiple pokemons", () => {
        const pokemons = [
            { name: "Testmeleon" },
            { name: "Testmeleon2" },
            { name: "Testmeleon3" },
            { name: "Testmeleon4" },
            { name: "Testmeleon5" },
        ];

        const pokemonNames = getPokemonNames(pokemons);
        expect(pokemonNames).toEqual(["Testmeleon", "Testmeleon2", "Testmeleon3", "Testmeleon4", "Testmeleon5"]);
    });
});

describe("parsePokemonName", () => {
    it("Should parse a pokemon name and return its first word", () => {
        const pokemonName = "Testmeleon-test";
        const parsedName = parsePokemonName(pokemonName);

        expect(parsedName).toEqual("Testmeleon");
    });

    it("Should parse a pokemon name and return both words if the name is equal to two letters", () => {
        const pokemonName = "Te-st";
        const parsedName = parsePokemonName(pokemonName);

        expect(parsedName).toEqual("Te-st");
    });

    it("Should parse a pokemon name without a hyphen", () => {
        const pokemonName = "Testmeleon";
        const parsedName = parsePokemonName(pokemonName);

        expect(parsedName).toEqual("Testmeleon");
    });

    it("Should parse pokemons with two letters or less", () => {
        const pokemonName = "Te";
        const parsedName = parsePokemonName(pokemonName);

        expect(parsedName).toEqual("Te");
    });

    it("Should return an empty string if undefined or null is passed as parameter", () => {
        let pokemonName = null;
        let parsedName = parsePokemonName(pokemonName);
        expect(parsedName).toEqual("");

        pokemonName = undefined;
        parsedName = parsePokemonName(pokemonName);
        expect(parsedName).toEqual("");
    });
});

describe("getPokemonSkills", () => {
    it("Should return the first and second skill of a pokemon", () => {
        const skills = [
            { ability: { name: "skill1" } },
            { ability: { name: "skill2" } },
        ];

        const pokemonSkills = getPokemonSkills(skills);
        expect(pokemonSkills).toEqual({
            firstSkill: "skill1",
            secondSkill: "skill2",
        });
    });

    it("Should return an undefined value if the pokemon has only one skill", () => {
        const skills = [
            { ability: { name: "skill1" } },
            undefined,
        ];

        const pokemonSkills = getPokemonSkills(skills);
        expect(pokemonSkills).toEqual({
            firstSkill: "skill1",
            secondSkill: undefined,
        });
    });

    it("Should return an empty object if the pokemon has no skills", () => {
        let pokemonSkills = getPokemonSkills(undefined);
        expect(pokemonSkills).toEqual({}); 
    
        pokemonSkills = getPokemonSkills(null);
        expect(pokemonSkills).toEqual({});
    });
});

describe("getPokemonStats", () => {
    it("Should return the pokemon stats", () => {
        const stats = [
            {base_stat: 1},
            {base_stat: 2},
            {base_stat: 3},
            {base_stat: 4},
            {base_stat: 5},
            {base_stat: 6},
        ];
        const pokemonStats = getPokemonStats(stats);

        expect(pokemonStats).toEqual({
            hp: '1 HP',
            atk: 'ATTACK: 2',
            def: 'DEFENSE: 3',
            spAtk: 'SP ATK: 4',
            spDef: 'SP DEF: 5',
            speed: 'SPEED: 6'
        });
    });

    it("Should return empty values if the pokemon stats are undefined", () => {
        const stats = [
            {base_stat: undefined},
            {base_stat: undefined},
            {base_stat: undefined},
            {base_stat: undefined},
            {base_stat: undefined},
            {base_stat: undefined},
        ];

        const pokemonStats = getPokemonStats(stats);
        expect(pokemonStats).toEqual({
            hp: "",
            atk: "",
            def: "",
            spAtk: "",
            spDef: "",
            speed: ""
        });
    });

    it("Should return an empty object if the stats parameter is null or undefined", () => {
        let pokemonStats = getPokemonStats(null);
        expect(pokemonStats).toEqual({});

        pokemonStats = getPokemonStats(undefined);
        expect(pokemonStats).toEqual({});
    });
});

describe("getPokemonTypes", () => {
    it("Should return the pokemon types", () => {
        const types = [
            { type: {name: "fire"} },
            { type: {name: "water"} },
        ];

        const pokemonTypes = getPokemonTypes(types);
        expect(pokemonTypes).toEqual({
            mainType: "fire",
            secondaryType: "water"
        });
    });

    it("Should return an empty value if the pokemon has only one type", () => {
        const types = [
            { type: {name: "fire"} },
            undefined,
        ];

        const pokemonTypes = getPokemonTypes(types);
        expect(pokemonTypes).toEqual({
            mainType: "fire",
            secondaryType: undefined
        });
    });

    it("Should return an empty object if the types parameter is null or undefined", () => {
        let pokemonTypes = getPokemonTypes(null);
        expect(pokemonTypes).toEqual({});

        pokemonTypes = getPokemonTypes(undefined);
        expect(pokemonTypes).toEqual({});
    });
});

describe("getPokemonAdvantage", () => {
    it("Should get the pokemon advantage", () => {
        const chart = {
            bug: { resistance: 'Spaghetti', weakness: 'Test' },
        };
        const type = "bug";

        const advantage = getPokemonAdvantage(type, chart);
        expect(advantage).toEqual({
            resistance: 'Spaghetti',
            weakness: 'Test'
        });
    });

    it("Should return an empty object if the type parameter is null or undefined", () => {
        const advantage = getPokemonAdvantage(null, {});
        expect(advantage).toEqual({});
    });
});

describe("getPokemonGenus", () => {
    it("Should return the pokemon genus", () => {
        const species = {
            evolves_from_species: {
                name: "Testmander",
                url: "https://pokeapi.co/api/v2/pokemon-species/1/",
            },
            genera: [{
                genus : "Test Pokemon",
                language: {
                    name: "en",
                },
            }]
        };

        const pokemonGenus = getPokemonGenus(species);
        expect(pokemonGenus).toEqual({
            name: "Evolves from Testmander",
            id: "1",
            genus: "Test Pokemon",
        });
    });

    it("Should return default values if the pokemon has no previous evolution", () => {
        const species = {
            evolves_from_species: null,
            genera: [{
                genus : "Test Pokemon",
                language: {
                    name: "en",
                },
            }]
        };
        
        const pokemonGenus = getPokemonGenus(species);
        expect(pokemonGenus).toEqual({
            name: "Basic Pokemon",
            id: "None",
            genus: "Test Pokemon",
        });
    });

    it("Should return an empty string if genera is null", () => {
        const species = {
            evolves_from_species: null,
            genera: null,
        };

        const pokemonGenus = getPokemonGenus(species);
        expect(pokemonGenus).toEqual({
            name: "Basic Pokemon",
            id: "None",
            genus: "",
        });
    });

    it("Should return an empty object if the species parameter is null or undefined", () => {
        let pokemonGenus = getPokemonGenus(null);
        expect(pokemonGenus).toEqual({});

        pokemonGenus = getPokemonGenus(undefined);
        expect(pokemonGenus).toEqual({});
    });
});

describe("getDescription", () => {
    it("Should return the pokemon description", () => {
        const pokemonTextEntries = [{
            flavor_text: "Test\ndescription",
            language: {
                name: "en",
            },
        }];

        const description = getDescription(pokemonTextEntries, "en");
        expect(description).toEqual("Test description");
    });

    it("Should return an empty string if the textEntry is undefined", () => {
        const pokemonTextEntries = [{
            flavor_text: "Test\ndescription",
            language: {
                name: "en",
            }
        }];

        const description = getDescription(pokemonTextEntries, "eeee");
        expect(description).toEqual("");
    });

    it("Should return an empty string if the entry parameter is undefined or null", () => {
        let description = getDescription(null, "en");
        expect(description).toEqual("");

        description = getDescription(undefined, "en");
        expect(description).toEqual("");
    });

    it("Should return the english description if language is undefined", () => {
        const pokemonTextEntries = [{
            flavor_text: "Test\ndescription",
            language: {
                name: "en",
            }
        }];

        const description = getDescription(pokemonTextEntries, undefined);
        expect(description).toEqual("Test description");
    });
});

describe("getSpriteUrl", () => {
    it("Should return the pokemon sprite url", () => {
        const id = 1;
        const artwork = "artwork";

        const spriteUrl = getSpriteUrl(id, artwork);
        expect(spriteUrl).toEqual("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/artwork/1.png");
    });

    it("Should return the pokemon sprite url without artwork if its not defined", () => {
        const id = 1;

        const spriteUrl = getSpriteUrl(id, undefined);
        expect(spriteUrl).toEqual("https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon//1.png");
    });

    it("Should return an empty string if the id is null or undefined", () => {
        let spriteUrl = getSpriteUrl(null, "artwork");
        expect(spriteUrl).toEqual("");

        spriteUrl = getSpriteUrl(undefined, "artwork");
        expect(spriteUrl).toEqual("");
    });
});

describe("loadSprite", () => {
    jest.mock("../../assets/img/misc/404-shocked.png", () => ({
        default: "fallback-image.png",
    }));

    beforeEach(() => {
        global.Image = class {
            constructor() {
                setTimeout(() => {
                    if(this.src) {
                        this.onload();
                    } else {
                        this.onerror();
                    };
                }, 0);
            };
        };
    });

    afterEach(() => {
        delete global.Image;
    });
    
    it("Should load the sprite", async () => {
        const spriteUrl = "https://some-random-mocked-sprite-url/1.png";
        const loadedSprite = await loadSpriteUrl(spriteUrl);

        expect(loadedSprite).toEqual(spriteUrl);
    });

    it("Should load the fallback image if the sprite is not found", async () => {
        const spriteUrl = undefined;
        const loadedSprite = await loadSpriteUrl(spriteUrl);

        expect(loadedSprite).toEqual({ "default": "fallback-image.png" });
    });
});

describe("getPokemonsInPage", () => {
    it("Should return the pokemons in the page", async () => {
        const pokemons = {
            results: [
                { name: "Testmeleon", url: "https://pokeapi.co/api/v2/pokemon/1/" },
            ]
        }
        const sprites = [
            "https://some-mock.png",
        ];

        const pokemonsInPage = await getPokemonsInPage(pokemons, sprites);
        expect(pokemonsInPage).toEqual([
            { "name": "Testmeleon", "id": 1, "sprite": "https://some-mock.png", }
        ]);
    });

    it("Should return empty strings if name and url are undefined", async () => {
        const pokemons = {
            results: [
                { name: undefined, url: undefined },
            ],
        };
        const sprites = [
            "https://some-mock.png",
        ];

        const pokemonsInPage = await getPokemonsInPage(pokemons, sprites);
        expect(pokemonsInPage).toEqual([
            { "name": "", "id": "", "sprite": "https://some-mock.png" },
        ]);
    });

    it("Should return an empty array if the pokemons parameter is undefined", async () => {
        let pokemons = undefined;
        const sprites = [
            "https://some-mock.png",
        ];

        let pokemonsInPage = await getPokemonsInPage(pokemons, sprites);
        expect(pokemonsInPage).toEqual([]);

        pokemons = null;
        pokemonsInPage = await getPokemonsInPage(pokemons, sprites);
        expect(pokemonsInPage).toEqual([]);
    });
});

describe("getBackgroundStyle", () => {
    it("Should return the background style according to the type", () => {
        const type = {
            mainType: "fire",
        };
        const backgroundChart = {
            fire: "fire",
        };
        
        const backgroundStyle = getBackgroundStyle(type, backgroundChart);
        expect(backgroundStyle).toEqual("fire");
    });

    it("Should return undefined background if types is undefined or null", () => {
        const backgroundChart = {
            fire: "fire",
            undefined: "undefined-background",
        };

        let backgroundStyle = getBackgroundStyle(undefined, backgroundChart);
        expect(backgroundStyle).toEqual("undefined-background");

        backgroundStyle = getBackgroundStyle(null, backgroundChart);
        expect(backgroundStyle).toEqual("undefined-background");
    });
});

describe("getBackgroundTexture", () => {
    it("Should return the background texture according to the type", () => {
        const types = {
            mainType: "fire",
        };
        const textures = {
            fire: "mock-fire-texture.png",
        };

        const backgroundTexture = getBackgroundTexture(types, textures);
        expect(backgroundTexture).toEqual("mock-fire-texture.png");
    });

    it("Should return undefined texture if types is undefined or null", () => {
        let types = undefined;
        const textures = {
            undefined: "mock-undefined-texture.png",
        };

        let backgroundTexture = getBackgroundTexture(types, textures);
        expect(backgroundTexture).toEqual("mock-undefined-texture.png");

        types = null;
        backgroundTexture = getBackgroundTexture(types, textures);
        expect(backgroundTexture).toEqual("mock-undefined-texture.png");
    });
});

describe("getAdvantageImage", () => {
    it("Should return the advantage image according to the type of advantage", () => {
        const typeAdvantage = {
            weakness: "Spaghetti",
            resistance: "SOLID",
        };
        const pokemonTypeImage = {
            Spaghetti: { icon: "mock-spaghetti-icon.png" },
            SOLID: { icon: "mock-solid-icon.png" },
            retreat: { icon: "mock-retreat-icon.png" },
        };

        const advantageImages = getAdvantageImage(typeAdvantage, pokemonTypeImage);
        expect(advantageImages).toEqual({
            weakness: "mock-spaghetti-icon.png",
            resistance: "mock-solid-icon.png",
            retreat: "mock-retreat-icon.png",
        });
    });

    it("Should return the retrat icon as default if typeAdvantage parameter is null or undefined", () => {
        let typeAdvantage = null;
        const pokemonTypeImage = {
            retreat: { icon: "mock-retreat-icon.png" },
        };

        let advantageImages = getAdvantageImage(typeAdvantage, pokemonTypeImage);
        expect(advantageImages).toEqual({
            weakness: "mock-retreat-icon.png",
            resistance: "mock-retreat-icon.png",
            retreat: "mock-retreat-icon.png",
        });

        typeAdvantage = undefined;
        advantageImages = getAdvantageImage(typeAdvantage, pokemonTypeImage);
        expect(advantageImages).toEqual({
            weakness: "mock-retreat-icon.png",
            resistance: "mock-retreat-icon.png",
            retreat: "mock-retreat-icon.png",
        });
    });
});

describe("getTypeImage", () => {
    it("Should get the type image according to the type", () => {
        const types = {
            mainType: "fire",
            secondaryType: "water",
        };
        const pokemonTypeImage = {
            fire: { logo: "mock-fire-logo.png", icon: "mock-fire-icon.png" },
            water: { logo: "mock-water-logo.png", icon: "mock-water-icon.png" },
        };

        const typeImages = getTypeImage(types, pokemonTypeImage);
        expect(typeImages).toEqual({
            mainTypeLogo: "mock-fire-logo.png",
            secondaryTypeLogo: "mock-water-logo.png",
            mainTypeIcon: "mock-fire-icon.png"
        });
    });

    it("Should return the secondary type logo as undefined if the secondary type is undefined", () => {
        const types = {
            mainType: "fire",
            secondaryType: undefined,
        };
        const pokemonTypeImage = {
            fire: { logo: "mock-fire-logo.png", icon: "mock-fire-icon.png" },
            undefined: { logo: "mock-undefined-logo.png", icon: "mock-undefined-icon.png" },
        };

        const typeImages = getTypeImage(types, pokemonTypeImage);
        expect(typeImages).toEqual({
            mainTypeLogo: "mock-fire-logo.png",
            secondaryTypeLogo: "mock-undefined-logo.png",
            mainTypeIcon: "mock-fire-icon.png"
        });
    });

    it("Should return the undefined logo and icon when the type paramater is undefined or null", () => {
        let types = undefined;
        const pokemonTypeImage = {
            undefined: { logo: "mock-undefined-logo.png", icon: "mock-undefined-icon.png" },
        };

        let typeImages = getTypeImage(types, pokemonTypeImage);
        expect(typeImages).toEqual({
            mainTypeLogo: "mock-undefined-logo.png",
            secondaryTypeLogo: "mock-undefined-logo.png",
            mainTypeIcon: "mock-undefined-icon.png"
        });

        types = null;
        typeImages = getTypeImage(types, pokemonTypeImage);
        expect(typeImages).toEqual({
            mainTypeLogo: "mock-undefined-logo.png",
            secondaryTypeLogo: "mock-undefined-logo.png",
            mainTypeIcon: "mock-undefined-icon.png"
        });
    });
});

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
            types: [{ type: { name: "fire" } }, { type: { name: "water" } }],
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

        const parsedPokemon = parsePokemonData(pokemonData, speciesData);
        expect(parsedPokemon).toEqual({
            id: 2,
            fullName: "Testmeleon",
            name: "Testmeleon",
            skills: { firstSkill: "SOLID", secondSkill: "DRY" },
            stats: {
                atk: "ATTACK: 2",
                def: "DEFENSE: 3",
                hp: "1 HP",
                spAtk: "SP ATK: 4",
                spDef: "SP DEF: 5",
                speed: "SPEED: 6",
            },
            types: { mainType: "fire", secondaryType: "water" },
            height: "3'28",
            weight: "0.04",
            typeAdvantage: {
                resistance: "grass",
                weakness: "water",
            },
            evolutionGenus: { name: "Evolves from Testmander", id: "1", genus: "Test Pokemon" },
            description: "A blazing test is on its tail",
            backgroundStyle: "linear-gradient(rgb(36, 17, 17), rgb(117, 28, 28), rgb(248, 141, 1), rgb(255, 0, 0))",
            backgroundTexture: "fire-texture.png",
            advantageImage: {
                weakness: "water-type-icon.png",
                resistance: "grass-type-icon.png",
                retreat: "retreat-icon.png"
            },
            typeImage: {
                mainTypeLogo: "fire-type.png",
                secondaryTypeLogo: "water-type.png",
                mainTypeIcon: "fire-type-icon.png"
            },
        })
    });
});