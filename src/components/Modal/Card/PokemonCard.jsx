import { PokemonModal } from "./Pokemon";
import PokemonCardHeader from "./PokemonCardHeader";
import PokemonCardBody from "./PokemonCardBody";
import PokemonCardFooter from "./PokemonCardFooter";
import LoadingPokemonCard from "./LoadingPokemonCard";

function PokemonCard({visibility, handleClose, selectedCard, pokemonSprite, loadingCard}) { 
    if(!selectedCard) return null;

    return(
        <>
            {loadingCard ? <LoadingPokemonCard showModal={loadingCard} /> : 
                <PokemonModal show={visibility} onHide={handleClose} backgroundTexture={selectedCard.backgroundTexture}>   
                    <PokemonCardHeader selectedCard={selectedCard} pokemonSprite={pokemonSprite} closeModal={handleClose}/>
                    <PokemonCardBody selectedCard={selectedCard} pokemonSprite={pokemonSprite}/>
                    <PokemonCardFooter selectedCard={selectedCard} pokemonSprite={pokemonSprite}/>
                </PokemonModal>
            }
        </>
    );
};

export default PokemonCard;
