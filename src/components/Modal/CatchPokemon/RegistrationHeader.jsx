import { PokemonContainer, PokemonRegistrationText } from "../Pokemon";

function RegistrationHeader() {
    return (
        <PokemonContainer 
            className="registration-corner text-center w-100"
            data-testid={"registration-header"}
        >
            <PokemonRegistrationText 
                className="registration-title-font mt-1 h2"
                data-testid={"registration-title"}
            >
                POKéDEX registration completed.
            </PokemonRegistrationText>
        </PokemonContainer>
    );
};

export default RegistrationHeader;