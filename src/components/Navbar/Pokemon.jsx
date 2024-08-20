import { Form, InputGroup, Button } from "react-bootstrap";
import styled from "@emotion/styled";

const Bar = styled.nav`
    display: flex;
    padding: 0.5rem;
    align-items: center;
    background-color: #dc143c;
    border: 2px solid #dc143c;
    border-style: outset;
    color: #fff;
`;

const NavSection = styled.section`
`;

const NavContainer = styled.div`
    &.poke-logo {
        img {
            width: 225px;
            height: 60px;
            margin-right: 50px;
        }
    }

    &.poke-slot {
        img {
            background-size: cover;
            background-repeat: no-repeat;
            filter: drop-shadow(3px 1px 3px black);
            width: 55px;
            height: 55px;
            margin-right: 50px;
        }
    }

    &.catch-pokemon {
        img {
            width: 150px;
            height: 50px;
            margin-right: 100px;
        }
    }
`;

const NavInputGroup = styled(InputGroup)`
`;

const NavInputGroupText = styled(InputGroup.Text)`
    &.magnifier {
        img {
            width: 35px;
            height: 35px;
        }
    }
`;

const NavForm = styled(Form.Control)`
    &.search-input:focus {
        color: black;
        box-shadow: none;
        border-color: white;
    }

    &.pokedex-search-box {
        width: 400px;
        margin-right: 20px;
    }
`;

const PokeballButton = styled(Button)`
    background-image: url(${props => props.backgroundImage});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    filter: drop-shadow(3px 1px 3px black);
    border-color: black;
    border-radius: 50%;
    width: 55px;
    height: 55px;
    margin-right: 50px;
`;

export {
    Bar,
    NavContainer,
    NavSection,
    NavInputGroup,
    NavInputGroupText,
    NavForm,
    PokeballButton,
};