import { Modal, Button } from "react-bootstrap";
import styled from "@emotion/styled";

const PokemonModal = styled(Modal)`
    .modal-content {
        border: solid gold 18px;
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
`;

const ModalWrapper = styled(Modal)``;

function PokemonCard({show, handleClose, selectedCard}) {
    if(selectedCard === null) {
        return null;
    }

    return(
        <PokemonModal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <section className="container-fluid">
                    <div className="row" style={{"font-size": "10px"}}>
                        <strong className="col-2 align-self-end">P.STAGE</strong>
                        <strong className="col-5 align-self-end text-center">Evolves From Wartortle</strong>
                        <strong className="col-4 align-self-end text-end">Turtle Pokemon</strong>
                    </div>
                    <Modal.Title>
                    {selectedCard.name}
                    </Modal.Title>
                </section>
            </Modal.Header>
            <Modal.Body>
                {"Modal Body"}
            </Modal.Body>  
        </PokemonModal>
    );
};

export default PokemonCard;
