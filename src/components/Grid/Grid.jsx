import styled from "@emotion/styled";
import Card from "./Card";

const Section = styled.section`
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;
`;

const Wrapper = styled.div`
    width: 100%;
    max-width: 1260px;
    margin: 0 auto;
    padding: 1rem;
    background-color: #fff8dc;
    border: 3px solid rgb(250, 239, 176);
    border-style: outset;
    border-radius: 8px;
`;

const Body = styled.div`
    padding: 1rem;
`;

const Board = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
`;

function Grid({ cards, pokemonSprite, selectCard }) {
    return(
        <Section>
            <Wrapper>
                <Body>
                    <Board>
                        {cards && cards.results.map(({ name, url }, index) => 
                            <Card 
                                key={name}
                                id={index} 
                                pokemonName={name} 
                                image={pokemonSprite(url)}
                                selectCard={selectCard}
                            />
                        )}
                    </Board>
                </Body>
            </Wrapper>
        </Section>
    );
};

export default Grid;