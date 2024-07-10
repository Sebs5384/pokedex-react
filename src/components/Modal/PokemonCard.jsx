import { Modal, Button } from "react-bootstrap";
import ImageContainer from "../shared/ImageContainer";
import styled from "@emotion/styled";
import waterType from "../../assets/img/modal-texture/water-texture.png"
import waterIcon from "../../assets/img/pokemon-type/icon/water-type-icon.png"
import waterLogo from "../../assets/img/pokemon-type/logo/water-type.png"

const PokemonModal = styled(Modal)`
    .modal-content {
        border: solid gold 12px;
        border-radius: 10px;
        border-style: outset;
        background-image: url(${waterType});
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }
        
    .modal-title {
        margin-top: -10px;
        font-size: 30px;
    }

    .hp-text {
        color: red;
    }

    .pokemon-species-image {
        width: 11%;
        height: 11%;
        margin: 0 auto;
    }

    .btn-close {
        position: absolute;
        top: 2px;
        right: 12px;
        font-size: 15px
    }
`;

const CardSection = styled.section`
`;

const PokemonContainer = styled.div`
    &.species-data-wrapper {
        font-size: 12px;
    }

    .card-border {
        border: 8px solid rgb(254, 230, 98);
        margin-top: -5px;
        border-style: outset;
        border-radius: 0px;
    }
`;

const PokemonCardText = styled.strong`
    &.capitalize {
        text-transform: capitalize;
    }
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
        <PokemonModal show={show} onHide={handleClose}>
            <PokemonContainer closeButton>
                <CardSection className="container-fluid species-wrapper">
                    <PokemonContainer className="row species-data-wrapper">
                        <PokemonCardText className="col-2 align-self-end text-end">P.STAGE</PokemonCardText>
                        <PokemonCardText className="col-5 align-self-end text-center">Evolves From Wartortle</PokemonCardText>
                        <PokemonCardText className="col-4 align-self-end text-end">Shellfish Pokemon</PokemonCardText>
                    </PokemonContainer>
                    <PokemonContainer className="row justify-content-center">
                        <CardTopSeparator className="col-11" />
                    </PokemonContainer>
                    <Modal.Title className="row">
                        <ImageContainer src={pokemonSprite} className="col-2 align-self-center text-center pokemon-species-image" />
                        <PokemonCardText className="col-4 align-self-center text-center capitalize">{selectedCard.name}</PokemonCardText>
                        <PokemonCardText className="col-4 align-self-center text-end hp-text">80 HP</PokemonCardText>
                        <ImageContainer src={waterIcon} className="col-1 align-self-center pokemon-species-image text-start" />
                    </Modal.Title>
                </CardSection>
            </PokemonContainer>
            <PokemonContainer>
                <CardSection className="container-fluid">
                    <PokemonContainer className="card card-border col-11 mx-auto">
                        <PokemonContainer className="row card-body justify-content-center">
                            <ImageContainer src={pokemonSprite} alt={selectedCard.name} className="col-8" />
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
                        <PokemonContainer className="col-6">
                            <ImageContainer>Leaf image</ImageContainer>
                            <PokemonCardText>Overgrow</PokemonCardText>
                        </PokemonContainer>
                        <PokemonContainer className="col-6">
                            <ImageContainer>Leaf image</ImageContainer>
                            <PokemonCardText>Chlorophyll</PokemonCardText>
                        </PokemonContainer>
                    </PokemonContainer>
                </CardSection>
                <CardSection className="container-fluid mt-2">
                    <PokemonContainer className="row modal-font">
                        <PokemonContainer className="text-start col-12">
                            <ImageContainer>Image</ImageContainer>
                            <PokemonCardText>Pokemon Status</PokemonCardText>
                        </PokemonContainer>
                        <CardSeparator className="col-12"></CardSeparator>
                        <PokemonContainer className="col-4">
                            <ImageContainer>ATK Image</ImageContainer>
                            <PokemonCardText>ATTACK</PokemonCardText>
                        </PokemonContainer>
                        <PokemonContainer className="col-4">
                            <ImageContainer>ATK Image</ImageContainer>
                            <PokemonCardText>ATTACK</PokemonCardText>
                        </PokemonContainer>
                        <PokemonContainer className="col-4">
                            <ImageContainer>ATK Image</ImageContainer>
                            <PokemonCardText>ATTACK</PokemonCardText>
                        </PokemonContainer>
                        <PokemonContainer className="col-4">
                            <ImageContainer>ATK Image</ImageContainer>
                            <PokemonCardText>ATTACK</PokemonCardText>
                        </PokemonContainer>
                        <PokemonContainer className="col-4">
                            <ImageContainer>ATK Image</ImageContainer>
                            <PokemonCardText>ATTACK</PokemonCardText>
                        </PokemonContainer>
                    </PokemonContainer>
                </CardSection>
            </PokemonContainer>  
            <PokemonContainer>
                <CardSection className="container-fluid mt-2">
                    <PokemonContainer className="row">
                        <CardSeparator className="col-12"></CardSeparator>
                        <PokemonCardText className="col-4 text-start">Weakness</PokemonCardText>
                        <PokemonCardText className="col-4 text-center">Resistance</PokemonCardText>
                        <PokemonCardText className="col-4 text-end">Retreat Cost</PokemonCardText>
                    </PokemonContainer>
                </CardSection>
                <CardSection className="container-fluid mt-2">
                    <PokemonContainer className="card text-center">
                        <PokemonCardText>
                            A brutal POKéMON with pressurized water jets on its shell. They are used for high speed tackles.
                        </PokemonCardText>
                    </PokemonContainer>
                </CardSection>
            </PokemonContainer>
        </PokemonModal>
    );
};

export default PokemonCard;
