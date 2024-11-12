import { usePokedexContext } from "../../../context/PokedexContext";
import { PokemonRegistrationText, PokemonContainer, PokemonAlertModal } from "../Pokemon";
import cx from "classnames";

function CaughtPokemonAlert() {
    const {
        caughtModalVisibility,
        textChange,
        topText,
        bottomText
    } = usePokedexContext();

    return (
        <PokemonAlertModal 
            show={caughtModalVisibility} 
            className="emerald-font" 
            size="lg" 
            aria-labelledby="contained-modal-title-vcenter" 
            centered
            data-cy={"caught-pokemon-alert-modal"}
            data-testid={"caught-pokemon-alert-modal"}
        >
            <PokemonContainer className="modal-body">
                <PokemonContainer className="alert-background d-flex justify-content-center align-items-center">
                    <PokemonContainer className="row w-100 justify-content-center">
                        <PokemonContainer className="col-12 text-start align-items-start alert-text-background fixed-height d-flex flex-column">
                            <PokemonRegistrationText 
                                className={cx({
                                    "typewriter-effect": textChange
                                })}
                                data-testid={"registration-top-text"}
                            >
                                {topText}
                            </PokemonRegistrationText>
                            <PokemonRegistrationText 
                                className={cx({
                                    "typewriter-effect-delayed": textChange
                                })}
                                data-testid={"registration-bottom-text"}
                            >
                                {bottomText}
                            </PokemonRegistrationText>
                        </PokemonContainer>
                    </PokemonContainer>
                </PokemonContainer>
            </PokemonContainer>
        </PokemonAlertModal>
    );
};

export default CaughtPokemonAlert;