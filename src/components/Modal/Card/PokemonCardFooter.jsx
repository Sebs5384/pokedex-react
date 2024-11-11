import { PokemonContainer, PokemonSection, CardSeparator, PokemonCardText } from "../Pokemon";
import ImageContainer from "../../shared/ImageContainer";
import PropTypes from "prop-types";

function PokemonCardFooter({ selectedCard }) {
    return(
        <PokemonContainer data-testid={"pokemon-card-footer"}>
            <PokemonSection className="container-fluid col-11">
                <PokemonContainer className="row mb-2" data-cy={"pokemon-card-footer-advantage-section"}>
                    <CardSeparator className="col-12 mt-1"></CardSeparator>
                    <PokemonCardText className="col-4 text-start status-font">Weakness</PokemonCardText>
                    <PokemonCardText className="col-4 text-center status-font">Resistance</PokemonCardText>
                    <PokemonCardText className="col-4 text-end status-font">Retreat Cost</PokemonCardText>
                    <PokemonContainer className="col-4 text-start">
                        <ImageContainer src={selectedCard?.advantageImage.weakness}  className="stats-icon" />
                    </PokemonContainer>
                    <PokemonContainer className="col-4 text-center">
                        <ImageContainer src={selectedCard?.advantageImage.resistance} className="stats-icon" />
                    </PokemonContainer>
                    <PokemonContainer className="col-4 text-end">
                        <ImageContainer src={selectedCard?.advantageImage.retreat} className="stats-icon" />
                    </PokemonContainer>
                </PokemonContainer>
            </PokemonSection>
            <PokemonSection className="container-fluid mb-2 col-11" data-cy={"pokemon-card-footer-description-section"}>
                <PokemonContainer className="card text-center description-border">
                    <PokemonCardText className="footer-font">{selectedCard?.description}</PokemonCardText>
                </PokemonContainer>
            </PokemonSection>
        </PokemonContainer>
    );
};
PokemonCardFooter.propTypes = {
    selectedCard: PropTypes.object
};

export default PokemonCardFooter;