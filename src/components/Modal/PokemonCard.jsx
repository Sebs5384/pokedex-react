import { Modal, Button } from "react-bootstrap";
import ImageContainer from "../shared/ImageContainer";
import styled from "@emotion/styled";

const PokemonModal = styled(Modal)`
    .modal-header,
    .modal-body,
    .modal-footer {
        border: none;
    }

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

const CardSection = styled.section`
    .species-wrapper {
        margin-top: 10px;
    }
`;

const PokemonContainer = styled.div`
    &.species-data-wrapper {
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

const CardSeparator = styled.hr`
    border: 1px solid black;
`;

function PokemonCard({show, handleClose, selectedCard, pokemonSprite}) {
    if(selectedCard === null) return;

    return(
        <PokemonModal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <CardSection className="container-fluid species-wrapper">
                    <PokemonContainer className="row species-data-wrapper">
                        <PokemonCardText className="col-2 align-self-end">P.STAGE</PokemonCardText>
                        <PokemonCardText className="col-5 align-self-end text-center">Evolves From Wartortle</PokemonCardText>
                        <PokemonCardText className="col-4 align-self-end text-end">Turtle Pokemon</PokemonCardText>
                    </PokemonContainer>
                    <PokemonContainer className="row justify-content-center">
                        <CardTopSeparator className="col-11" />
                    </PokemonContainer>
                    <Modal.Title className="row">
                        <PokemonCardText className="col-2 align-self-center">Image</PokemonCardText>
                        <PokemonCardText className="col-4 align-self-center">{selectedCard.name}</PokemonCardText>
                        <PokemonCardText className="col-4 align-self-center text-end">80 HP</PokemonCardText>
                        <PokemonCardText className="col-2 align-self-center">Type</PokemonCardText>
                    </Modal.Title>
                </CardSection>
            </Modal.Header>
            <Modal.Body>
                <CardSection className="container-fluid">
                    <PokemonContainer className="card">
                        <PokemonContainer className="row card-body justify-content-center">
                            <ImageContainer src={pokemonSprite} alt={selectedCard.name} className="col-6" />
                        </PokemonContainer>
                    </PokemonContainer>
                </CardSection>
                <CardSection className="row col-11 mt-2 mx-auto">
                    <ImageContainer className="col-2">Water</ImageContainer>
                    <ImageContainer className="col-2">Water</ImageContainer>
                    <PokemonCardText className="col-4 text-end">Length</PokemonCardText>
                    <PokemonCardText className="col-4 text-end">Height</PokemonCardText>
                </CardSection>
                <CardSection className="container-fluid mt-2">
                    <PokemonContainer className="row modal-font">
                        <PokemonContainer className="col-12">
                            <ImageContainer>Image</ImageContainer>
                            <PokemonCardText>Pokemon Skills</PokemonCardText>
                        </PokemonContainer>
                        <CardSeparator className="col-12"></CardSeparator>
                    </PokemonContainer>
                </CardSection>
            </Modal.Body>  
            <Modal.Footer>

            </Modal.Footer>
        </PokemonModal>
    );
};

export default PokemonCard;
