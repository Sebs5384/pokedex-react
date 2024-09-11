import { PokemonContainer, PokemonRegistrationText } from "../Pokemon";

function RegistrationFooter({ pokemon }) {
    return (
        <PokemonContainer className="registration-corner text-center w-100">
            <PokemonRegistrationText className="mt-2 h1">
                When it bites with its massive and powerful jaws, it shakes its head and savagely tears its victim up.
            </PokemonRegistrationText>
        </PokemonContainer>
    );
};

export default RegistrationFooter;