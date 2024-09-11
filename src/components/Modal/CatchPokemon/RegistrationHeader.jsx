import { PokemonContainer, PokemonRegistrationText } from "../Pokemon";

function RegistrationHeader() {
    return (
        <PokemonContainer className="registration-corner text-center w-100">
            <PokemonRegistrationText className="registration-title-font mt-1 h2">POKéDEX registration completed.</PokemonRegistrationText>
        </PokemonContainer>
    );
};

export default RegistrationHeader;