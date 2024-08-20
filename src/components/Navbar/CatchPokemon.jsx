import { NavContainer, PokeballButton } from "./Pokemon";
import ImageContainer from "../shared/ImageContainer";
import pokeBackground from "../../assets/img/misc/poke-background.png";
import pokemonLen from "../../assets/img/misc/pokedex-len.png";
import catchPokemon from "../../assets/img/misc/catch-a-pokemon.png";

function CatchPokemon() {
    return(
        <>
            <PokeballButton backgroundImage={pokeBackground}></PokeballButton>
            <NavContainer className="catch-pokemon">
                <ImageContainer src={catchPokemon}></ImageContainer>
            </NavContainer>
            <NavContainer className="poke-slot">
                <ImageContainer src={pokemonLen} ></ImageContainer>
                <ImageContainer src={pokemonLen} ></ImageContainer>
                <ImageContainer src={pokemonLen} ></ImageContainer>
            </NavContainer>
        </>
    );
};

export default CatchPokemon;