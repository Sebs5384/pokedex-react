import ImageContainer from "../../shared/ImageContainer";
import { PokemonContainer, PokemonSummaryModal } from "../Pokemon";
import { Modal } from "react-bootstrap";

function CaughtPokemonRegistration({ pokemon }) {
    return (
        <PokemonSummaryModal show={true} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <PokemonContainer className="text-center" style={{ fontSize: "18px" }}>
                POKéDEX registration completed.
            </PokemonContainer>
            <PokemonContainer className="modal-body row justify-content-center registration-screen-background">
                <PokemonContainer className="col-11 registration-details-background">
                    <PokemonContainer className="row justify-content-center registration-screen">
                        <PokemonContainer className="col-4 registration-image-background registration-image">
                            <ImageContainer src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/160.png"}/>
                        </PokemonContainer>
                        <PokemonContainer className="col-8 mt-1">
                            <PokemonContainer className="row">
                                <PokemonContainer className="col-11 registration-info-background">
                                    <PokemonContainer className="row">
                                        <PokemonContainer className="mt-2 col-12 text-start h3">Nº 160 FERALIGATOR</PokemonContainer>
                                        <PokemonContainer className="mb-2 col-12 genus-registration-font h3">BIG JAW POKEMON</PokemonContainer>
                                    </PokemonContainer>
                                </PokemonContainer>
                            </PokemonContainer>
                            <PokemonContainer className="row">
                                <PokemonContainer className="col-8">
                                    <PokemonContainer className="row">
                                        <PokemonContainer className="mt-2 col-3 text-center description-underline h3">HT</PokemonContainer>
                                        <PokemonContainer className="mt-2 col-7 text-end description-underline">7'55"</PokemonContainer>
                                        <PokemonContainer className="col-3 text-center description-underline h3">WT</PokemonContainer>
                                        <PokemonContainer className="col-7 text-end description-underline h3">1.96 lbs.</PokemonContainer>
                                    </PokemonContainer>
                                </PokemonContainer>
                                <PokemonContainer className="col-3 d-flex justify-content-end align-items-center">
                                    <PokemonContainer className="row">
                                        <PokemonContainer className="text-center d-flex justify-content-center align-items-center footprint-background"></PokemonContainer>
                                    </PokemonContainer>
                                </PokemonContainer>
                            </PokemonContainer>
                        </PokemonContainer>
                    </PokemonContainer>
                </PokemonContainer>
            </PokemonContainer>
            <PokemonContainer className="text-center w-100 h1">
                <PokemonContainer>
                    When it bites with its massive and powerful jaws, it shakes its head and savagely tears its victim up.
                </PokemonContainer>
            </PokemonContainer>
        </PokemonSummaryModal>
    );
};

export default CaughtPokemonRegistration;