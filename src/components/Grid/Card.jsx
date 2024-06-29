import styled from "@emotion/styled";
import ImageContainer from "../shared/ImageContainer";
import pokeballImage from "../../assets/img/misc/pokeball.png"

const PokemonCard = styled.div`
    border: 3px solid #dc143c;
    border-style: outset;
    border-radius: 5px;
    height: 280px;
    background-image: url(${props => props.backgroundImage});
`;

const PokemonName = styled.strong`
    font-size: 1.5rem;
`;

function Card({ cardKey, image, onClick = () => {} }) {
    return (
        <PokemonCard key={cardKey} className={"col-2 card-body text-center"} backgroundImage={pokeballImage} onClick={onClick}>
            <PokemonName>{cardKey}</PokemonName>
            <ImageContainer src={image} alt={cardKey} className="card-img-top" />
        </PokemonCard>
    );
};

export default Card;