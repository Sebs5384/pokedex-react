import { PokemonCard, PokemonName } from "./Pokemon";
import errorBackground from "../../assets/img/misc/missingno.png";

function GridErrorCard() {
    return (
        <PokemonCard
            key={"error"}
            className={"col-2 card-body text-center image-size error-card"}
            data-cy={"grid-error-card"}
            data-testid={"grid-error-card"}
            backgroundImage={errorBackground}
        >
            <PokemonName className={"error-background"}>
                {"Seems like there's no cards to display try again later"}
            </PokemonName>
        </PokemonCard>
    );
};

export default GridErrorCard;