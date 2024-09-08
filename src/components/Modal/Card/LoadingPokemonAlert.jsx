import { LoadingPokemonAlertModal, PokemonCardText, PokemonContainer } from "../Pokemon";

function LoadingPokemonAlert({ showModal }) {
    return (
        <LoadingPokemonAlertModal show={showModal} size="s" aria-labelledby="contained-modal-title-vcenter" centered>
            <PokemonContainer className="modal-body">
                <PokemonContainer className="loading-background d-flex justify-content-center align-items-center">
                    <PokemonContainer className="row w-100 justify-content-center">
                        <PokemonContainer className="col-12 text-center align-items-center loading-text-background">
                            <PokemonCardText className="emerald-font">Loading....</PokemonCardText>
                        </PokemonContainer>
                    </PokemonContainer>
                </PokemonContainer>
            </PokemonContainer>
        </LoadingPokemonAlertModal>
    );
};

export default LoadingPokemonAlert;