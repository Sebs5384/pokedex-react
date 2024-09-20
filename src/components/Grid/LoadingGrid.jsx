import { usePokedexContext } from "../../context/PokedexContext";
import { LoadingWrapper, LoadingText, LoadingSpinner } from "./Pokemon";

function LoadingGrid() {
    return (
        <LoadingWrapper>
            <LoadingSpinner animation="border" variant="danger"/>
            <LoadingText>Loading Pokemons...</LoadingText>
        </LoadingWrapper>
    ); 
};

export default LoadingGrid;