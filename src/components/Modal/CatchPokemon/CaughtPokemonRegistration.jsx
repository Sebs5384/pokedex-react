import { usePokedexContext } from "../../../context/PokedexContext";
import { PokemonSummaryModal } from "../Pokemon";
import RegistrationHeader from "./RegistrationHeader";
import RegistrationBody from "./RegistrationBody";
import RegistrationFooter from "./RegistrationFooter";

function CaughtPokemonRegistration() {
    const {
        registrationModalVisibility,
        caughtPokemon,
    } = usePokedexContext();
    
    return (
        <PokemonSummaryModal show={registrationModalVisibility} className="emerald-font" size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <RegistrationHeader />
            <RegistrationBody pokemon={caughtPokemon} />
            <RegistrationFooter pokemon={caughtPokemon} />
        </PokemonSummaryModal>
    );
};

export default CaughtPokemonRegistration;