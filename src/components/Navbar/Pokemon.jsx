import { Form } from "react-bootstrap";
import styled from "@emotion/styled";

const Bar = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #dc143c;
    border: 2px solid #dc143c;
    border-style: outset;
    color: #fff;
`;

const NavContainer = styled.div`  
    &.poke-logo {
        img {
            width: 100%;
        }
    }
`;

const NavSection = styled.section``;

const PokemonSearchInput = styled(Form.Control)`
    
`;

export {
    Bar,
    NavContainer,
    NavSection,
    PokemonSearchInput
}