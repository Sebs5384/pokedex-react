import { Spinner } from "react-bootstrap";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import emeraldFont from "../../assets/fonts/pokemon-emerald.ttf";

const emeraldFontFace = css`
    @font-face{
        font-family: "pokemon-emerald";
        src: url(${emeraldFont});
    }
`;

const GridSection = styled.section`
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;
`;

const GridWrapper = styled.div`
    max-width: 1260px;
    margin: 0 auto;
    padding: 1rem;
    background-color: #fff8dc;
    border: 3px solid rgb(250, 239, 176);
    border-style: outset;
    border-radius: 8px;
    width: 100%;
`;

const GridBody = styled.div`
    padding: 1rem;
`;

const GridBoard = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
`;

const PokemonCard = styled.div`
    border: 3px solid #dc143c;
    border-style: outset;
    border-radius: 5px;
    height: 280px;
    background-image: url(${props => props.backgroundImage});

    &.error-card {
        display: flex;
        align-items: center;
        justify-content: center;
        background-size: cover;
    }

    &.image-size img {
        height: 200px;
        width: 200px;
    }
`;

const PokemonName = styled.strong`
    text-transform: capitalize;
    font-size: 1.5rem;
    ${emeraldFontFace}
    font-family: "pokemon-emerald";

    &.error-background {
        background-color: white;
        border: 3px solid black;
        border-style: outset;
        border-radius: 5px;
        max-width: 350px;
    }
`;

const LoadingWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const LoadingText = styled.strong`
    margin-top: 1rem;
    font-size: 1.5rem;
    color: red;
    text-align: center;
`;

const LoadingSpinner = styled(Spinner)`
    width: 10rem;
    height: 10rem;
`;

export {
    GridSection,
    GridWrapper,
    GridBody,
    GridBoard,
    PokemonCard,
    PokemonName,
    LoadingWrapper,
    LoadingText,
    LoadingSpinner
};