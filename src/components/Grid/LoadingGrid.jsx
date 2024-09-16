import { usePokedexContext } from "../../context/PokedexContext";
import { Spinner } from "react-bootstrap";
import styled from "@emotion/styled";

const LoadingWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LoadingSpinner = styled(Spinner)`
    width: 10rem;
    height: 10rem;
`;

const LoadingText = styled.strong`
    margin-top: 1rem;
    font-size: 1.5rem;
    color: red;
    text-align: center;
`;

function LoadingGrid() {
    return (
        <LoadingWrapper>
            <LoadingSpinner animation="border" variant="danger"/>
            <LoadingText>Loading Pokemons...</LoadingText>
        </LoadingWrapper>
    ); 
};

export default LoadingGrid;