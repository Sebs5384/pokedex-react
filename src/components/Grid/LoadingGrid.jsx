import { LoadingWrapper, LoadingText, LoadingSpinner } from "./Pokemon";

function LoadingGrid() {
    return (
        <LoadingWrapper >
            <LoadingSpinner animation="border" variant="danger"/>
            <LoadingText data-cy={"loading-grid-text"}>Loading Pokemons...</LoadingText>
        </LoadingWrapper>
    ); 
};

export default LoadingGrid;