import { usePokedexContext } from "../../../context/PokedexContext";
import { PokemonCardModal } from "../Pokemon";
import PokemonCardHeader from "./PokemonCardHeader";
import PokemonCardBody from "./PokemonCardBody";
import PokemonCardFooter from "./PokemonCardFooter";
import LoadingPokemonAlert from "./LoadingPokemonAlert";
import ErrorMessage from "../ErrorMessage";

function PokemonCard() {
    const { card, error } = usePokedexContext();

    return(
        <>
            { card.loadingCard ? 
                <LoadingPokemonAlert 
                    alertVisibility={card.loadingCard} 
                    alertText={card.loadingCardText}
                /> 
            : card.cardError || card.cardSpeciesError ? 
                <ErrorMessage 
                    errorCauseMessage={error.errorCauseMessage}
                    errorText={error.errorMessage}
                    errorMessageVisibility={error.cardErrorMessageVisibility}
                    closeErrorModal={error.handleCloseErrorMessage}
                />
            : card.cardData && card.cardData.id ? 
                <PokemonCardModal 
                    show={card.modalVisibility} 
                    onHide={card.handleCloseCard} 
                    backgroundTexture={card.cardData?.backgroundTexture}
                    data-cy={"pokemon-card-modal"}
                    data-testid={"pokemon-card-modal"}
                >   
                    <PokemonCardHeader 
                        selectedCard={card.cardData} 
                        pokemonSprite={card.pokemonSprite} 
                        closeModal={card.handleCloseCard} 
                        selectPreviousEvolution={card.handleSelectedCard}
                    />
                    <PokemonCardBody 
                        selectedCard={card.cardData} 
                        pokemonSprite={card.pokemonSprite}
                    />
                    <PokemonCardFooter 
                        selectedCard={card.cardData}
                    />
                </PokemonCardModal>
            : card.emptyCardData && 
                <ErrorMessage 
                    errorCauseMessage={card.emptyCardData.emptyErrorCause}
                    errorText={card.emptyCardData.emptyErrorMessage}
                    errorMessageVisibility={true}
                    closeErrorModal={error.handleCloseErrorMessage}
                />
            }
        </>
    );
};

export default PokemonCard;
