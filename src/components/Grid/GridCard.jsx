import { PokemonCard, PokemonName } from "./Pokemon";
import ImageContainer from "../shared/ImageContainer";
import pokeballImage from "../../assets/img/misc/pokeball.png";
import PropTypes from "prop-types";

function GridCard({ id, pokemonName, image, selectCard = () => {} }) {
    return (
        <PokemonCard 
            key={pokemonName} 
            className={"col-2 card-body text-center image-size"} 
            backgroundImage={pokeballImage} 
            onClick={() => selectCard(pokemonName, id)}
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
GridCard.PropTypes = {
    id: PropTypes.number,
    pokemonName: PropTypes.string,
    image: PropTypes.string,
    selectCard: PropTypes.func
};

export default GridCard;