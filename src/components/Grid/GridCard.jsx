import { PokemonCard, PokemonName } from "./Pokemon";
import ImageContainer from "../shared/ImageContainer";
import pokeballImage from "../../assets/img/misc/pokeball.png";
import PropTypes from "prop-types";

function GridCard({ id, pokemonName, image, selectCard = () => {} }) {
    return (
        <PokemonCard 
            key={pokemonName} 
            className={"col-2 card-body text-center image-size"}
            data-cy={`${pokemonName}-grid`}
            data-testid={`${pokemonName}-grid`} 
            backgroundImage={pokeballImage} 
            onClick={() => selectCard(pokemonName)}
        >
            <PokemonName>
                {`#${id} ${pokemonName}`}
            </PokemonName>
            <ImageContainer 
                src={image} 
                alt={pokemonName} 
                className="card-img-top"
            />
        </PokemonCard>
    );
};
GridCard.propTypes = {
    id: PropTypes.number,
    pokemonName: PropTypes.string,
    image: PropTypes.string,
    selectCard: PropTypes.func
};

export default GridCard;