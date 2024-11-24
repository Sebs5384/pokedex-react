import {
    getPokemonKey,
    getPokemonsKey,
    getPokemonSpriteKey,
    getPokemonSpeciesKey,
    loadPokemon,
    loadPokemons,
    loadPokemonSprite,
    loadPokemonSpecies,
    storePokemon,
    storePokemons,
    storePokemonSprite,
    storeSpecies,
} from "../pokemon";

describe("Key generator functions", () => {
    it("Should return the pokemon key correctly", () => {
        const pokemonName = "testmeleon";
        const pokemonKey = getPokemonKey(pokemonName);

        expect(pokemonKey).toEqual(`pokemon_${pokemonName}`);
    });

    it("Should return the pokemons key in certain limit and offset", () => {
        const limit = 10;
        const offset = 0;
        const pokemonsKey = getPokemonsKey(limit, offset);

        expect(pokemonsKey).toEqual(`pokemons_${limit}_${offset}`);
    });

    it("Should return the pokemon species key correctly", () => {
        const pokemonName = "testmeleon";
        const pokemonSpeciesKey = getPokemonSpeciesKey(pokemonName);

        expect(pokemonSpeciesKey).toEqual(`pokemon_species_${pokemonName}`);
    });

    it("Should return the pokemon sprite key correctly", () => {
        const pokemon = { name: "testmeleon" };
        const pokemonSpriteKey = getPokemonSpriteKey(pokemon);

        expect(pokemonSpriteKey).toEqual(`pokemon_sprite_${pokemon.name}_classic`);
    });
});

describe("loadPokemon", () => {
    const getItemMock = jest.fn();
    
    beforeEach(() => {
        Storage.prototype.getItem = getItemMock;

        jest.mock("../pokemon", () => ({
            ...jest.requireActual("../pokemon"),
            getPokemonKey: jest.fn((name) => `pokemon_${name}`),
        }));
    });

    afterEach(() => {
        getItemMock.mockRestore();
    });

    it("Should load a pokemon from localStorage correctly", () => {
        getItemMock.mockReturnValueOnce(JSON.stringify({ name: "testmeleon" }));
        const pokemon = loadPokemon("testmeleon");

        expect(pokemon).toEqual({ name: "testmeleon" });
        expect(getItemMock).toHaveBeenCalledTimes(1);
        expect(getItemMock).toHaveBeenCalledWith("pokemon_testmeleon");
    });

    it("Should throw an error if the pokemon is not found", () => {
        getItemMock.mockReturnValueOnce(null);

        expect(() => loadPokemon("testmeleon")).toThrowError("Pokemon with given name: testmeleon not found");
    });
});