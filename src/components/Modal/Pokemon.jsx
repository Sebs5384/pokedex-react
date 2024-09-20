import { Modal, CloseButton } from "react-bootstrap";
import { css } from "@emotion/react";
import styled from "@emotion/styled";
import emeraldFont from "../../assets/fonts/pokemon-emerald.ttf";

const emeraldFontFace = css`
    @font-face{
        font-family: "pokemon-emerald";
        src: url(${emeraldFont});
    }
`;

const PokemonCardModal = styled(Modal)`
    .modal-content {
        border: solid gold 12px;
        border-radius: 10px;
        border-style: outset;
        background-image: url(${props => props.backgroundTexture});
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }
        
    .modal-title {
        margin-top: -8px;
    }

    .hp-text {
        color: red;
    }

    .pokemon-species-image {
        width: 11%;
        height: 11%;
        margin: 0 auto;
    }
`;

const PokemonAlertModal = styled(Modal)`
    .modal-content {
        background-color: rgb(60, 59, 59);
    }

    &.emerald-font {
        font-size: 3rem;
        ${emeraldFontFace};
        font-family: "pokemon-emerald";
    }
`;

const PokemonSummaryModal = styled(Modal)`
    .modal-content {
        border: 3px solid rgb(82, 82, 82)
    }
    
    &.emerald-font {
        ${emeraldFontFace}
        font-family: "pokemon-emerald";
    }
`;

const PokemonCloseButton = styled(CloseButton)`
    font-size: 0.7rem;
    position: relative;
    right: -20px;
`;

const PokemonTitle = styled(Modal.Title)`
`;

const CardSection = styled.section`
    &.card-banner {
        border: 2px solid rgb(254, 230, 98);
        background: content-box radial-gradient(rgb(250, 232, 130), rgb(193, 187, 26));
        border-style: inset;
    }
`;

const PokemonContainer = styled.div`
    .card-border {
        border: 8px solid rgb(254, 230, 98);
        margin-top: -5px;
        border-style: outset;
        border-radius: 0px;
    }

    .description-border {
        border: 2px solid rgb(254, 230, 98);
        border-style: outset;
        border-radius: 0px;
        background-color: transparent;
    }

    .stats-icon {
        width: 20px;
        height: 20px;
        margin-top: -5px;
        margin-right: 5px;
    }
    
    .alert-background {
        border-style: outset;
        border-color: rgb(243, 60, 9);
        border-radius: 8px;
        background-color: rgb(243, 60, 9);
        border-left: 15px solid rgb(243, 60, 9);
        border-right: 15px solid rgb(243, 60, 9);
    }

    .alert-text-background {
        background-color: rgb(24, 184, 142);
        font-size: 50px;
        border-radius: 8px;
        color: white;
    }

    .fixed-height {
        min-height: 185px;
    }

    &.registration-screen-background {
        background-image: repeating-linear-gradient(0deg, #8dff9e, #0c5010, transparent 6px, transparent 6px);
        background-size: 5px 100%;
        margin: 0px 0px;
    }

    &.registration-details-background {
        background-color: white;
        border-radius: 8px;
        border-bottom-right-radius: 60px;
    }

    &.registration-screen {
        border-style: outset;
        border-radius: 8px;
        border: 3px solid rgb(82, 82, 82);
        border-bottom-right-radius: 60px;
    }

    .registration-image-background {
        background-color: rgb(198, 198, 198);
        border: 4px solid white;
        border-right: 5px gray;
        border-top-left-radius: 10px;
        border-bottom-left-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    .registration-image img {
        width: 190px;
        height: 190px;
    }

    .registration-info-background {
        background-color: rgb(198, 198, 198);
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
    }

    .genus-registration-font {
        padding-left: 30px;
    }
    
    .footprint-background {
        background-color: rgb(198, 198, 198);
        border-radius: 50%;
        height: 65px;
        width: 65px;
    }

    &.registration-corner {
        position: relative;
        display: inline-block;
        padding: 2px;
        border: 3px solid;
        border-color: rgb(82, 82, 82);
        border-radius: 4px;
    }

    &.description-underline {
        position: relative;
    }

    &.description-underline:: after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 22px;
        width: 105%;
        height: 3px;
        border-radius: 10px;
        background-color: rgb(198, 198, 198);
    }

    &.registration-corner::before,
    &.registration-corner::after {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        width: 10px;
    }

    &.registration-corner:: before {
        animation: tickAnimationLeft 0.7s alternate infinite;
    }

    &.registration-corner::after {
        animation: tickAnimationRight 0.7s alternate infinite;
    }

    &.registration-corner::before {
        left: 0;
        border-radius: 1.7px;
        background-image: linear-gradient(to left, rgb(255, 202, 44), rgb(255, 137, 2));
    }

    &.registration-corner::after {
        right: 0;
        border-radius: 1.7px;
        background-image: linear-gradient(to right, rgb(255, 202, 44), rgb(255, 137, 2));
    }

    @keyframes tickAnimationLeft {
        0% {
            background-image: linear-gradient(to left, rgb(211, 211, 211), rgb(57, 57, 57));
        }
    }

    @keyframes tickAnimationRight {
        0% {
            background-image: linear-gradient(to right, rgb(211, 211, 211), rgb(57, 57, 57));
        }
    }
`;

const PokemonCardText = styled.strong`
    text-transform: capitalize;

    &.species-font {
        font-size: 11px;
    }

    &.title-font {
        font-size: 33px;
    }

    &.banner-font {
        font-size: 11px;
    }

    &.status-font {
        font-size: 11px;
    }

    &.skill-font {
        color: red;
        font-size: 15px;
        text-shadow: -0.3px -0.3px 0 black, 0.3px -0.3px 0 black, -0.3px 0.3px 0 black, 0.3px 0.3px 0 black;
    }

    &.footer-font {
        font-size: 10px;
    }

    &.emerald-font {
        font-size: 3rem;
        ${emeraldFontFace}
        font-family: "pokemon-emerald";
    }
`;

const PokemonRegistrationText = styled.p`
    &.registration-title-font {
        font-size: 2rem;
    }

    &.typewriter-effect {
        overflow: hidden;
        border-right: 0.15em solid transparent;
        white-space: nowrap;
        letter-spacing: 0.15em;
        animation: typing 1s steps(40), cursor 0.75s step-end forwards;
    }

    &.typewriter-effect-delayed {
        overflow: hidden;
        border-right: 0.15em solid transparent;
        white-space: nowrap;
        opacity: 0;
        letter-spacing: 0.15em;
        animation: typing 1s steps(40), cursor 0.75s step-end forwards;
        animation-fill-mode: forwards;
        animation-delay: 1s;
    }

    @keyframes typing {
        0% {
            width: 0;
        }
        1% {
            opacity: 1;
        }
        100% {
            width: 100%;
            opacity: 1;
        }
    }
`;

const CardTopSeparator = styled.hr`
    border: 1px solid var(--bs-warning);
    opacity: 0.5;
    margin: auto;
`;

const CardSeparator = styled.hr`
    border: 1px solid black;
`;

export {
    PokemonCardModal,
    PokemonCloseButton,
    PokemonTitle,
    CardSection,
    PokemonContainer,
    PokemonCardText,
    PokemonRegistrationText,
    CardTopSeparator,
    CardSeparator,
    PokemonAlertModal,
    PokemonSummaryModal     
};