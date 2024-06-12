const URL = "https://pokeapi.co/api/v2";

async function getPokemons(limite, offset) {
    const pokemonsURL = `${URL}/pokemon?limit=${limite}&offset=${offset}`;

    return await fetch(pokemonsURL)
        .then(response => response.json())
        .catch((error) => {
            throw new Error(error);
        })
        .finally(() => {
            console.log(`Warning, using API call URL: ${pokemonsURL}`);
        });
};