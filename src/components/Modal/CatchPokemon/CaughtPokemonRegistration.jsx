import { PokemonSummaryModal } from "../Pokemon";
import RegistrationHeader from "./RegistrationHeader";
import RegistrationBody from "./RegistrationBody";
import RegistrationFooter from "./RegistrationFooter";

function CaughtPokemonRegistration({ pokemon }) {
    return (
        <PokemonSummaryModal show={true} className="emerald-font" size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <RegistrationHeader />
            <RegistrationBody pokemon={pokemon} />
            <RegistrationFooter />
        </PokemonSummaryModal>
    );
};

export default CaughtPokemonRegistration;