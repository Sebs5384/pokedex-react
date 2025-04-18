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
    width: 95%;
    background-color: #fff8dc;
    border: 3px solid rgb(250, 239, 176);
    border-style: outset;
    border-radius: 8px;

    @media (max-width: 480px) {
        width: 85%;
    };
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

    @media (max-width: 480px) {
        width: 120px;
        height: 200px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

        &.image-size img {
            height: 150px;
            width: 150px;
        }
    }

    @media (min-width: 481px) and (max-width: 520px) {
        width: 150px;
        height: 200px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

        &.image-size img {
            height: 150px;
            width: 150px;
        }
    }

    @media (min-width: 521px) and (max-width: 580px) {
        width: 200px;
        height: 200px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

        &.image-size img {
            height: 150px;
            width: 150px;
        }
    }

    @media (min-width: 581px) and (max-width: 640px) {
        width: 200px;
        height: 225px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

        &.image-size img {
            height: 185px;
            width: 185px;
        }
    }

    @media (min-width: 641px) and (max-width: 700px) {
        width: 200px;
        height: 275px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

        &.image-size img {
            height: 225px;
            width: 225px;
        }
    }

    @media (min-width: 701px) and (max-width: 820px) {
        width: 250px;
        height: 300px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

        &.image-size img {
            height: 250px;
            width: 250px;
        }
    }

    @media (min-width: 821px) and (max-width: 940px) {
        width: 150px;
        height: 250px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;

        &.image-size img {
            height: 150px;
            width: 150px;
        }
    }
`

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

    @media (max-width: 480px) {
        font-size: 0.7rem;
    }

    @media (min-width: 481px) and (max-width: 520px) {
        font-size: 1rem;
    }

    @media (min-width: 521px) and (max-width: 700px) {
        font-size: 1.2rem;
    }   

    @media (min-width: 701px) and (max-width: 820px) {
        font-size: 1.4rem;
    }

    @media (min-width: 821px) and (max-width: 940px) {
        font-size: 0.8rem;
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

    @media (max-width: 480px) {
        font-size: 1rem;
    }

    @media (min-width: 481px) and (max-width: 940px) {
        font-size: 1rem;
    }
`;

const LoadingSpinner = styled(Spinner)`
    width: 10rem;
    height: 10rem;

    @media (max-width: 480px) {
        width: 5rem;
        height: 5rem;
    }

    @media (min-width: 481px) and (max-width: 940px) {
        width: 7rem;
        height: 7rem;
    }
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