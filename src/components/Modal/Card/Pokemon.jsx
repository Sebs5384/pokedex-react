import { Modal, CloseButton } from "react-bootstrap";
import styled from "@emotion/styled";

const PokemonModal = styled(Modal)`
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

const LoadingPokemonCardModal = styled(Modal)`
    .modal-content {
        background-color: rgb(60, 59, 59);
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
    
    .loading-background {
        border-style: outset;
        border-color: rgb(243, 60, 9);
        border-radius: 8px;
        background-color: rgb(243, 60, 9);
        border-left: 15px solid rgb(243, 60, 9);
        border-right: 15px solid rgb(243, 60, 9);
    }

    .loading-text-background {
        background-color: rgb(24, 184, 142);
        font-size: 50px;
        border-radius: 8px;
        color: white;
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
    PokemonModal,
    PokemonCloseButton,
    PokemonTitle,
    CardSection,
    PokemonContainer,
    PokemonCardText,
    CardTopSeparator,
    CardSeparator,
    LoadingPokemonCardModal     
};