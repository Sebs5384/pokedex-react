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
        const pokemon = { fullName: "testmeleon" };
        const pokemonSpriteKey = getPokemonSpriteKey(pokemon);

        expect(pokemonSpriteKey).toEqual(`pokemon_sprite_${pokemon.fullName}_classic`);
    });
});

describe("loadPokemon", () => {
    const getItemMock = jest.fn();
    
    beforeEach(() => {
        jest.spyOn(Storage.prototype, "getItem").mockImplementation(getItemMock);
    });

    afterEach(() => {
        jest.restoreAllMocks();
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

        expect(getItemMock).not.toHaveBeenCalled();
        expect(() => loadPokemon("testmeleon")).toThrowError("Pokemon with given name: testmeleon not found");
    });
});

describe("loadPokemons", () => {
    const getItemMock = jest.fn();

    beforeEach(() => {
        jest.spyOn(Storage.prototype, "getItem").mockImplementation(getItemMock);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("Should load pokemons from the localStorage correctly", () => {
        getItemMock.mockReturnValueOnce(JSON.stringify({ name: "testmeleon" }));
        const pokemons = loadPokemons();

        expect(getItemMock).toHaveBeenCalledTimes(1);
        expect(pokemons).toEqual({ name: "testmeleon" });
    });

    it("Should throw an error when the pokemons are not found", () => {
        getItemMock.mockReturnValueOnce(null);

        expect(getItemMock).not.toHaveBeenCalled();
        expect(() => loadPokemons()).toThrowError("Pokemon with given limit: 20 and offset: 0 not found");
    });
});

describe("loadPokemonSpecies", () => {
    const getItemMock = jest.fn();

    beforeEach(() => {
        jest.spyOn(Storage.prototype, "getItem").mockImplementation(getItemMock);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("Should load pokemons species from the localStorage correctly", () => {
        getItemMock.mockReturnValueOnce(JSON.stringify({ name: "testmeleon" }));
        const species = loadPokemonSpecies();

        expect(getItemMock).toHaveBeenCalledTimes(1);
        expect(species).toEqual({ name: "testmeleon" });
    });

    it("Should throw an error when the pokemon specie is not found", () => {
        getItemMock.mockReturnValueOnce(null);

        expect(() => loadPokemonSpecies("testmeleon")).toThrowError("Pokemon species with given name: testmeleon not found");
        expect(getItemMock).toHaveBeenCalledTimes(1);
        expect(getItemMock).toHaveBeenCalledWith("pokemon_species_testmeleon");
    });
});

describe("loadPokemonSprite", () => {
    const getItemMock = jest.fn();

    beforeEach(() => {
        jest.spyOn(Storage.prototype, "getItem").mockImplementation(getItemMock);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("Should load a pokemon sprite from the localStorage correctly", () => {
        getItemMock.mockReturnValueOnce(JSON.stringify({ name: "testmeleon"}, "classic"));
    
        const sprite = loadPokemonSprite({ fullName: "testmeleon" }, "classic");
    
        expect(getItemMock).toHaveBeenCalledTimes(1);
        expect(getItemMock).toHaveBeenCalledWith("pokemon_sprite_testmeleon_classic");
        expect(sprite).toEqual({ name: "testmeleon" });
    });

    it("Should return an error if the pokemon parameter is undefined", () => {
        expect(() => loadPokemonSprite(undefined, "classic")).toThrowError("Pokemon is undefined");
    });

    it("Should return an error if the pokemon paramater is null", () => {
        getItemMock.mockReturnValueOnce(null);

        expect(() => loadPokemonSprite({ fullName: "testmeleon"}, "classic")).toThrowError(
            "Pokemon sprite of given pokemon: testmeleon not found"
        );
        expect(getItemMock).toHaveBeenCalledTimes(1);
        expect(getItemMock).toHaveBeenCalledWith("pokemon_sprite_testmeleon_classic");
    });
});

describe("storePokemons", () => {
    const setItemMock = jest.fn();

    beforeEach(() => {
        jest.spyOn(Storage.prototype, "setItem").mockImplementation(setItemMock);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("Should store pokemons in the localStorage correctly", () => {
        const limit = 10;
        const offset = 0;
        const pokemons = [{ name: "testmeleon" }];

        storePokemons(limit, offset, pokemons);

        expect(setItemMock).toHaveBeenCalledTimes(1);
        expect(setItemMock).toHaveBeenCalledWith(`pokemons_${limit}_${offset}`, JSON.stringify(pokemons));
    });

    it("Should throw an error if limit or offset parameters are undefined", () => {
        const limit = undefined;
        const offset = undefined;
        const pokemons = "test";

        expect(() => storePokemons(limit, offset, pokemons)).toThrowError(
            "Limit, offset and pokemons must be defined to be stored in localstorage, reading: limit: undefined, offset: undefined, pokemons: test"
        );
    });
});

describe("storePokemon", () => {
    setItemMock = jest.fn();

    beforeEach(() => {
        jest.spyOn(Storage.prototype, "setItem").mockImplementation(setItemMock);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("Should store a pokemon correctly", () => {
        const name = "testmeleon";
        const pokemon = { name: "testmeleon", id: 1 };

        storePokemon(name, pokemon);

        expect(setItemMock).toHaveBeenCalledTimes(1);
        expect(setItemMock).toHaveBeenCalledWith(`pokemon_${name}`, JSON.stringify(pokemon));
    });

    it("Should throw an error if name or pokemon parameters are faulty", () => {
        const name = undefined; 
        const pokemon = "test";

        expect(() => storePokemon(name, pokemon)).toThrowError(
            "Name and pokemon must be defined to be stored in localstorage, reading: name: undefined, pokemon: test"
        );
        expect(setItemMock).not.toHaveBeenCalled();
    });
});

describe("storeSpecies", () => {
    setItemMock = jest.fn();

    beforeEach(() => {
        jest.spyOn(Storage.prototype, "setItem").mockImplementation(setItemMock);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("Should store a pokemon species correctly", () => {
        const name = "testmeleon";
        const species = { evolves_from: { name: "testmander" }, name: "testmeleon", id: 1 };
       
        storeSpecies(name, species);

        expect(setItemMock).toHaveBeenCalledTimes(1);
        expect(setItemMock).toHaveBeenCalledWith(`pokemon_species_${name}`, JSON.stringify(species));
    });

    it("Should throw an error if the name or species parameters are faulty", () => {
        const name = undefined;
        const species = "test";

        expect(() => storeSpecies(name, species)).toThrowError(
            "Name and species must be defined to be stored in localstorage, reading: name: undefined, species: test"
        );
        expect(setItemMock).not.toHaveBeenCalled();
    });
});

describe("storePokemonSprite", () => {
    setItemMock = jest.fn();

    beforeEach(() => {
        jest.spyOn(Storage.prototype, "setItem").mockImplementation(setItemMock);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it("Should store a pokemon sprite correctly", () => {
        const pokemon = { fullName: "testmeleon" };
        const sprite = { current: "https://mocked-sprite-url//1.png", previous: null };
        const artwork = "classic";

        storePokemonSprite(pokemon, sprite, artwork);

        expect(setItemMock).toHaveBeenCalledTimes(1);
        expect(setItemMock).toHaveBeenCalledWith(`pokemon_sprite_${pokemon.fullName}_${artwork}`, JSON.stringify(sprite));
    });

    it("Should throw an error if the pokemon or sprite parameters are faulty", () => {
        const pokemon = undefined;
        const sprite = "test";

        expect(() => storePokemonSprite(pokemon, sprite)).toThrowError(
            "Id and sprite must be defined to be stored in localstorage, reading: id: undefined, sprite: test"
        );
        expect(setItemMock).not.toHaveBeenCalled();
    });
});