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
        handleCloseCard,
        cardData,
        cardError,
        pokemonSprite,
        loadingCard,
        handleSelectedCard,
    } = usePokedexContext();

    return(
        <>
            {loadingCard ? 
                <LoadingPokemonAlert 
                    showModal={loadingCard} 
                /> 
            : cardError ? 
                <ErrorMessage 
                    error={cardError}
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
