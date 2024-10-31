import { ErrorMessageModal, PokemonContainer, PokemonSection, ErrorCloseButton, ErrorMessageText } from "./Pokemon.jsx";

function ErrorMessage({ errorCauseMessage, errorText, errorMessageVisibility, closeErrorModal }) {
    return (
        <ErrorMessageModal
            show={errorMessageVisibility}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            data-cy="error-message-modal"
            className="emerald-font"
        >
            <PokemonSection className="error-message-background emerald-font" >
                <PokemonContainer className="modal-header">
                    <ErrorMessageText >{errorCauseMessage}</ErrorMessageText>
                    <ErrorCloseButton onClick={closeErrorModal} />
                </PokemonContainer>
                <PokemonContainer className="modal-body">
                    <ErrorMessageText >{errorText}</ErrorMessageText>
                </PokemonContainer>
            </PokemonSection>
        </ErrorMessageModal>
    );
};

export default ErrorMessage;