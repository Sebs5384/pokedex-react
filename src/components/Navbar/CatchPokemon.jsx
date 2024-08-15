import ImageContainer from "../shared/ImageContainer";
import { NavContainer } from "./Pokemon";
import { Button } from "react-bootstrap";
import pokeBackground from "../../assets/img/misc/poke-background.png";
import pokemonLen from "../../assets/img/misc/pokedex-len.png";
import catchPokemon from "../../assets/img/misc/catch-a-pokemon.png";
import styled from "@emotion/styled";

const PokeballButton = styled(Button)`
    background-image: url(${props => props.backgroundImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: drop-shadow(3px 1px 3px black);
    border-color: black;
    border-radius: 50%;
    width: 55px;
    height: 55px;
    margin-right: 50px;
`;

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