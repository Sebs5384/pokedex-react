import { usePokedexContext } from "../../context/PokedexContext";
import { GridSection, GridWrapper, GridBody, GridBoard } from "./Pokemon";
import LoadingGrid from "./LoadingGrid";
import GridCard from "./GridCard";
import errorImage from "../../assets/img/misc/404-shocked.png"
import cx from "classnames";

function Grid() {
    const {
        pokemonsInPage,
        handleSelectedCard,
        loadingPokemons,
        paginatorError: noPokemonsFromPagination,
    } = usePokedexContext();

    return(
        <GridSection data-cy={"grid-section"}>
            <GridWrapper className={cx(
                noPokemonsFromPagination ? "no-cards-width" : null
            )}>
                <GridBody>
                    <GridBoard data-cy={"grid-board"}>
                        {loadingPokemons ? <LoadingGrid /> 
                            :
                            noPokemonsFromPagination ? 
                                <GridCard 
                                    key={"error"} 
                                    id={"0"} 
                                    pokemonName={"No pokemon cards found"} 
                                    image={errorImage}
                                />
                            :
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