import styled from "@emotion/styled";
import { Form } from "react-bootstrap";

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
`;

function PaginatorSearchbox({ onChange, onKeyDown }) {
    return (
        <PaginatorSearchboxInput
            type="search"
            placeholder="Go"
            className="search-input form-control pokedex-search-box text-center"
            onChange={onChange}
            onKeyDown={onKeyDown}
        />
    );
};

export default PaginatorSearchbox;