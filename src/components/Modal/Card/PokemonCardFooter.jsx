import { PokemonContainer, CardSection, CardSeparator, PokemonCardText } from "../Pokemon";
import ImageContainer from "../../shared/ImageContainer";
import PropTypes from "prop-types";

function PokemonCardFooter({ selectedCard }) {
    return(
        <PokemonContainer>
            <CardSection className="container-fluid col-11">
                <PokemonContainer className="row mb-2">
                    <CardSeparator className="col-12 mt-1"></CardSeparator>
                    <PokemonCardText className="col-4 text-start status-font">Weakness</PokemonCardText>
                    <PokemonCardText className="col-4 text-center status-font">Resistance</PokemonCardText>
                    <PokemonCardText className="col-4 text-end status-font">Retreat Cost</PokemonCardText>
                    <PokemonContainer className="col-4 text-start">
                        <ImageContainer src={selectedCard.advantageImage.weakness}  className="stats-icon" />
                    </PokemonContainer>
                    <PokemonContainer className="col-4 text-center">
                        <ImageContainer src={selectedCard.advantageImage.resistance} className="stats-icon" />
                    </PokemonContainer>
                    <PokemonContainer className="col-4 text-end">
                        <ImageContainer src={selectedCard.advantageImage.retreat} className="stats-icon" />
                    </PokemonContainer>
                </PokemonContainer>
            </CardSection>
            <CardSection className="container-fluid mb-2 col-11">
                <PokemonContainer className="card text-center description-border">
                    <PokemonCardText className="footer-font">{selectedCard.description}</PokemonCardText>
                </PokemonContainer>
            </CardSection>
        </PokemonContainer>
    );
};
PokemonCardFooter.propTypes = {
    selectedCard: PropTypes.object
};

export default PokemonCardFooter;