import { LoadingWrapper, LoadingText, LoadingSpinner } from "./Pokemon";

function LoadingGrid() {
    return (
        <LoadingWrapper >
            <LoadingSpinner data-cy={"loading-grid-spinner"} animation="border" variant="danger"/>
            <LoadingText data-cy={"loading-grid-text"}>Loading Pokemons...</LoadingText>
        </LoadingWrapper>
    ); 
};

export default LoadingGrid;