import { PokemonCard, PokemonName } from "./Pokemon";
import ImageContainer from "../shared/ImageContainer";
import pokeballImage from "../../assets/img/misc/pokeball.png";

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

export default GridCard;