import { PokemonContainer } from "../Pokemon";
import ImageContainer from "../../shared/ImageContainer";
import PropTypes from "prop-types";

function RegistrationBody({ pokemon, pokemonSprite }) {
    return (
        <PokemonContainer 
            className="modal-body row justify-content-center registration-screen-background"
            data-testid={"registration-body"}        
        >
            <PokemonContainer className="col-11 registration-details-background">
                <PokemonContainer className="row justify-content-center registration-screen">
                    <PokemonContainer className="col-4 registration-image-background registration-image">
                        <ImageContainer 
                            src={pokemonSprite[pokemonSprite.length - 1]?.current} 
                            alt={pokemon?.name}
                            dataAttribute={"registration-image"}    
                        />
                    </PokemonContainer>
                    <PokemonContainer className="col-8 mt-1">
                        <PokemonContainer className="row">
                            <PokemonContainer className="col-11 registration-info-background">
                                <PokemonContainer className="row">
                                    <PokemonContainer 
                                        className="mt-2 col-12 text-start h3"
                                        data-testid={"registration-pokemon-name"}
                                    >
                                        Nº {pokemon?.id} {pokemon?.name.toUpperCase()}
                                    </PokemonContainer>
                                    <PokemonContainer 
                                        className="mb-2 col-12 genus-registration-font h3"
                                        data-testid={"registration-pokemon-genus"}
                                    >
                                        {pokemon?.evolutionGenus.genus.toUpperCase()}
                                    </PokemonContainer>
                                </PokemonContainer>
                            </PokemonContainer>
                        </PokemonContainer>
                        <PokemonContainer className="row">
                            <PokemonContainer className="col-8">
                                <PokemonContainer className="row">
                                    <PokemonContainer 
                                        className="mt-2 col-3 text-center description-underline h3"
                                    >
                                        HT
                                    </PokemonContainer>
                                    <PokemonContainer 
                                        className="mt-2 col-7 text-end description-underline h3"
                                    >
                                        {pokemon?.height}"
                                    </PokemonContainer>
                                    <PokemonContainer 
                                        className="col-3 text-center description-underline h3"
                                    >
                                        WT
                                    </PokemonContainer>
                                    <PokemonContainer 
                                        className="col-7 text-end description-underline h3"
                                    >
                                        {pokemon?.weight} LBS.
                                    </PokemonContainer>
                                </PokemonContainer>
                            </PokemonContainer>
                            <PokemonContainer className="col-3 d-flex justify-content-end align-items-center">
                                <PokemonContainer className="row">
                                    <PokemonContainer 
                                        className="text-center d-flex justify-content-center align-items-center footprint-background" />
                                </PokemonContainer>
                            </PokemonContainer>
                        </PokemonContainer>
                    </PokemonContainer>
                </PokemonContainer>
            </PokemonContainer>
        </PokemonContainer>
    );
};
RegistrationBody.propTypes = {
    pokemon: PropTypes.object
};

export default RegistrationBody;
