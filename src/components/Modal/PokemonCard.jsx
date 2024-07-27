import { Modal, Button } from "react-bootstrap";
import { skillIcon, statusIcon, atkIcon, defIcon, speedIcon, spAtkIcon, spDefIcon } from "../../assets/img/pokemon-stats";
import { useEffect } from "react";
import pokemonTypeImage from "../../assets/img/pokemon-type";
import textures from "../../assets/img/modal-texture/index";
import ImageContainer from "../shared/ImageContainer";
import styled from "@emotion/styled";

const PokemonModal = styled(Modal)`
    .modal-content {
        border: solid gold 12px;
        border-radius: 10px;
        border-style: outset;
        background-image: url(${props => props.backgroundImage});
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }
        
    .modal-title {
        margin-top: -8px;
    }

    .hp-text {
        color: red;
    }

    .pokemon-species-image {
        width: 11%;
        height: 11%;
        margin: 0 auto;
    }
`;

const CardSection = styled.section`
    &.card-banner {
        border: 2px solid rgb(254, 230, 98);
        background: content-box radial-gradient(rgb(250, 232, 130), rgb(193, 187, 26));
        border-style: inset;
    }
`;

const PokemonContainer = styled.div`
    .card-border {
        border: 8px solid rgb(254, 230, 98);
        margin-top: -5px;
        border-style: outset;
        border-radius: 0px;
    }

    .description-border {
        border: 2px solid rgb(254, 230, 98);
        border-style: outset;
        border-radius: 0px;
        background-color: transparent;
    }

    .stats-icon {
        width: 20px;
        height: 20px;
        margin-top: -5px;
        margin-right: 5px;
    }
`;

const PokemonCardText = styled.strong`
    text-transform: capitalize;

    &.species-font {
        font-size: 11px;
    }

    &.title-font {
        font-size: 33px;
    }

    &.banner-font {
        font-size: 11px;
    }

    &.status-font {
        font-size: 11px;
    }

    &.skill-font {
        color: red;
        font-size: 15px;
        text-shadow: -0.3px -0.3px 0 black, 0.3px -0.3px 0 black, -0.3px 0.3px 0 black, 0.3px 0.3px 0 black;
    }

    &.footer-font {
        font-size: 10px;
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
    if(!selectedCard) return null;

    return(
        <PokemonModal show={show} onHide={handleClose} backgroundImage={textures[selectedCard.types.mainType]}> 
            <PokemonContainer closeButton>
                <CardSection className="container-fluid species-wrapper">
                    <PokemonContainer className="row species-data-wrapper">
                        <PokemonCardText className="col-2 align-self-end text-end species-font">P.STAGE</PokemonCardText>
                        <PokemonCardText className="col-5 align-self-end text-center species-font">{selectedCard.evolutionGenus.name}</PokemonCardText>
                        <PokemonCardText className="col-4 align-self-end text-end species-font">{selectedCard.evolutionGenus.genus}</PokemonCardText>
                    </PokemonContainer>
                    <PokemonContainer className="row justify-content-center">
                        <CardTopSeparator className="col-11" />
                    </PokemonContainer>
                    <Modal.Title className="row">
                        <ImageContainer src={pokemonSprite} className="col-2 align-self-center text-center pokemon-species-image" />
                        <PokemonCardText className="col-4 align-self-center text-center title-font capitalize">{selectedCard.name}</PokemonCardText>
                        <PokemonCardText className="col-4 align-self-center text-end title-font hp-text">{selectedCard.stats.hp}</PokemonCardText>
                        <ImageContainer src={pokemonTypeImage[selectedCard.types.mainType].icon} className="col-1 align-self-center pokemon-species-image text-start" />
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
                <CardSection className="row col-10 mt-2 mx-auto card-banner">
                    <ImageContainer src={pokemonTypeImage[selectedCard.types.mainType].logo} className="col-2" />
                    <ImageContainer src={pokemonTypeImage[selectedCard.types.secondType].logo} className="col-2" />
                    <PokemonCardText className="col-4 text-end banner-font">Lenght: {selectedCard.height}"</PokemonCardText>
                    <PokemonCardText className="col-4 text-start banner-font">Weight: {selectedCard.weight} lbs</PokemonCardText>
                </CardSection>
                <CardSection className="container-fluid col-11 mt-2">
                    <PokemonContainer className="row modal-font">
                        <PokemonContainer className="col-12">
                            <ImageContainer src={skillIcon} className="stats-icon"/>
                            <PokemonCardText className="status-font">Pokemon Skills</PokemonCardText>
                        </PokemonContainer>
                        <CardSeparator className="col-12"></CardSeparator>
                        <PokemonContainer className="col-6">
                            <ImageContainer src={pokemonTypeImage[selectedCard.types.mainType].icon} className="stats-icon" />
                            <PokemonCardText className="skill-font">{selectedCard.skills.firstSkill}</PokemonCardText>
                        </PokemonContainer>
                        <PokemonContainer className="col-6 text-center">
                            <ImageContainer src={pokemonTypeImage[selectedCard.types.mainType].icon} className="stats-icon" />
                            <PokemonCardText className="skill-font">{selectedCard.skills.secondSkill}</PokemonCardText>
                        </PokemonContainer>
                    </PokemonContainer>
                </CardSection>
                <CardSection className="container-fluid col-11">
                    <PokemonContainer className="row modal-font">
                        <PokemonContainer className="text-start col-12 mt-2">
                            <ImageContainer src={statusIcon} className="stats-icon" />
                            <PokemonCardText className="status-font">Pokemon Status</PokemonCardText>
                        </PokemonContainer>
                        <CardSeparator className="col-12 mb-2"></CardSeparator>
                        <PokemonContainer className="col-4">
                            <ImageContainer src={atkIcon} className="stats-icon" />
                            <PokemonCardText className="status-font">{selectedCard.stats.atk}</PokemonCardText>
                        </PokemonContainer>
                        <PokemonContainer className="col-4">
                            <ImageContainer src={defIcon} className="stats-icon"/>
                            <PokemonCardText className="status-font">{selectedCard.stats.def}</PokemonCardText>
                        </PokemonContainer>
                        <PokemonContainer className="col-4">
                            <ImageContainer src={speedIcon} className="stats-icon"/>
                            <PokemonCardText className="status-font">{selectedCard.stats.speed}</PokemonCardText>
                        </PokemonContainer>
                        <PokemonContainer className="col-4">
                            <ImageContainer src={spAtkIcon} className="stats-icon"/>
                            <PokemonCardText className="status-font">{selectedCard.stats.spAtk}</PokemonCardText>
                        </PokemonContainer>
                        <PokemonContainer className="col-4">
                            <ImageContainer src={spDefIcon} className="stats-icon"/>
                            <PokemonCardText className="status-font">{selectedCard.stats.spDef}</PokemonCardText>
                        </PokemonContainer>
                    </PokemonContainer>
                </CardSection>
            </PokemonContainer>  
            <PokemonContainer>
                <CardSection className="container-fluid col-11">
                    <PokemonContainer className="row mb-2">
                        <CardSeparator className="col-12 mt-1"></CardSeparator>
                        <PokemonCardText className="col-4 text-start status-font">Weakness</PokemonCardText>
                        <PokemonCardText className="col-4 text-center status-font">Resistance</PokemonCardText>
                        <PokemonCardText className="col-4 text-end status-font">Retreat Cost</PokemonCardText>
                        <PokemonContainer className="col-4 text-start">
                            <ImageContainer src={pokemonTypeImage[selectedCard.typeAdvantage.weakness].icon}  className="stats-icon" />
                        </PokemonContainer>
                        <PokemonContainer className="col-4 text-center">
                            <ImageContainer src={pokemonTypeImage[selectedCard.typeAdvantage.resistance].icon} className="stats-icon" />
                        </PokemonContainer>
                        <PokemonContainer className="col-4 text-end">
                            <ImageContainer src={pokemonTypeImage.retreat.icon} className="stats-icon" />
                        </PokemonContainer>
                    </PokemonContainer>
                </CardSection>
                <CardSection className="container-fluid mb-2 col-11">
                    <PokemonContainer className="card text-center description-border">
                        <PokemonCardText className="footer-font">{selectedCard.description}</PokemonCardText>
                    </PokemonContainer>
                </CardSection>
            </PokemonContainer>
        </PokemonModal>
    );
};

export default PokemonCard;
