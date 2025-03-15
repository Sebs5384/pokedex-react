import { usePokedexContext } from "../../context/PokedexContext";
import { GridSection, GridWrapper, GridBody, GridBoard } from "./Pokemon";
import LoadingGrid from "./LoadingGrid";
import GridCard from "./GridCard";
import GridErrorCard from "./GridErrorCard";

function Grid() {
    const { card, pagination } = usePokedexContext();

    return(
        <GridSection 
            data-cy={"grid-section"}
            data-testid={"grid-section"}
        >
            <GridWrapper >
                <GridBody>
                    <GridBoard 
                        data-cy={"grid-board"}
                        data-testid={"grid-board"}
                    >
                        {   pagination.loadingPokemons ? 
                                <LoadingGrid /> 
                            :
                            pagination.paginatorError ? 
                                <GridErrorCard />
                            :
                            pagination.pokemonsInPage && pagination.pokemonsInPage.length ? pagination.pokemonsInPage.map(({ name, sprite, id }) => 
                                <GridCard 
                                    key={name}
                                    id={id} 
                                    pokemonName={name} 
                                    image={sprite}
                                    backgroundImage={pagination.cardBackground}
                                    selectCard={card.handleSelectedCard}
                                />)
                            : 
                            pagination.noCards && !pagination.loadingPokemons ? 
                                <GridErrorCard />
                            :
                                <LoadingGrid />
                        }
                    </GridBoard>
                </GridBody>
            </GridWrapper>
        </GridSection>
    );
};

export default Grid;