import { PaginationLink } from "./Pokemon";
import cx from "classnames";
import PropTypes from "prop-types";

function PaginatorButton({ children, isHidden, isDisabled, dataAttribute, setPage }) {
    return (
        <PaginationLink 
            className={cx("page-link", 
                { 
                  "hidden": isHidden,
                  "disabled": isDisabled
                }
            )} 
            href="#"
            onClick={isDisabled ? () => {} : setPage}
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
    dataAttribute: PropTypes.string,
    setPage: PropTypes.func
};


export default PaginatorButton;