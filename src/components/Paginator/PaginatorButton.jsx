import styled from "@emotion/styled";
import cx from "classnames";

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
`;

function PaginatorButton({ children, isHidden, onClick = () => {} }) {
    return (
        <PaginationLink 
            className={cx("page-link", 
                { "hidden": isHidden }
            )} 
            href="#" 
            onClick={onClick}>
            {children}
        </PaginationLink>
    );
};

export default PaginatorButton;