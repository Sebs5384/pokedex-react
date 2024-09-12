import { NavContainer, PokeballButton } from "./Pokemon";
import ImageContainer from "../shared/ImageContainer";
import pokeBackground from "../../assets/img/misc/poke-background.png";
import pokemonLen from "../../assets/img/misc/pokedex-len.png";
import catchPokemon from "../../assets/img/misc/catch-a-pokemon.png";

function CatchPokemon({ selectPokemon, isShaking, caughtPokemons, handlePokeballClick }) {
    return(
        <>
            <PokeballButton 
                className={isShaking ? "poke-shake" : ""}
                backgroundImage={pokeBackground}
                onClick={handlePokeballClick}
                alt="Pokeball"
            />
            <NavContainer className="catch-pokemon">
                <ImageContainer 
                    src={catchPokemon}
                    alt="Catch a pokemon"
                />
            </NavContainer>
            <NavContainer className="poke-slot">
                    {caughtPokemons && caughtPokemons.map((pokemon, index) => (
                        pokemon ? 
                        <ImageContainer 
                            key={index}
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                            onClick={() => selectPokemon(pokemon.name)}
                            alt={pokemon.name} 
                        /> :
                        <ImageContainer 
                            key={index}
                            src={pokemonLen}
                            alt="PokeLen" 
                        />
                    ))}
            </NavContainer>
        </>
    );
};

export default CatchPokemon;