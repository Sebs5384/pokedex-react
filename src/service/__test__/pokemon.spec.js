import {
    getPokemons,
    getPokemon,
    getPokemonSpecies,
    getPokemonSprite
} from "../pokemon";
import {
    getPokemons as getPokemonsFromApi,
    getPokemon as getPokemonFromApi,
    getPokemonSpecies as getPokemonSpeciesFromApi,
    getPokemonSprite as getPokemonSpriteFromApi
} from "../../api/pokemon";
import {
    loadPokemons as loadPokemonsFromStorage,
    loadPokemon as loadPokemonFromStorage,
    loadPokemonSpecies as loadPokemonSpeciesFromStorage,
    loadPokemonSprite as loadPokemonSpriteFromStorage,
    storePokemons,
    storePokemon,
    storeSpecies,
    storePokemonSprite,
    loadPokemon,
} from "../../storage/pokemon";
import {
    loadSpriteUrl,
    getSpriteUrl,
} from "../../utils/pokemonDataHandlers";

jest.mock("../../storage/pokemon", () => ({
    ...jest.requireActual("../../storage/pokemon"),
    loadPokemons: jest.fn(),
    loadPokemon: jest.fn(),
    loadPokemonSpecies: jest.fn(),
    loadPokemonSprite: jest.fn(),
    storePokemons: jest.fn(),
    storePokemon: jest.fn(),
    storeSpecies: jest.fn(),
    storePokemonSprite: jest.fn(),
}));
jest.mock("../../api/pokemon", () => ({
    ...jest.requireActual("../../api/pokemon"),
    getPokemons: jest.fn(),
    getPokemon: jest.fn(),
    getPokemonSpecies: jest.fn(),
    getPokemonSprite: jest.fn(),
}));
jest.mock("../../utils/pokemonDataHandlers", () => ({
    ...jest.requireActual("../../utils/pokemonDataHandlers"),
    loadSpriteUrl: jest.fn(),
    getSpriteUrl: jest.fn(),
}));


describe("getPokemons", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("Should use getPokemons service function to return a list of pokemons from local storage", async () => {
        const limit = 10;
        const offset = 0;
        const pokemons = [{ name: "testmeleon" }];

        loadPokemonsFromStorage.mockReturnValue(pokemons);
        const result = await getPokemons(limit, offset);

        expect(loadPokemonsFromStorage).toHaveBeenCalledTimes(1);
        expect(loadPokemonsFromStorage).toHaveBeenCalledWith(limit, offset);
        expect(result).toEqual(pokemons);
    });

    it("Should fallback to the API if the local storage is empty", async () => {
        const limit = 10;
        const offset = 0;
        const pokemons = [{ name: "testmeleon" }];

        loadPokemonsFromStorage.mockImplementation(() => {
            throw new Error("Storage error");
        });
        getPokemonsFromApi.mockReturnValue(pokemons);
        const results = await getPokemons(limit, offset);

        expect(loadPokemonsFromStorage).toHaveBeenCalledTimes(1);
        expect(loadPokemonsFromStorage).toHaveBeenCalledWith(limit, offset);
        expect(getPokemonsFromApi).toHaveBeenCalledTimes(1);
        expect(getPokemonsFromApi).toHaveBeenCalledWith(limit, offset);
        expect(results).toEqual(pokemons);
    });
});

describe("getPokemon", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("Should use getPokemon service function to return a pokemon from local storage", async () => {
        const name = "testmeleon";
        loadPokemonFromStorage.mockReturnValue({name: "testmeleon", id: 1});
        const result = await getPokemon(name);

        expect(loadPokemonFromStorage).toHaveBeenCalledTimes(1);
        expect(loadPokemonFromStorage).toHaveBeenCalledWith(name);
        expect(result).toEqual({name: "testmeleon", id: 1});
    });

    it("Should fallback to the API if the local storage is empty", async () => {
        const name = "testmeleon";
        loadPokemonFromStorage.mockImplementation(() => {
            throw new Error("Storage error");
        });
        getPokemonFromApi.mockReturnValue({name: "testmeleon", id: 1});
        const result = await getPokemon(name);

        expect(loadPokemonFromStorage).toHaveBeenCalledTimes(1);
        expect(loadPokemonFromStorage).toHaveBeenCalledWith(name);
        expect(getPokemonFromApi).toHaveBeenCalledTimes(1);
        expect(getPokemonFromApi).toHaveBeenCalledWith(name);
        expect(result).toEqual({name: "testmeleon", id: 1});
    });

    it("Should clear the localStorage on QuotaExceedError and still return a Pokemon", async () => {
        const name = "testmeleon";
        loadPokemonFromStorage.mockImplementation(() => {
            throw new Error("QuotaExceededError");
        });
        getPokemonFromApi.mockReturnValue({name: "testmeleon", id: 1});
        storePokemon.mockImplementation(() => {
            const error = new Error("QuotaExceededError");
            error.name = "QuotaExceededError";
            throw error;
        });
        const clearItemsMock = jest.spyOn(Storage.prototype, "clear").mockImplementation(() => {});
        const result = await getPokemon(name);

        expect(loadPokemonFromStorage).toHaveBeenCalledTimes(1);
        expect(loadPokemonFromStorage).toHaveBeenCalledWith(name);
        expect(getPokemonFromApi).toHaveBeenCalledTimes(1);
        expect(getPokemonFromApi).toHaveBeenCalledWith(name);
        expect(storePokemon).toHaveBeenCalledTimes(1);
        expect(storePokemon).toHaveBeenCalledWith(name, {name: "testmeleon", id: 1});
        expect(clearItemsMock).toHaveBeenCalledTimes(1);
        expect(result).toEqual({name: "testmeleon", id: 1});
    });
});

describe("getPokemonSpecies", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("Should use getPokemonSpecies service function to return a pokemon species from local storage", async () => {
        const name = "testmeleon";
        loadPokemonSpeciesFromStorage.mockReturnValue({name: "testmeleon", id: 1});
        const result = await getPokemonSpecies(name);

        expect(loadPokemonSpeciesFromStorage).toHaveBeenCalledTimes(1);
        expect(loadPokemonSpeciesFromStorage).toHaveBeenCalledWith(name);
        expect(result).toEqual({name: "testmeleon", id: 1});
    });

    it("Should fallback to the API if the local storage is empty", async () => {
        const name = "testmeleon";
        const completeName = "testmeleon-test";
        loadPokemonSpeciesFromStorage.mockImplementation(() => {
            throw new Error("Storage error");
        });
        getPokemonSpeciesFromApi.mockReturnValue({name: "testmeleon", id: 1});
        const result = await getPokemonSpecies(name, completeName);

        expect(loadPokemonSpeciesFromStorage).toHaveBeenCalledTimes(1);
        expect(loadPokemonSpeciesFromStorage).toHaveBeenCalledWith(name);
        expect(getPokemonSpeciesFromApi).toHaveBeenCalledTimes(1);
        expect(getPokemonSpeciesFromApi).toHaveBeenCalledWith(name, completeName);
        expect(result).toEqual({name: "testmeleon", id: 1});
    });
});

describe("getPokemonSprite", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("Should use getPokemonSprite service function to return a pokemon sprite from local storage", async () => {
        const pokemon = { name: "testmeleon", id: 1 };
        const artwork = "some-random-artwork";
        loadPokemonSpriteFromStorage.mockReturnValue({ current: "https://mocked-sprite-url//1.png", previous: null });
        const result = await getPokemonSprite(pokemon, artwork);

        expect(loadPokemonSpriteFromStorage).toHaveBeenCalledTimes(1);
        expect(loadPokemonSpriteFromStorage).toHaveBeenCalledWith(pokemon, artwork);
        expect(result).toEqual({ current: "https://mocked-sprite-url//1.png", previous: null });
    });

    it("Should load the sprite from the URL if the local storage is empty", async () => {
        const pokemon = { name: "testmeleon", id: 1 };
        loadPokemonSpriteFromStorage.mockImplementation(() => {
            throw new Error("Storage error");
        });
        getPokemonSpriteFromApi.mockReturnValue({ current: "https://mocked-sprite-url//1.png", previous: null });
        const result = await getPokemonSprite(pokemon);

        expect(loadPokemonSpriteFromStorage).toHaveBeenCalledTimes(1);
        expect(loadPokemonSpriteFromStorage).toHaveBeenCalledWith(pokemon, "");
        expect(getPokemonSpriteFromApi).toHaveBeenCalledTimes(1);
        expect(getPokemonSpriteFromApi).toHaveBeenCalledWith(pokemon, "", getSpriteUrl, loadSpriteUrl);
        expect(result).toEqual({ current: "https://mocked-sprite-url//1.png", previous: null });
    });
});