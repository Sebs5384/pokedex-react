import { PaginationLink } from "./Pokemon";
import cx from "classnames";
import PropTypes from "prop-types";

function PaginatorButton({ children, isHidden, isDisabled, dataAttribute, onClick = () => {} }) {
    return (
        <PaginationLink 
            className={cx("page-link", 
                { 
                  "hidden": isHidden,
                  "disabled": isDisabled
                }
            )} 
            href="#" 
            onClick={onClick}
            data-cy={dataAttribute}
        >
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