import { PokemonSummaryModal } from "../Pokemon";
import RegistrationHeader from "./RegistrationHeader";
import RegistrationBody from "./RegistrationBody";
import RegistrationFooter from "./RegistrationFooter";

function CaughtPokemonRegistration({ showModal, pokemon }) {
    return (
        <PokemonSummaryModal show={showModal} className="emerald-font" size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <RegistrationHeader />
            <RegistrationBody pokemon={pokemon} />
            <RegistrationFooter />
        </PokemonSummaryModal>
    );
};

export default CaughtPokemonRegistration;