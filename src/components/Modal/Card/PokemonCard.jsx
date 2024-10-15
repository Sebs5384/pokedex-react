import { usePokedexContext } from "../../../context/PokedexContext";
import { PokemonCardModal } from "../Pokemon";
import PokemonCardHeader from "./PokemonCardHeader";
import PokemonCardBody from "./PokemonCardBody";
import PokemonCardFooter from "./PokemonCardFooter";
import LoadingPokemonAlert from "./LoadingPokemonAlert";

function PokemonCard() {
    const {
        modalVisibility,
        handleCloseCard,
        cardData,
        pokemonSprite,
        loadingCard,
        handleSelectedCard,
    } = usePokedexContext();
    if(!cardData) return null;

    return(
        <>
            {loadingCard ? <LoadingPokemonAlert showModal={loadingCard} /> : 
                <PokemonCardModal 
                    show={modalVisibility} 
                    onHide={handleCloseCard} 
                    backgroundTexture={cardData.backgroundTexture}
                    data-cy={"pokemon-card-modal"}
                >   
                    <PokemonCardHeader 
                        selectedCard={cardData} 
                        pokemonSprite={pokemonSprite} 
                        closeModal={handleCloseCard} 
                        selectPreviousEvolution={handleSelectedCard}
                    />
                    <PokemonCardBody selectedCard={cardData} pokemonSprite={pokemonSprite}/>
                    <PokemonCardFooter selectedCard={cardData}/>
                </PokemonCardModal>
            }
        </>
    );
};

export default PokemonCard;
