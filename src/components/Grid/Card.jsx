import styled from "@emotion/styled";
import ImageContainer from "../shared/ImageContainer";

const PokemonCard = styled.div`
    border: 3px solid #dc143c;
    border-style: outset;
    border-radius: 5px;
    height: 280px
`;

const PokemonName = styled.strong`
    font-size: 1.5rem;
`;

function Card({ cardKey, image }) {
    return (
        <PokemonCard key={cardKey} className={"col-2 card-body text-center"}>
            <PokemonName>{cardKey}</PokemonName>
            <ImageContainer src={image} alt={cardKey} className="card-img-top" />
        </PokemonCard>
    );
};

export default Card;