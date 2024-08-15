import { Form, InputGroup } from "react-bootstrap";
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
    }
`;

export {
    Bar,
    NavContainer,
    NavSection,
    NavInputGroup,
    NavInputGroupText,
    NavForm
};