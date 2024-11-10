import { PokemonAlertModal, PokemonCardText, PokemonContainer } from "../Pokemon";
import PropTypes from "prop-types";

function LoadingPokemonAlert({ alertVisibility, alertText }) {
    return (
        <PokemonAlertModal 
            show={alertVisibility} 
            size="s" 
            aria-labelledby="contained-modal-title-vcenter" 
            data-cy={"loading-pokemon-alert"} 
            data-testid={"loading-pokemon-alert"}
            className={"emerald-font"}
            centered
        >
            <PokemonContainer className="modal-body">
                <PokemonContainer className="alert-background d-flex justify-content-center align-items-center">
                    <PokemonContainer className="row w-100 justify-content-center">
                        <PokemonContainer className="col-12 text-center align-items-center alert-text-background">
                            <PokemonCardText data-testid="loading-text">
                                {alertText}
                            </PokemonCardText>
                        </PokemonContainer>
                    </PokemonContainer>
                </PokemonContainer>
            </PokemonContainer>
        </PokemonAlertModal>
    );
};
LoadingPokemonAlert.propTypes = {
    showModal: PropTypes.bool
};

export default LoadingPokemonAlert;