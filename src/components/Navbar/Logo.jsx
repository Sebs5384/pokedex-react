import { NavContainer, NavSection } from "./Pokemon";
import ImageContainer from "../shared/ImageContainer";
import pokeballImage from "../../assets/img/misc/pokedex-logo.png";

function Logo() {
    return(
        <NavSection>
            <NavContainer className="col-4 poke-logo">
                <ImageContainer src={pokeballImage} alt="Logo" />
            </NavContainer>
        </NavSection>
    );
};

export default Logo;