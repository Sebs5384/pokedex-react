import styled from "@emotion/styled";
import { css } from "@emotion/react";
import ImageContainer from "../shared/ImageContainer";
import pokeballImage from "../../assets/img/misc/pokeball.png"
import emeraldFont from "../../assets/fonts/pokemon-emerald.ttf";

const emeraldFontFace = css`
    @font-face{
        font-family: "pokemon-emerald";
        src: url(${emeraldFont});
    }
`;

const PokemonCard = styled.div`
    border: 3px solid #dc143c;
    border-style: outset;
    border-radius: 5px;
    height: 280px;
    background-image: url(${props => props.backgroundImage});
`;

const PokemonName = styled.strong`
    text-transform: capitalize;
    font-size: 1.5rem;
    ${emeraldFontFace}
    font-family: "pokemon-emerald";
`;

function Card({ pokemonName, image, selectCard = () => {} }) {
    return (
        <PokemonCard 
            key={pokemonName} 
            className={"col-2 card-body text-center"} 
            backgroundImage={pokeballImage} 
            onClick={() => selectCard(pokemonName)}
        >
            <PokemonName>{pokemonName}</PokemonName>
            <ImageContainer src={image} alt={pokemonName} className="card-img-top" />
        </PokemonCard>
    );
};

export default Card;