import { PokemonContainer, CardSection, PokemonCardText, CardSeparator  } from "../Pokemon";
import { skillIcon, statusIcon, atkIcon, defIcon, speedIcon, spAtkIcon, spDefIcon } from "../../../assets/img/pokemon-stats";
import ImageContainer from "../../shared/ImageContainer";
import PropTypes from "prop-types";

function PokemonCardBody({ selectedCard, pokemonSprite }) {
    return(
        <PokemonContainer>
            <CardSection className="container-fluid" data-cy={"pokemon-card-modal-image-section"}>
                <PokemonContainer className="card card-border col-11 mx-auto" style={{background: selectedCard?.backgroundStyle}}>
                    <PokemonContainer className="row card-body justify-content-center">
                        <ImageContainer src={pokemonSprite?.current} alt={selectedCard?.name} className="col-8"/>
                    </PokemonContainer>
                </PokemonContainer>
            </CardSection>
            <CardSection className="row col-10 mt-2 mx-auto card-banner" data-cy={"pokemon-card-banner-section"}>
                <ImageContainer src={selectedCard?.typeImage.mainTypeLogo} className="col-2" />
                <ImageContainer src={selectedCard?.typeImage.secondaryTypeLogo} className="col-2" />
                <PokemonCardText className="col-4 text-end banner-font">Length: {selectedCard?.height}"</PokemonCardText>
                <PokemonCardText className="col-4 text-start banner-font">Weight: {selectedCard?.weight} lbs</PokemonCardText>
            </CardSection>
            <CardSection className="container-fluid col-11 mt-2" data-cy={"pokemon-card-skill-section"}>
                <PokemonContainer className="row modal-font">
                    <PokemonContainer className="col-12">
                        <ImageContainer src={skillIcon} className="stats-icon"/>
                        <PokemonCardText className="status-font">Pokemon Skills</PokemonCardText>
                    </PokemonContainer>
                    <CardSeparator className="col-12"></CardSeparator>
                    <PokemonContainer className="col-6">
                        <ImageContainer src={selectedCard?.typeImage.mainTypeIcon} className="stats-icon" />
                        <PokemonCardText className="skill-font">{selectedCard?.skills.firstSkill}</PokemonCardText>
                    </PokemonContainer>
                    <PokemonContainer className="col-6 text-center">
                        <ImageContainer src={selectedCard?.typeImage.mainTypeIcon} className="stats-icon" />
                        <PokemonCardText className="skill-font">{selectedCard?.skills.secondSkill}</PokemonCardText>
                    </PokemonContainer>
                </PokemonContainer>
            </CardSection>
            <CardSection className="container-fluid col-11" data-cy={"pokemon-card-stats-section"}>
                <PokemonContainer className="row modal-font">
                    <PokemonContainer className="text-start col-12 mt-2">
                        <ImageContainer src={statusIcon} className="stats-icon" />
                        <PokemonCardText className="status-font">Pokemon Status</PokemonCardText>
                    </PokemonContainer>
                    <CardSeparator className="col-12 mb-2"></CardSeparator>
                    <PokemonContainer className="col-4">
                        <ImageContainer src={atkIcon} className="stats-icon" />
                        <PokemonCardText className="status-font">{selectedCard?.stats.atk}</PokemonCardText>
                    </PokemonContainer>
                    <PokemonContainer className="col-4">
                        <ImageContainer src={defIcon} className="stats-icon"/>
                        <PokemonCardText className="status-font">{selectedCard?.stats.def}</PokemonCardText>
                    </PokemonContainer>
                    <PokemonContainer className="col-4">
                        <ImageContainer src={speedIcon} className="stats-icon"/>
                        <PokemonCardText className="status-font">{selectedCard?.stats.speed}</PokemonCardText>
                    </PokemonContainer>
                    <PokemonContainer className="col-4">
                        <ImageContainer src={spAtkIcon} className="stats-icon"/>
                        <PokemonCardText className="status-font">{selectedCard?.stats.spAtk}</PokemonCardText>
                    </PokemonContainer>
                    <PokemonContainer className="col-4">
                        <ImageContainer src={spDefIcon} className="stats-icon"/>
                        <PokemonCardText className="status-font">{selectedCard?.stats.spDef}</PokemonCardText>
                    </PokemonContainer>
                </PokemonContainer>
            </CardSection>
        </PokemonContainer>
    );
};
PokemonCardBody.propTypes = {
    selectedCard: PropTypes.object,
    pokemonSprite: PropTypes.object
};

export default PokemonCardBody;