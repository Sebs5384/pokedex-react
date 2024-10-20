import { usePokedexContext } from "../../../context/PokedexContext";
import { PokemonCardModal } from "../Pokemon";
import PokemonCardHeader from "./PokemonCardHeader";
import PokemonCardBody from "./PokemonCardBody";
import PokemonCardFooter from "./PokemonCardFooter";
import LoadingPokemonAlert from "./LoadingPokemonAlert";
import ErrorMessage from "../../shared/ErrorMessage";

function PokemonCard() {
    const {
        modalVisibility,
        cardErrorMessageVisibility,
        handleCloseCard,
        cardData,
        cardError,
        cardSpeciesError,
        errorCauseMessage,
        pokemonSprite,
        loadingCard,
        handleSelectedCard,
        handleCloseErrorMessage,
    } = usePokedexContext();

    return(
        <>
            {loadingCard ? 
                <LoadingPokemonAlert 
                    showModal={loadingCard} 
                /> 
            : cardError || cardSpeciesError ? 
                <ErrorMessage 
                    errorCauseMessage={errorCauseMessage}
                    errorText={"Something went wrong while loading the Pokemon card, please try again later."}
                    errorMessageVisibility={cardErrorMessageVisibility}
                    closeErrorModal={handleCloseErrorMessage}
                />
            : 
                <PokemonCardModal 
                    show={modalVisibility} 
                    onHide={handleCloseCard} 
                    backgroundTexture={cardData?.backgroundTexture}
                    data-cy={"pokemon-card-modal"}
                >   
                    <PokemonCardHeader 
                        selectedCard={cardData} 
                        pokemonSprite={pokemonSprite} 
                        closeModal={handleCloseCard} 
                        selectPreviousEvolution={handleSelectedCard}
                    />
                    <PokemonCardBody 
                        selectedCard={cardData} 
                        pokemonSprite={pokemonSprite}
                    />
                    <PokemonCardFooter 
                        selectedCard={cardData}
                    />
                </PokemonCardModal>
            }
        </>
    );
};

export default PokemonCard;
