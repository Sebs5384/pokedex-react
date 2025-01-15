import { 
    getSpriteUrl, 
    loadSpriteUrl,
} from "../pokemonDataHandlers";
import { 
    randomizeNumber 
} from "../general";
import { 
    getPokemonSprites, 
    getRandomPokemon, 
} from "../pokemon";

jest.mock("../pokemonDataHandlers", () => ({
    getSpriteUrl: jest.fn(),
    loadSpriteUrl: jest.fn(),
}));
jest.mock("../general", () => ({
    ...jest.requireActual("../general"),
    randomizeNumber: jest.fn(),
}));
jest.mock("../../assets/img/pokemon-type/index", () => jest.fn());
jest.mock("../../assets/img/modal-texture/index", () => jest.fn());

describe("getPokemonSprites", () => {
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
        jest.restoreAllMocks();
    });

    it("Should get the pokemon sprites correctly", async () => {
        const pokemonsUrl = [
            { url: "https://some.random/api/v2/test/1/" },
        ];
        getSpriteUrl.mockReturnValue("https://some.random/api/v2/test/1/");
        loadSpriteUrl.mockResolvedValue("https://some.random/api/v2/test/1/");

        const pokemonSprites = await getPokemonSprites(pokemonsUrl);
        
        expect(getSpriteUrl).toHaveBeenCalledTimes(1);
        expect(loadSpriteUrl).toHaveBeenCalledTimes(1);
        expect(getSpriteUrl).toHaveBeenCalledWith("1");
        expect(loadSpriteUrl).toHaveBeenCalledWith("https://some.random/api/v2/test/1/");
        expect(pokemonSprites).toEqual(["https://some.random/api/v2/test/1/"]);
    });

    it("Should return an empty array when the parameters are undefined or null", async () =>  {
        let pokemonsUrl = null;
        let pokemonSprites = await getPokemonSprites(pokemonsUrl);

        expect(pokemonSprites).toEqual([]);

        pokemonsUrl = undefined;
        pokemonSprites = await getPokemonSprites(pokemonsUrl);

        expect(pokemonSprites).toEqual([]);
        expect(getSpriteUrl).not.toHaveBeenCalled();
        expect(loadSpriteUrl).not.toHaveBeenCalled();
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