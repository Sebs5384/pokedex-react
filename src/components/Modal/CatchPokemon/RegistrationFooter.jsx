import { PokemonContainer, PokemonRegistrationText } from "../Pokemon";
import PropTypes from "prop-types";

function RegistrationFooter({ pokemon }) {
    return (
        <PokemonContainer className="registration-corner text-center w-100">
            <PokemonRegistrationText className="mt-2 h1">
                {pokemon.description}
            </PokemonRegistrationText>
        </PokemonContainer>
    );
};
RegistrationFooter.propTypes = {
    pokemon: PropTypes.object
};

export default RegistrationFooter;