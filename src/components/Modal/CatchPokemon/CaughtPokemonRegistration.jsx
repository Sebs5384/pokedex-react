import { usePokedexContext } from "../../../context/PokedexContext";
import { PokemonSummaryModal } from "../Pokemon";
import RegistrationHeader from "./RegistrationHeader";
import RegistrationBody from "./RegistrationBody";
import RegistrationFooter from "./RegistrationFooter";
import ErrorMessage from "../ErrorMessage";

function CaughtPokemonRegistration() {
    const { catchPokemon, error } = usePokedexContext();

    return(
        <>
            { catchPokemon.caughtPokemonError ? 
                <ErrorMessage 
                    errorCauseMessage={error.errorCauseMessage}
                    errorText={error.errorMessage}
                    errorMessageVisibility={error.caughtPokemonErrorMessageVisibility}
                    closeErrorModal={error.handleCloseErrorMessage}
                />
                :
                <PokemonSummaryModal 
                    show={catchPokemon.registrationModalVisibility} 
                    className="emerald-font" size="lg" 
                    aria-labelledby="contained-modal-title-vcenter" 
                    data-cy={"caught-pokemon-summary-modal"}
                    data-testid={"caught-pokemon-summary-modal"}
                    centered
                >
                    <RegistrationHeader />
                    <RegistrationBody 
                        pokemon={catchPokemon.caughtPokemon} 
                        pokemonSprite={catchPokemon.caughtPokemonSprite} 
                    />
                    <RegistrationFooter 
                        pokemon={catchPokemon.caughtPokemon} 
                    />
                </PokemonSummaryModal>
            }
        </>
    );
};

export default CaughtPokemonRegistration;