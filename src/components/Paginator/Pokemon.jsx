import { Form, OverlayTrigger, Popover } from "react-bootstrap";
import styled from "@emotion/styled";

const PaginatorContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    margin-left: 135px;
`;

const Pagination = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 480px) {
        width: 45%;
    }

    @media (min-width: 481px) and (max-width: 520px) {
        width: 50%;
    }
`;

const PaginationLink = styled.a`
    margin: 0.1rem;
    color: black;
    
    &:focus,
    &:hover {
        color: black;
        border-color: #dc143c;
        box-shadow: 0 0 10px #dc143c;
    }
    &.hidden {
        display: none;
    }
    &.disabled {
        cursor: not-allowed;
    }

    @media (max-width: 480px) {
        font-size: 6px;
    }

    @media (min-width: 481px) and (max-width: 520px) {
        font-size: 7px;
    }
`;

const PaginatorSearchboxInput = styled(Form.Control)`
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-left: 5rem;
    padding: 0.5rem;
    font-size: 10px;
    border: 2px solid #dc143c;

    &:focus {
        color: #dc143c;
        box-shadow: none;
        border-color: #dc143c;
        background-color: white; 
    }

    &:hover {
        color: black;
        border-color: #dc143c;
        box-shadow: 0 0 10px #dc143c;
    }

    @media (max-width: 480px) {
        width: 40px;
        height: 40px;
        font-size: 7px;
    }

    @media (min-width: 481px) and (max-width: 520px) {
        width: 45px;
        height: 45px;
        font-size: 8px;
    }
`;

const PaginationOverlayTrigger = styled(OverlayTrigger)``;

const PaginationSearchboxPopover = styled(Popover)``;

const PaginationSearchboxPopoverBody = styled(Popover.Body)``;

export {
    PaginatorContainer,
    Pagination,
    PaginationLink,
    PaginatorSearchboxInput,
    PaginationOverlayTrigger,
    PaginationSearchboxPopover,
    PaginationSearchboxPopoverBody
};