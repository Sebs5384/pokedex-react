<reference types="Jest" />

import { 
    URL, 
    getPokemon, 
    getPokemons, 
    getPokemonSpecies, 
    getPokemonSprite 
} from '../pokemon';

beforeEach(() => {
    global.fetch = jest.fn();
});

describe("getPokemon", () => {
    it("Should use getPokemon function to fetch a pokemon", async () => {
        const pokemonName = "Testmeleon";
    
        global.fetch.mockImplementationOnce(
            () => 
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({ name: pokemonName }),
                })
        );
    
        const pokemon = await getPokemon(pokemonName);
    
        expect(pokemon).toEqual({ name: pokemonName });
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(`${URL}/pokemon/${pokemonName}`);
    });
    
    it("Should return undefined if the pokemon parameter is null", async () => {
        const pokemonName = null;
        const pokemon = await getPokemon(pokemonName);
    
        expect(pokemon).toEqual(undefined);
        expect(global.fetch).toHaveBeenCalledTimes(0);
        expect(global.fetch).not.toHaveBeenCalled();
    });
    
    it("Should reject if the pokemon is not found", async () => {
        const pokemonName = "Testmeleon";
    
        global.fetch.mockImplementationOnce(
            () => 
                Promise.resolve({
                    ok: false,
                    text: () => Promise.resolve("Error Message")
                })
        );
        
        await expect(getPokemon(pokemonName)).rejects.toThrow("Error Message");
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });
});

describe("getPokemons", () => {
    const LIMIT = 3;
    const OFFSET = 0;

    it("Should use getPokemons function to fetch a list of pokemons", async () => {
        global.fetch.mockImplementationOnce(
            () => 
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve([ { name: "bulbasaur" }, { name: "ivysaur" }, { name: "venusaur" } ]),
                })
        );

        const pokemons = await getPokemons(LIMIT, OFFSET);
        
        expect(pokemons).toEqual([ { name: "bulbasaur" }, { name: "ivysaur" }, { name: "venusaur" } ]);
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(`${URL}/pokemon?limit=${LIMIT}&offset=${OFFSET}`);
    });

    it("Should return undefined if the limit or offset parameter is null", async () => {
        const limit = null;
        const offset = null;
        const pokemons = await getPokemons(limit, offset);

        expect(pokemons).toEqual(undefined);
        expect(global.fetch).toHaveBeenCalledTimes(0);
        expect(global.fetch).not.toHaveBeenCalled();
    });

    it("Should reject if the URL is invalid", async () => {
        const limit = 20;
        const offset = 20;

        global.fetch.mockImplementationOnce(
            () => 
                Promise.resolve({
                    ok: false,
                    text: () => Promise.resolve("Error Message")
                })
        );
        
        await expect(getPokemons(limit, offset)).rejects.toThrow("Error Message");
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it("Should return a list of pokemons despite being given an invalid offset and limit", async () => {
        const limit = 0;
        const offset = 0;

        global.fetch.mockImplementationOnce(
            () => 
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve([ 
                        { name: "bulbasaur" }, 
                        { name: "ivysaur" }, 
                        { name: "venusaur" },
                        { name: "charmander" }, 
                        { name: "charmeleon" }, 
                        { name: "charizard" },
                        { name: "squirtle" },
                        { name: "wartortle" },
                        { name: "blastoise" },
                        { name: "bulbasaur" }, 
                        { name: "ivysaur" }, 
                        { name: "venusaur" },
                        { name: "charmander" }, 
                        { name: "charmeleon" }, 
                        { name: "charizard" },
                        { name: "squirtle" },
                        { name: "wartortle" },
                        { name: "blastoise" },
                        { name: "bulbasaur" }, 
                        { name: "ivysaur" }
                    ]),
                })
        );

        const pokemons = await getPokemons(limit, offset);

        expect(pokemons.length).toEqual(20);
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(`${URL}/pokemon?limit=${limit}&offset=${offset}`);
    });
});

describe("getPokemonSpecies", () => {
    it("Should use getPokemonSpecies function to fetch a pokemon species with its name", async () => {
        const speciesName = "Testmeleon";

        global.fetch.mockImplementationOnce(
            () => 
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({ name: speciesName }),
                })
        );

        const pokemonSpecies = await getPokemonSpecies(speciesName);

        expect(pokemonSpecies).toEqual({ name: speciesName });
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(`${URL}/pokemon-species/${speciesName}`);
    });

    it("Should use getPokemonSpecies function to fetch a pokemon species with its complete name", async () => {
        const speciesName = "Testmeleon";
        const speciesFullName = "Testmeleon-test"

        global.fetch.mockImplementationOnce(
            () => 
                Promise.resolve({
                    ok: false,
                    status: 404,
                })
        ).mockImplementationOnce(
            () => 
                Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve({ name: speciesFullName }),
                })
        );

        const pokemonSpecies = await getPokemonSpecies(speciesName, speciesFullName);

        expect(pokemonSpecies).toEqual({ name: speciesFullName });
        expect(global.fetch).toHaveBeenCalledTimes(2);
        expect(global.fetch).toHaveBeenCalledWith(`${URL}/pokemon-species/${speciesFullName}`);
    });

    it("Should return undefined when encountering null parameters", async () => {
        const species = null;

        const pokemonSpecies = await getPokemonSpecies(species);

        expect(pokemonSpecies).toEqual(undefined);
        expect(global.fetch).toHaveBeenCalledTimes(0);
        expect(global.fetch).not.toHaveBeenCalled();
    });

    it("Should reject if the species is not found either by name or complete name", () => {
        const speciesName = "Testmeleon";
        const speciesFullName = "Testmeleon-test";

        global.fetch.mockImplementationOnce(
            () => 
                Promise.resolve({
                    ok: false,
                    status: 500,
                    text: () => Promise.resolve("Error Message"),
                })
        );

        expect(getPokemonSpecies(speciesName, speciesFullName)).rejects.toThrow("Error Message");
        expect(global.fetch).toHaveBeenCalledTimes(1);
        expect(global.fetch).toHaveBeenCalledWith(`${URL}/pokemon-species/${speciesName}`);
    });
});

describe("getPokemonSprite", () => {
    it("Should use getPokemonSprite to return the current sprite of a pokemon", async () => {
        const pokemon = { id: 1, evolutionGenus: { id: "None" } };
        const mockedGetSpriteUrl = jest.fn((id, artwork) => `https://mocked-sprite-url/${artwork}/${id}.png`);
        const mockedLoadSpriteUrl = jest.fn((spriteUrl) => Promise.resolve(spriteUrl));
        const sprite = await getPokemonSprite(pokemon, "", mockedGetSpriteUrl, mockedLoadSpriteUrl);
        
        expect(sprite).toEqual({ current: "https://mocked-sprite-url//1.png", previous: null });
        expect(mockedGetSpriteUrl).toHaveBeenCalledTimes(1);
        expect(mockedGetSpriteUrl).toHaveBeenCalledWith(1, "");
        expect(mockedLoadSpriteUrl).toHaveBeenCalledTimes(1);
        expect(mockedLoadSpriteUrl).toHaveBeenCalledWith("https://mocked-sprite-url//1.png");
    });

    it("Should use getPokemonSprite to return the current and previous sprite of a pokemon", async () => {
        const pokemon = { id: 2, evolutionGenus: { id: 1 } };
        const mockedGetSpriteUrl = jest.fn((id, artwork) => `https://mocked-sprite-url/${artwork}/${id}.png`);
        const mockedLoadSpriteUrl = jest.fn((spriteUrl) => Promise.resolve(spriteUrl));
        const sprite = await getPokemonSprite(pokemon, "", mockedGetSpriteUrl, mockedLoadSpriteUrl);
        
        expect(sprite).toEqual({ current: "https://mocked-sprite-url//2.png", previous: "https://mocked-sprite-url//1.png" });
        expect(mockedGetSpriteUrl).toHaveBeenCalledTimes(2);
        expect(mockedGetSpriteUrl).toHaveBeenCalledWith(2, "");
        expect(mockedGetSpriteUrl).toHaveBeenCalledWith(1, "");
        expect(mockedLoadSpriteUrl).toHaveBeenCalledTimes(2);
        expect(mockedLoadSpriteUrl).toHaveBeenCalledWith("https://mocked-sprite-url//2.png");
        expect(mockedLoadSpriteUrl).toHaveBeenCalledWith("https://mocked-sprite-url//1.png");
    });

    it("Should throw an error when failing to get the sprite url", async () => {
        const pokemon = { id: 1, evolutionGenus: { id: "None" } };
        const mockedGetSpriteUrl = jest.fn((id, artwork) => {
            throw new Error("Error Message");
        });
        const mockedLoadSpriteUrl = jest.fn((spriteUrl) => Promise.resolve(spriteUrl));

        expect(getPokemonSprite(pokemon, "", mockedGetSpriteUrl, mockedLoadSpriteUrl)).rejects.toThrow("Error Message");
        expect(mockedGetSpriteUrl).toHaveBeenCalledTimes(1);
        expect(mockedGetSpriteUrl).toHaveBeenCalledWith(1, "");
    });

    it("Should throw an error when failing to load the sprite", async () => {
        const pokemon = { id: 1, evolutionGenus: { id: "None" } };
        const mockedGetSpriteUrl = jest.fn((id, artwork) => `https://mocked-sprite-url/${artwork}/${id}.png`);
        const mockedLoadSpriteUrl = jest.fn((sprite) => {
            throw new Error("Error Message");
        });

        expect(getPokemonSprite(pokemon, "", mockedGetSpriteUrl, mockedLoadSpriteUrl)).rejects.toThrow("Error Message");
        expect(mockedLoadSpriteUrl).toHaveBeenCalledTimes(1);
        expect(mockedLoadSpriteUrl).toHaveBeenCalledWith("https://mocked-sprite-url//1.png");
    });
});