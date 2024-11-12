import { usePokedexContext } from "../../../context/PokedexContext";
import { PokemonSummaryModal } from "../Pokemon";
import RegistrationHeader from "./RegistrationHeader";
import RegistrationBody from "./RegistrationBody";
import RegistrationFooter from "./RegistrationFooter";
import ErrorMessage from "../ErrorMessage";

function CaughtPokemonRegistration() {
    const {
        registrationModalVisibility,
        caughtPokemon,
        caughtPokemonSprite,
        caughtPokemonError,
        errorCauseMessage,
        errorMessage,
        caughtPokemonErrorMessageVisibility,
        handleCloseErrorMessage
    } = usePokedexContext();

    return(
        <>
            { caughtPokemonError ? 
                <ErrorMessage 
                    errorCauseMessage={errorCauseMessage}
                    errorText={errorMessage}
                    errorMessageVisibility={caughtPokemonErrorMessageVisibility}
                    closeErrorModal={handleCloseErrorMessage}
                />
                :
                <PokemonSummaryModal 
                    show={registrationModalVisibility} 
                    className="emerald-font" size="lg" 
                    aria-labelledby="contained-modal-title-vcenter" 
                    data-cy={"caught-pokemon-summary-modal"}
                    data-testid={"caught-pokemon-summary-modal"}
                    centered
                >
                    <RegistrationHeader />
                    <RegistrationBody 
                        pokemon={caughtPokemon} 
                        pokemonSprite={caughtPokemonSprite} 
                    />
                    <RegistrationFooter 
                        pokemon={caughtPokemon} 
                    />
                </PokemonSummaryModal>
            }
        </>
    );
};

export default CaughtPokemonRegistration;