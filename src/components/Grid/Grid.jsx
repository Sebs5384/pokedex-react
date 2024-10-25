import { usePokedexContext } from "../../context/PokedexContext";
import { GridSection, GridWrapper, GridBody, GridBoard } from "./Pokemon";
import LoadingGrid from "./LoadingGrid";
import GridCard from "./GridCard";
import GridErrorCard from "./GridErrorCard";
import cx from "classnames";

function Grid() {
    const {
        pokemonsInPage,
        handleSelectedCard,
        loadingPokemons,
        paginatorError: noPokemonsFromPagination,
        noCards: noCardsFromPagination,
    } = usePokedexContext();

    return(
        <GridSection data-cy={"grid-section"}>
            <GridWrapper >
                <GridBody>
                    <GridBoard data-cy={"grid-board"}>
                        {loadingPokemons ? <LoadingGrid /> 
                            :
                            noPokemonsFromPagination ? 
                                <GridErrorCard />
                            :
                            pokemonsInPage && pokemonsInPage.length ? pokemonsInPage.map(({ name, sprite, id }) => 
                                <GridCard 
                                    key={name}
                                    id={id} 
                                    pokemonName={name} 
                                    image={sprite}
                                    selectCard={handleSelectedCard}
                                />)
                            : 
                            noCardsFromPagination ? 
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