import { NavInputGroup, NavContainer, NavInputGroupText, NavForm } from "./Pokemon";
import ImageContainer from "../shared/ImageContainer";
import magnifier from "../../assets/img/misc/magnifier.png"

function Searchbox() {
    return(
        <NavContainer >
            <NavInputGroup>
                <NavInputGroupText className="magnifier">
                    <ImageContainer src={magnifier} alt="magnifier" />
                </NavInputGroupText>
                <NavForm 
                    type="search"
                    placeholder="Search Pokemon"
                    className="search-input form-control pokedex-search-box"
                />
            </NavInputGroup>
        </NavContainer>
    );
};

export default Searchbox;