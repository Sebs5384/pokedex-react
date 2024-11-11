import { usePokedexContext } from "../../../context/PokedexContext";
import { PokemonCardModal } from "../Pokemon";
import PokemonCardHeader from "./PokemonCardHeader";
import PokemonCardBody from "./PokemonCardBody";
import PokemonCardFooter from "./PokemonCardFooter";
import LoadingPokemonAlert from "./LoadingPokemonAlert";
import ErrorMessage from "../ErrorMessage";

function PokemonCard() {
    const {
        modalVisibility,
        cardData,
        pokemonSprite,
        loadingCard,
        loadingCardText,
        emptyCardData,
        cardError,
        cardSpeciesError,
        cardErrorMessageVisibility,
        errorCauseMessage,
        errorMessage,
        handleCloseCard,
        handleSelectedCard,
        handleCloseErrorMessage,
    } = usePokedexContext();

    return(
        <>
            { loadingCard ? 
                <LoadingPokemonAlert 
                    alertVisibility={loadingCard} 
                    alertText={loadingCardText}
                /> 
            : cardError || cardSpeciesError ? 
                <ErrorMessage 
                    errorCauseMessage={errorCauseMessage}
                    errorText={errorMessage}
                    errorMessageVisibility={cardErrorMessageVisibility}
                    closeErrorModal={handleCloseErrorMessage}
                />
            : cardData && cardData.id ? 
                <PokemonCardModal 
                    show={modalVisibility} 
                    onHide={handleCloseCard} 
                    backgroundTexture={cardData?.backgroundTexture}
                    data-cy={"pokemon-card-modal"}
                    data-testid={"pokemon-card-modal"}
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
            : emptyCardData && 
                <ErrorMessage 
                    errorCauseMessage={emptyCardData.emptyErrorCause}
                    errorText={emptyCardData.emptyErrorMessage}
                    errorMessageVisibility={true}
                    closeErrorModal={handleCloseErrorMessage}
                />
            }
        </>
    );
};

export default PokemonCard;
