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
            />
            <NavContainer className="catch-pokemon">
                <ImageContainer src={catchPokemon}></ImageContainer>
            </NavContainer>
            <NavContainer className="poke-slot">
                    {caughtPokemons.map((pokemon, index) => (
                        pokemon ? 
                        <ImageContainer 
                            key={index}
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`}
                            onClick={() => selectPokemon(pokemon.name)} 
                        /> :
                        <ImageContainer src={pokemonLen} 
                        />
                    ))}
            </NavContainer>
        </>
    );
};

export default CatchPokemon;