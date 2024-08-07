import ImageContainer from "../shared/ImageContainer";
import pokeballImage from "../../assets/img/misc/pokedex-logo.png";
import { PokemonContainer } from "./Pokemon";

function Logo() {
    return(
        <PokemonContainer className="poke-logo">
            <ImageContainer src={pokeballImage} alt="Logo" />
        </PokemonContainer>
    );
};

export default Logo;