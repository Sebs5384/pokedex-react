import { NavContainer, PokeballButton } from "./Pokemon";
import ImageContainer from "../shared/ImageContainer";
import pokeBackground from "../../assets/img/misc/poke-background.png";
import pokemonLen from "../../assets/img/misc/pokedex-len.png";
import catchPokemon from "../../assets/img/misc/catch-a-pokemon.png";
import PropTypes from "prop-types";

function CatchPokemon({ selectPokemon, isShaking, caughtPokemons, caughtPokemonSprite, handlePokeballClick }) {
    return(
        <>
            <PokeballButton 
                className={isShaking ? "poke-shake" : ""}
                backgroundImage={pokeBackground}
                onClick={handlePokeballClick}
                alt="Pokeball"
                data-cy={"pokeball-button"}
            />
            <NavContainer className="catch-pokemon">
                <ImageContainer 
                    src={catchPokemon}
                    alt="Catch a pokemon"
                />
            </NavContainer>
            <NavContainer className="poke-slot" data-cy={"navbar-poke-slot"}>
                    {caughtPokemons && caughtPokemons.map((pokemon, index) => (
                        pokemon ? 
                        <ImageContainer 
                            key={index}
                            src={caughtPokemonSprite[index]?.current || pokemonLen}
                            onClick={() => selectPokemon(pokemon.fullName)}
                            alt={pokemon.fullName} 
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
CatchPokemon.propTypes = {
    selectPokemon: PropTypes.func,
    isShaking: PropTypes.bool,
    caughtPokemons: PropTypes.array,
    caughtPokemonSprite: PropTypes.array,
    handlePokeballClick: PropTypes.func
};

export default CatchPokemon;