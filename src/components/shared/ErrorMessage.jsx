import { Modal, CloseButton } from "react-bootstrap";
import { css } from "@emotion/react";
import emeraldFont from "../../assets/fonts/pokemon-emerald.ttf";
import styled from "@emotion/styled";

const emeraldFontFace = css`
    @font-face{
        font-family: "pokemon-emerald";
        src: url(${emeraldFont});
    }
`;

const ErrorMessageModal = styled(Modal)`
    .modal-content {
        border: solid gold 12px;
        border-radius: 15px;
        border-style: outset;
    }
`;

const PokemonSection = styled.section`
    &.error-message-background {
        border: 3px solid rgb(24, 184, 142);
        border-style: outset;
        border-radius: 2px;
        background-color: rgb(24, 184, 142);
    };
`;

const PokemonContainer = styled.div`
    &.modal-header {
        border-bottom: 2px solid gold;
    }
`;

const ErrorMessageText = styled.strong`
    &.emerald-font {
        font-family: "pokemon-emerald";
        font-size: 1.5rem;
        ${emeraldFontFace}
    };
`;

const ErrorCloseButton = styled(CloseButton)`
    border: 2px solid gold;
    border-style: outset;
    border-radius: 2px;
    border-color: gold;
    opacity: 0.7;
`;

function ErrorMessage({ errorCauseMessage, errorText, errorMessageVisibility, closeErrorModal }) {
    return (
        <ErrorMessageModal
            show={errorMessageVisibility}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <PokemonSection className="error-message-background emerald-font" >
                <PokemonContainer className="modal-header">
                    <ErrorMessageText className="emerald-font">{errorCauseMessage}</ErrorMessageText>
                    <ErrorCloseButton onClick={closeErrorModal} />
                </PokemonContainer>
                <PokemonContainer className="modal-body">
                    <ErrorMessageText className="emerald-font">{errorText}</ErrorMessageText>
                </PokemonContainer>
            </PokemonSection>
        </ErrorMessageModal>
    );
};

export default ErrorMessage;