import { usePokedexContext } from "../../context/PokedexContext";
import { Pagination, PaginatorContainer } from "./Pokemon";
import PaginatorButton from "./PaginatorButton";
import PaginatorSearchbox from "./PaginatorSearchbox";
import ErrorMessage from "../Modal/ErrorMessage";

function Paginator() { 
    const { pagination, error } = usePokedexContext();

    return (
        <PaginatorContainer 
            className="pagination justify-content-center" 
            data-cy={"pagination-section"}
            data-testid={"pagination-section"}
        >
            <Pagination className="page-item">
                <PaginatorButton 
                    setPage={() => pagination.setPreviousPage()} 
                    isDisabled={pagination.currentPage === pagination.firstPage} 
                    dataAttribute={"paginator-previous-button"}
                >
                    Previous
                </PaginatorButton>
                { pagination.paginatorError ?
                    <ErrorMessage 
                        errorCauseMessage={error.errorCauseMessage}
                        errorText={error.errorMessage}
                        errorMessageVisibility={error.paginatorErrorMessageVisibility}
                        closeErrorModal={error.handleCloseErrorMessage}
                    />
                :   pagination.totalPages && pagination.totalPages.map((pageNumber) => (
                    <PaginatorButton 
                        key={pageNumber} 
                        isHidden={pagination.setItemRange(pageNumber, pagination.currentPage)}
                        isActive={pageNumber === pagination.currentPage} 
                        setPage={() => pagination.setCurrentPage(pageNumber)}
                        dataAttribute={`page-${pageNumber}`}
                    >
                        {pageNumber}
                    </PaginatorButton>   
                ))}
                <PaginatorButton 
                    setPage={() => pagination.setNextPage()} 
                    isDisabled={pagination.currentPage === pagination.lastPage} 
                    dataAttribute={"paginator-next-button"}
                >
                    Next
                </PaginatorButton>
            </Pagination>
            <PaginatorSearchbox 
                onChange={(event) => pagination.setSearchboxValue(event)} 
                onKeyDown={(event) => pagination.handleKeyDown(event)}
                validationMessage={pagination.popupMessage}
                validationPopup={pagination.invalidPagePopup}
            />
        </PaginatorContainer>
    );
};

export default Paginator;