import { Form, InputGroup, Button, Dropdown } from "react-bootstrap";
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
            width: 150px;
            height: 50px;
            margin-right: 50px;
        }
    }

    &.poke-slot {
        img {
            background-size: cover;
            background-repeat: no-repeat;
            filter: drop-shadow(3px 1px 3px black);
            width: 45px;
            height: 45px;
            margin-right: 50px;
        }
    }

    &.catch-pokemon {
        img {
            width: 120px;
            height: 30px;
            margin-right: 75px;
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
    width: 50px;
    height: 50px;
    margin-right: 25px;
`;

const NavDropdown = styled(Dropdown)`
`;

const NavDropdownMenu = styled(Dropdown.Menu)`
    max-height: 250px;
    width: 96%;
    overflow-y: scroll;
`;

const NavDropdownItem = styled(Dropdown.Item)`
    text-transform: capitalize;
`;

export {
    Bar,
    NavContainer,
    NavSection,
    NavInputGroup,
    NavInputGroupText,
    NavForm,
    PokeballButton,
    NavDropdown,
    NavDropdownMenu,
    NavDropdownItem
};