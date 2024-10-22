import { usePokedexContext } from "../../context/PokedexContext";
import { Pagination, PaginatorContainer } from "./Pokemon";
import PaginatorButton from "./PaginatorButton";
import PaginatorSearchbox from "./PaginatorSearchbox";
import ErrorMessage from "../shared/ErrorMessage";

function Paginator() { 
    const {
        totalPages,
        currentPage,
        firstPage,
        lastPage,
        setNextPage,
        setPreviousPage,
        setCurrentPage,
        setItemRange,
        setSearchboxValue,
        handleKeyDown,
        popupMessage,
        invalidPagePopup,
        paginatorError,
        errorCauseMessage,
        errorMessage,
        paginatorErrorMessageVisibility,
        handleCloseErrorMessage
    } = usePokedexContext();
    
    return (
        <PaginatorContainer 
            className="pagination justify-content-center" 
            data-cy={"pagination-section"}
        >
            <Pagination className="page-item">
                <PaginatorButton onClick={() => setPreviousPage()} isDisabled={currentPage === firstPage} dataAttribute={"paginator-previous-button"}>Previous</PaginatorButton>
                { paginatorError ?
                    <ErrorMessage 
                        errorCauseMessage={errorCauseMessage}
                        errorText={errorMessage}
                        errorMessageVisibility={paginatorErrorMessageVisibility}
                        closeErrorModal={handleCloseErrorMessage}
                    />
                :   totalPages && totalPages.map((pageNumber) => (
                    <PaginatorButton 
                        key={pageNumber} 
                        isHidden={setItemRange(pageNumber, currentPage)}
                        isActive={pageNumber === currentPage} 
                        onClick={() => setCurrentPage(pageNumber)}
                        dataAttribute={`page-${pageNumber}`}>
                        {pageNumber}
                    </PaginatorButton>   
                ))}
                <PaginatorButton onClick={() => setNextPage()} isDisabled={currentPage === lastPage} dataAttribute={"paginator-next-button"}>Next</PaginatorButton>
            </Pagination>
            <PaginatorSearchbox 
                onChange={(event) => setSearchboxValue(event)} 
                onKeyDown={(event) => handleKeyDown(event)}
                validationMessage={popupMessage}
                validationPopup={invalidPagePopup}
            />
        </PaginatorContainer>
    );
};

export default Paginator;