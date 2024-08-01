import { LoadingPokemonCardModal, PokemonCardText, PokemonContainer } from "./Pokemon";

function LoadingPokemonCard({ show, onHide }) {
    return (
        <LoadingPokemonCardModal show={show} onHide={onHide} size="s" aria-labelledby="contained-modal-title-vcenter" centered>
            <PokemonContainer className="modal-body">
                <PokemonContainer className="loading-background d-flex justify-content-center align-items-center">
                    <PokemonContainer className="row w-100 justify-content-center">
                        <PokemonContainer className="col-12 text-center align-items-center loading-text-background">
                            <PokemonCardText>Loading....</PokemonCardText>
                        </PokemonContainer>
                    </PokemonContainer>
                </PokemonContainer>
            </PokemonContainer>
        </LoadingPokemonCardModal>
    );
};

export default LoadingPokemonCard;