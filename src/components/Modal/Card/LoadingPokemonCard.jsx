import { LoadingPokemonCardModal, PokemonCardText, PokemonContainer } from "./Pokemon";

function LoadingPokemonCard({ show, onHide }) {
    return (
        <LoadingPokemonCardModal show={show} onHide={onHide}>
            <PokemonContainer className="modal-body loading-bottom-background">
                <PokemonContainer className="loading-text-background">
                    <PokemonContainer className="row">
                        <PokemonContainer className="col-12 text-center align-items-center">
                            <PokemonCardText>Loading...</PokemonCardText>
                        </PokemonContainer>
                    </PokemonContainer>
                </PokemonContainer>
            </PokemonContainer>
        </LoadingPokemonCardModal>
    );
};

export default LoadingPokemonCard;