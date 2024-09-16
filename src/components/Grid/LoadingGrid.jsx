import { usePokedexContext } from "../../context/PokedexContext";
import { Spinner } from "react-bootstrap";
import styled from "@emotion/styled";

const LoadingSpinner = styled(Spinner)`
    width: 10rem;
    height: 10rem;
`;

function LoadingGrid() {
    return (
        <>
            <LoadingSpinner animation="border" variant="danger"/>
        </>
    ); 
};

export default LoadingGrid;