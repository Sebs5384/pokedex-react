import { Modal, Button } from "react-bootstrap";
import styled from "@emotion/styled";

const PokemonModal = styled(Modal)`
    .modal-content {
        border: solid gold 12px;
        border-radius: 10px;
        border-style: outset;
    }

    .modal-header {
        background-color: #f8f9fa;
    }

    .modal-title {
        color: #343a40;
    }

    .modal-body {
        background-color: #ffffff;
    }

    .btn-close {
        position: absolute;
        top: 10px;
        right: 10px;
    }
`;

const PokemonSpeciesWrapper = styled.section`
    margin-top: -15px;
`;

const PokemonCardSeparator = styled.div`
    margin-top: -10px
`

const PokemonMainDataWrapper = styled.div`
    font-size: 12px;
    margin-bottom: 10px;
`;

const PokemonDataText = styled.strong``;

function PokemonCard({show, handleClose, selectedCard}) {
    if(selectedCard === null) {
        return null;
    }

    return(
        <PokemonModal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <PokemonSpeciesWrapper className="container-fluid">
                    <PokemonMainDataWrapper className="row">
                        <PokemonDataText className="col-2 align-self-end">P.STAGE</PokemonDataText>
                        <PokemonDataText className="col-5 align-self-end text-center">Evolves From Wartortle</PokemonDataText>
                        <PokemonDataText className="col-4 align-self-end text-end">Turtle Pokemon</PokemonDataText>
                    </PokemonMainDataWrapper>
                    <PokemonCardSeparator className="row justify-content-center">
                        <hr className="border col-11 border-warning border-1 opacity-50"></hr>
                    </PokemonCardSeparator>
                    <Modal.Title>
                    {selectedCard.name}
                    </Modal.Title>
                </PokemonSpeciesWrapper>
            </Modal.Header>
            <Modal.Body>
                {"Modal Body"}
            </Modal.Body>  
        </PokemonModal>
    );
};

export default PokemonCard;
