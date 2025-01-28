import { PaginationSearchboxPopover, PaginationSearchboxPopoverBody, PaginatorSearchboxInput, PaginationOverlayTrigger } from "./Pokemon";
import PropTypes from "prop-types";

function PaginatorSearchbox({ onChange, onKeyDown, validationMessage, validationPopup }) {
    return (
        <PaginationOverlayTrigger 
            show={validationPopup} 
            placement="top" overlay={
                <PaginationSearchboxPopover id="popover-basic" data-testid="paginator-searchbox-popover">
                    <PaginationSearchboxPopoverBody data-testid="paginator-popover-message">{validationMessage}</PaginationSearchboxPopoverBody>
                </PaginationSearchboxPopover>
            }
        >
            <PaginatorSearchboxInput
                type="search"
                placeholder="Go"
                className="search-input form-control pokedex-search-box text-center"
                onChange={onChange}
                onKeyDown={onKeyDown}
                data-cy={"paginator-searchbox"}
                data-testid={"paginator-searchbox"}
            />
        </PaginationOverlayTrigger>
    );
};
PaginatorSearchbox.propTypes = {
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    validationMessage: PropTypes.string,
    validationPopup: PropTypes.bool
};

export default PaginatorSearchbox;