import { PaginationSearchboxPopover, PaginationSearchboxPopoverBody, PaginatorSearchboxInput, PaginationOverlayTrigger } from "./Pokemon";
import PropTypes from "prop-types";

function PaginatorSearchbox({ onChange, onKeyDown, validationMessage, validationPopup }) {
    return (
        <PaginationOverlayTrigger show={validationPopup} placement="top" overlay={
            <PaginationSearchboxPopover id="popover-basic">
                <PaginationSearchboxPopoverBody>{validationMessage}</PaginationSearchboxPopoverBody>
            </PaginationSearchboxPopover>
        }>
            <PaginatorSearchboxInput
                type="search"
                placeholder="Go"
                className="search-input form-control pokedex-search-box text-center"
                onChange={onChange}
                onKeyDown={onKeyDown}
            />
        </PaginationOverlayTrigger>
    );
};
PaginatorSearchbox.PropTypes = {
    onChange: PropTypes.func,
    onKeyDown: PropTypes.func,
    validationMessage: PropTypes.string,
    validationPopup: PropTypes.bool
};

export default PaginatorSearchbox;