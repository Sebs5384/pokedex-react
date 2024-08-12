import { NavContainer } from "./Pokemon";
import ImageContainer from "../shared/ImageContainer";
import pokeballImage from "../../assets/img/misc/pokedex-logo.png";

function Logo() {
    return(
        <NavContainer className="poke-logo">
            <ImageContainer src={pokeballImage} alt="Logo" />
        </NavContainer>
    );
};

export default Logo;