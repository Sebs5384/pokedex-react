import { PokemonContainer, CardSection, PokemonCardText, CardTopSeparator, PokemonCloseButton, PokemonTitle } from "../Pokemon";
import ImageContainer from "../../shared/ImageContainer";
import PropTypes from "prop-types";

function PokemonCardHeader({ selectedCard, pokemonSprite, closeModal, selectPreviousEvolution }) {
    return(
        <PokemonContainer closeButton>
            <CardSection className="container-fluid species-wrapper">
                <PokemonContainer className="row species-data-wrapper">
                    <PokemonCardText className="col-2 align-self-end text-end species-font">{pokemonSprite?.previous ? "P.STAGE" : ""}</PokemonCardText>
                    <PokemonCardText className="col-5 align-self-end text-center species-font">{selectedCard.evolutionGenus.name}</PokemonCardText>
                    <PokemonCardText className="col-4 align-self-end text-end species-font">{selectedCard.evolutionGenus.genus}</PokemonCardText>
                    <PokemonCloseButton onClick={closeModal}  />
                </PokemonContainer>
                <PokemonContainer className="row justify-content-center">
                    <CardTopSeparator className="col-11" />
                </PokemonContainer>
                <PokemonTitle className="row">
                    <ImageContainer 
                        src={pokemonSprite?.previous} 
                        onClick={() => selectPreviousEvolution(selectedCard.evolutionGenus.id)} 
                        className="col-2 align-self-center text-center pokemon-species-image" 
                    />
                    <PokemonCardText className="col-4 align-self-center text-center title-font capitalize">{selectedCard.name}</PokemonCardText>
                    <PokemonCardText className="col-4 align-self-center text-end title-font hp-text">{selectedCard.stats.hp}</PokemonCardText>
                    <ImageContainer 
                        src={selectedCard.typeImage.mainTypeIcon}
                        alt={selectedCard.name} 
                        className="col-1 align-self-center pokemon-species-image text-start" />
                </PokemonTitle>
            </CardSection>
        </PokemonContainer>
    );
};
PokemonCardHeader.propTypes = {
    selectedCard: PropTypes.object,
    pokemonSprite: PropTypes.object,
    closeModal: PropTypes.func,
    selectPreviousEvolution: PropTypes.func
};

export default PokemonCardHeader;