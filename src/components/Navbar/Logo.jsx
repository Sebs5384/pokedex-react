import { NavContainer } from "./Pokemon";
import ImageContainer from "../shared/ImageContainer";
import pokedexLogo from "../../assets/img/misc/pokedex-logo.png";

function Logo() {
    return(
        <NavContainer className="poke-logo" data-cy={"navbar-logo"} data-testid={"navbar-logo"}>
            <ImageContainer 
                src={pokedexLogo} 
                alt="Logo" 
                onClick={() => window.location.reload()} 
                dataAttribute={"logo-image"}
            />
        </NavContainer>
    );
};

export default Logo;