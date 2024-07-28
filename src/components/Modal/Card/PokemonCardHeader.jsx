import { Modal } from "react-bootstrap";
import { PokemonContainer, CardSection, PokemonCardText, CardTopSeparator } from "./Pokemon";
import { ImageContainer } from "../../shared/ImageContainer";
import { pokemonTypeImage } from "../../../assets/img/pokemon-type";

function PokemonCardHeader({ selectedCard, pokemonSprite }) {
    return(
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
    );
};

export default PokemonCardHeader;