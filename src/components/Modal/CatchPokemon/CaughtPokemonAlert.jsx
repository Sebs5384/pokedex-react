import { PokemonCardText, PokemonContainer, PokemonAlertModal } from "../Pokemon";
import cx from "classnames";

function CaughtPokemonAlert({ showModal, textChange, topText, bottomText }) {
    return (
        <PokemonAlertModal show={showModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <PokemonContainer className="modal-body">
                <PokemonContainer className="alert-background d-flex justify-content-center align-items-center">
                    <PokemonContainer className="row w-100 justify-content-center">
                        <PokemonContainer className="col-12 text-start align-items-start alert-text-background fixed-height d-flex flex-column">
                            <PokemonCardText className={cx("emerald-font", {
                                "typewriter-effect": textChange
                            })}>
                                {topText}
                            </PokemonCardText>
                            <PokemonCardText className={cx("emerald-font", {
                                "typewriter-effect-delayed": textChange
                            })}>
                                {bottomText}
                            </PokemonCardText>
                        </PokemonContainer>
                    </PokemonContainer>
                </PokemonContainer>
            </PokemonContainer>
        </PokemonAlertModal>
    );
};

export default CaughtPokemonAlert;