import styled from "@emotion/styled";
import ImageContainer from "./ImageContainer";

const PokemonName = styled.strong`
    font-size: 1.5rem;
    font-family: "Roboto", sans-serif;
`;

function Card({ cardKey, image, className }) {
    return (
        <div key={cardKey} className={className}>
            <PokemonName className="card-body text-center">{cardKey}</PokemonName>
            <ImageContainer src={image} alt={cardKey} className={""} />
        </div>
    );
};

export default Card;