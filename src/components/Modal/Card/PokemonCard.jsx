import { PokemonModal } from "./Pokemon";
import PokemonCardHeader from "./PokemonCardHeader";
import PokemonCardBody from "./PokemonCardBody";
import PokemonCardFooter from "./PokemonCardFooter";

function PokemonCard({show, handleClose, selectedCard, pokemonSprite}) { 
    if(!selectedCard) return null;

    return(
        <PokemonModal show={show} onHide={handleClose} backgroundTexture={selectedCard.backgroundTexture}>   
            <PokemonCardHeader selectedCard={selectedCard} pokemonSprite={pokemonSprite} closeModal={handleClose}/>
            <PokemonCardBody selectedCard={selectedCard} pokemonSprite={pokemonSprite}/>
            <PokemonCardFooter selectedCard={selectedCard} pokemonSprite={pokemonSprite}/>
        </PokemonModal>
    );
};

export default PokemonCard;
