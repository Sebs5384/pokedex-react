import { PokemonContainer, PokemonRegistrationText } from "../Pokemon";

function RegistrationFooter({ pokemon }) {
    return (
        <PokemonContainer className="registration-corner text-center w-100">
            <PokemonRegistrationText className="mt-2 h1">
                {pokemon.description}
            </PokemonRegistrationText>
        </PokemonContainer>
    );
};

export default RegistrationFooter;