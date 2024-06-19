import styled from "@emotion/styled";

const PaginationLink = styled.a`
    margin: 0.1rem;
    color: black;
    &:focus,
    &:hover {
        color: black;
        border-color: #dc143c;
        box-shadow: 0 0 10px #dc143c;
    }
`;

function PaginationButton({ children, onClick = () => {} }) {
    return (
        <PaginationLink className="page-link" href="#" onClick={onClick}>{children}</PaginationLink>
    );
};

export default PaginationButton;