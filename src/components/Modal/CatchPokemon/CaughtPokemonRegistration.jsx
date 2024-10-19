import { usePokedexContext } from "../../../context/PokedexContext";
import { PokemonSummaryModal } from "../Pokemon";
import RegistrationHeader from "./RegistrationHeader";
import RegistrationBody from "./RegistrationBody";
import RegistrationFooter from "./RegistrationFooter";
import ErrorMessage from "../../shared/ErrorMessage";

function CaughtPokemonRegistration() {
    const {
        registrationModalVisibility,
        caughtPokemon,
        caughtPokemonError,
        errorCauseMessage,
        errorMessage,
        errorMessageVisibility,
        handleCloseErrorMessage
    } = usePokedexContext();
    
    return(
        <>
            { caughtPokemonError ? 
                <ErrorMessage 
                    errorCauseMessage={errorCauseMessage}
                    errorText={errorMessage}
                    errorMessageVisibility={errorMessageVisibility}
                    closeErrorModal={handleCloseErrorMessage}
                />
                :
                <PokemonSummaryModal 
                    show={registrationModalVisibility} 
                    className="emerald-font" size="lg" 
                    aria-labelledby="contained-modal-title-vcenter" 
                    centered
                    data-cy={"caught-pokemon-summary-modal"}
                >
                    <RegistrationHeader />
                    <RegistrationBody pokemon={caughtPokemon} />
                    <RegistrationFooter pokemon={caughtPokemon} />
                </PokemonSummaryModal>
            }
        </>
    );
};

export default CaughtPokemonRegistration;