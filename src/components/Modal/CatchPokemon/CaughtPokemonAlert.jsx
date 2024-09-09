import { PokemonCardText, PokemonContainer, PokemonAlertModal } from "../Pokemon";

function CaughtPokemonAlert({ showModal }) {
    return (
        <PokemonAlertModal show={showModal} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <PokemonContainer className="modal-body">
                <PokemonContainer className="alert-background d-flex justify-content-center align-items-center">
                    <PokemonContainer className="row w-100 justify-content-center">
                        <PokemonContainer className="col-12 text-start align-items-start alert-text-background d-flex flex-column">
                            <PokemonCardText className="emerald-font typewriter-effect">PIKACHU'S data was</PokemonCardText>
                            <PokemonCardText className="emerald-font typewriter-effect-delayed">added to the POKéDEX</PokemonCardText>
                        </PokemonContainer>
                    </PokemonContainer>
                </PokemonContainer>
            </PokemonContainer>
        </PokemonAlertModal>
    );
};

export default CaughtPokemonAlert;