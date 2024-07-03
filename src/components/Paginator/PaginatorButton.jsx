import styled from "@emotion/styled";
import cx from "classnames";
import PropTypes from "prop-types";

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
`;

function PaginatorButton({ children, isHidden, isDisabled, onClick = () => {} }) {
    return (
        <PaginationLink 
            className={cx("page-link", 
                { 
                  "hidden": isHidden,
                  "disabled": isDisabled
                }
            )} 
            href="#" 
            onClick={onClick}>
            {children}
        </PaginationLink>
    );
};
PropTypes.PaginatorButton = {
    children: PropTypes.node,
    isHidden: PropTypes.bool,
    isDisabled: PropTypes.bool,
    onClick: PropTypes.func
};


export default PaginatorButton;