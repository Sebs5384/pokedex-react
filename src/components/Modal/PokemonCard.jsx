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
        top: 2px;
        right: 12px;
        font-size: 15px
    }
`;

const PokemonContainer = styled.div`
    .species-wrapper {
        margin-top: 10px;
    }

    .species-data-wrapper {
        font-size: 12px;
        margin-top: -15px;
    }
`;

const PokemonCardText = styled.strong`
    
`;

const CardTopSeparator = styled.hr`
    border: 1px solid var(--bs-warning);
    opacity: 0.5;
    margin: auto;
`;

function PokemonCard({show, handleClose, selectedCard}) {
    if(selectedCard === null) {
        return null;
    };

    return(
        <PokemonModal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <PokemonContainer className="container-fluid species-wrapper">
                    <PokemonContainer className="row species-data-wrapper">
                        <PokemonCardText className="col-2 align-self-end">P.STAGE</PokemonCardText>
                        <PokemonCardText className="col-5 align-self-end text-center">Evolves From Wartortle</PokemonCardText>
                        <PokemonCardText className="col-4 align-self-end text-end">Turtle Pokemon</PokemonCardText>
                    </PokemonContainer>
                    <PokemonContainer className="row justify-content-center">
                        <CardTopSeparator className="col-11" />
                    </PokemonContainer>
                    <Modal.Title>
                    {selectedCard.name}
                    </Modal.Title>
                </PokemonContainer>
            </Modal.Header>
            <Modal.Body>
                {"Modal Body"}
            </Modal.Body>  
        </PokemonModal>
    );
};

export default PokemonCard;
