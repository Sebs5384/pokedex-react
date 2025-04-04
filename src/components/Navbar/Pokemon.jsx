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

    @media (max-width: 480px) {
        height: 60px
    }
`;

const NavSection = styled.section`
`;

const NavContainer = styled.div`
    &.poke-logo {
        img {
            width: 175px;
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

    @media (max-width: 480px) {
        &.poke-logo {
            width: 75px;

            img {
                width: 65px;
                height: 30px;
                margin-right: 25px;
            }
        }

        &.poke-slot {
            display: flex;
            img {
                width: 30px;
                height: 30px;
                margin-right: 15px;
            }
        }

        &.catch-pokemon {
            display: none;
        }
    }

    @media (min-width: 481px) and (max-width: 520px) {
        &.poke-logo {
            img {
                width: 90px;
                height: 30px;
                margin-right: 20px;
            }
        }

        &.poke-slot {
            display: flex;
            img {
                width: 30px;
                height: 30px;
                margin-right: 15px;
            }
        }
        
        &.catch-pokemon {
            display: none;
        }
    }

    @media (min-width: 521px) and (max-width: 820px) {
        &.poke-logo {
            img {
                width: 100px;
                height: 30px;
                margin-right: 20px;
            }
        }

        &.poke-slot {
            display: flex;
            img {
                width: 30px;
                height: 30px;
                margin-right: 20px;
            }
        }

        &.catch-pokemon {
            display: none;
        }
    }

    @media (min-width: 821px) and (max-width: 1060px) {
        &.poke-logo {
            img {
                width: 100px;
                height: 30px;
                margin-right: 20px;
            }
        }

        &.poke-slot {
            display: flex;
            img {
                width: 30px;
                height: 30px;
                margin-right: 20px;
            }
        }

        &.catch-pokemon {
            width: 20%;
        }
    }
`;

const NavInputGroup = styled(InputGroup)`
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
`;

const NavInputGroupText = styled(InputGroup.Text)`
    &.magnifier {
        img {
            width: 25px;
            height: 24px;
        }
    }

    @media (max-width: 480px) {
        display: none;
    }

    @media (min-width: 481px) and (max-width: 940px) {
        display: none;
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

    @media (max-width: 480px) {
        &.pokedex-search-box {
            width: 125px;
            height: 28px;
            border-radius: 0px;

            &::placeholder {
                font-size: 10px;
            }
        }
    }

    @media (min-width: 481px) and (max-width: 520px) {
        &.pokedex-search-box {
            width: 150px;
            height: 28px;
            border-radius: 0px;
            
            &::placeholder {
                font-size: 11px;
            }
        }
    }

    @media (min-width: 521px) and (max-width: 580px) {
        &.pokedex-search-box {
            width: 175px;
            height: 28px;
            border-radius: 0px;
            
            &::placeholder {
                font-size: 11px;
            }
        }
    }

    @media (min-width: 581px) and (max-width: 640px) {
        &.pokedex-search-box {
            width: 200px;
            height: 32px;
            border-radius: 0px;

            &::placeholder {
                font-size: 11px;
            }
        }
    }

    @media (min-width: 641px) and (max-width: 700px) {
        &.pokedex-search-box {
            width: 275px;
            height: 32px;
            border-radius: 0px;
            
            &::placeholder {
                font-size: 11px;
            }
        }
    }

    @media (min-width: 701px) and (max-width: 820px) {
        &.pokedex-search-box {
            width: 300px;
            height: 32px;
            border-radius: 0px;
            
            &::placeholder {
                font-size: 11px;
            }
        }
    }

    @media (min-width: 821px) and (max-width: 940px) {
        &.pokedex-search-box {
            width: 300px;
            height: 40px;
            border-radius: 0px;
            
            &::placeholder {
                font-size: 13px;
            }
        }
    }

    @media (min-width: 941px) and (max-width: 1060px) {
        &.pokedex-search-box {
            width: 300px;
            height: 38px;
            border-radius: 0px;
            
            &::placeholder {
                font-size: 13px;
            }
        }
    }
`;

const PokeballButton = styled(({ backgroundImage, ...rest}) => <Button {...rest}/>)`
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

    &.poke-shake {
        animation: poke-shake 5s;
        pointer-events: none;
        opacity: 0.5;
    }

    @media (max-width: 480px) {
        width: 10px;
        height: 30px;
    }

    @media (min-width: 481px) and (max-width: 520px) {
        width: 30px;
        height: 30px;
    }

    @media (min-width: 521px) and (max-width: 580px) {
        width: 30px;
        height: 30px;
    }

    @media (min-width: 581px) and (max-width: 1060px) {
        width: 32px;
        height: 32px;
    }

    @keyFrames poke-shake {
        0% {
            transform: translateX(0);
        }
        10% {
            transform: translateX(-15px) rotateZ(-15deg);
        }
        20% {
            transform: translateX(15px) rotateZ(15deg);
        }
        30% {
            transform: translateX(-10px) rotateZ(-10deg);
        }
        40% {
            transform: translateX(10px) rotateZ(10deg);
        }
        50% {
            transform: translateX(-5px) rotateZ(-5deg);
        }
        60% {
            transform: translateX(10px) rotateZ(10deg);
        }
        70% {
            transform: translateX(-10px) rotateZ(-10deg);
        }
        80% {
            transform: translateX(15px) rotateZ(15deg);
        }
        90% {
            transform: translateX(-15px) rotateZ(-15deg);
        }
        100% {
            transform: translateX(0) rotateZ(0);
        }
    }
`;

const NavDropdown = styled(Dropdown)`
`;

const NavDropdownMenu = styled(Dropdown.Menu)`
    max-height: 250px;
    width: 96%;
    overflow-y: scroll;

    @media (max-width: 480px) {
        width: 88% !important;
        min-width: unset !important;
        font-size: 10px;
    }

    @media (min-width: 481px) and (max-width: 520px) {
        width: 89% !important;
        min-width: unset !important;
        font-size: 11px;
    }

    @media (min-width: 521px) and (max-width: 640px) {
        width: 92% !important;
        min-width: unset !important;
        font-size: 12px;
    }

    @media (min-width: 641px) and (max-width: 940px) {
        width: 94% !important;
        min-width: unset !important;
        font-size: 12px;
    }

    @media (min-width: 941px) and (max-width: 1024px) {
        width: 95% !important;
        min-width: unset !important;
        font-size: 12px;
    }
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