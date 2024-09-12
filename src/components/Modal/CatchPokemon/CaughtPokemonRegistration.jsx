import { PokemonSummaryModal } from "../Pokemon";
import RegistrationHeader from "./RegistrationHeader";
import RegistrationBody from "./RegistrationBody";
import RegistrationFooter from "./RegistrationFooter";

function CaughtPokemonRegistration({ showModal, caughtPokemon }) {
    return (
        <PokemonSummaryModal show={showModal} className="emerald-font" size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <RegistrationHeader />
            <RegistrationBody pokemon={caughtPokemon} />
            <RegistrationFooter pokemon={caughtPokemon} />
        </PokemonSummaryModal>
    );
};

export default CaughtPokemonRegistration;