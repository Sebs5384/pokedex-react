import styled from "@emotion/styled";
import Card from "./Card";

const Section = styled.section`
    display: flex;
    justify-content: center;
    margin-top: 0.5rem;
`;

const Board = styled.div`
    background-color: #fff8dc;
    border: 3px solid rgb(250, 239, 176);
    border-style: outset;
    border-radius: 8px;
`;

function Grid({}){
    
    return(
        <Section>
            <Board className="col-12 col-md-11 card-border text-center">
                
            </Board>
        </Section>
    );
};

export default Grid;