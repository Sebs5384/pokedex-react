import { PokemonModal } from "./Pokemon";
import PokemonCardHeader from "./PokemonCardHeader";
import PokemonCardBody from "./PokemonCardBody";
import PokemonCardFooter from "./PokemonCardFooter";
import LoadingPokemonAlert from "./LoadingPokemonAlert";

function PokemonCard({visibility, handleClose, selectedCard, pokemonSprite, loadingCard, selectPreviousEvolution }) { 
    if(!selectedCard) return null;

    return(
        <>
            {loadingCard ? <LoadingPokemonAlert showModal={loadingCard} /> : 
                <PokemonModal show={visibility} onHide={handleClose} backgroundTexture={selectedCard.backgroundTexture}>   
                    <PokemonCardHeader 
                        selectedCard={selectedCard} 
                        pokemonSprite={pokemonSprite} 
                        closeModal={handleClose} 
                        selectPreviousEvolution={selectPreviousEvolution}
                    />
                    <PokemonCardBody selectedCard={selectedCard} pokemonSprite={pokemonSprite}/>
                    <PokemonCardFooter selectedCard={selectedCard}/>
                </PokemonModal>
            }
        </>
    );
};

export default PokemonCard;
