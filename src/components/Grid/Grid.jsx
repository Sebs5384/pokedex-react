import { usePokedexContext } from "../../context/PokedexContext";
import { GridSection, GridWrapper, GridBody, GridBoard } from "./Pokemon";
import LoadingGrid from "./LoadingGrid";
import GridCard from "./GridCard";

function Grid() {
    const {
        pokemonsInPage,
        handleSelectedCard,
        loadingPokemons
    } = usePokedexContext();

    return(
        <GridSection>
            <GridWrapper>
                <GridBody>
                    <GridBoard>
                        {loadingPokemons ? <LoadingGrid /> : 
                            pokemonsInPage && pokemonsInPage.map(({ name, sprite, id }) => 
                            <GridCard 
                                key={name}
                                id={id} 
                                pokemonName={name} 
                                image={sprite}
                                selectCard={handleSelectedCard}
                            />
                        )}
                    </GridBoard>
                </GridBody>
            </GridWrapper>
        </GridSection>
    );
};

export default Grid;