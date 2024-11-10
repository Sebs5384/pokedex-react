import { ErrorMessageModal, PokemonContainer, PokemonSection, ErrorCloseButton, ErrorMessageText } from "./Pokemon.jsx";
import PropTypes from "prop-types";

function ErrorMessage({ errorCauseMessage, errorText, errorMessageVisibility, closeErrorModal }) {
    return (
        <ErrorMessageModal
            show={errorMessageVisibility}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            data-cy="error-message-modal"
            data-testid="error-message-modal"
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
ErrorMessage.propTypes = {
    errorCauseMessage: PropTypes.string,
    errorText: PropTypes.string,
    errorMessageVisibility: PropTypes.bool,
    closeErrorModal: PropTypes.func
};

export default ErrorMessage;