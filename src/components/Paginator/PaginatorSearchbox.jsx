import { PaginationSearchboxPopover, PaginationSearchboxPopoverBody, PaginatorSearchboxInput, PaginationOverlayTrigger } from "./Pokemon";

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

export default PaginatorSearchbox;