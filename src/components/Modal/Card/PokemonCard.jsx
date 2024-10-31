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
        cardData,
        pokemonSprite,
        loadingCard,
        cardError,
        cardSpeciesError,
        emptyCardData,
        errorCauseMessage,
        errorMessage,
        handleCloseCard,
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
                    errorText={errorMessage}
                    errorMessageVisibility={cardErrorMessageVisibility}
                    closeErrorModal={handleCloseErrorMessage}
                />
            : 
              cardData && cardData.id ? 
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
            :  
              emptyCardData && 
                <ErrorMessage 
                    errorCauseMessage={emptyCardData.emptyErrorCause}
                    errorText={emptyCardData.emptyErrorMessage}
                    errorMessageVisibility={true}
                    closeErrorModal={handleCloseCard}
                />
            }
        </>
    );
};

export default PokemonCard;
