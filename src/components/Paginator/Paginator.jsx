import { usePokedexContext } from "../../context/PokedexContext";
import { Pagination, PaginatorContainer } from "./Pokemon";
import PaginatorButton from "./PaginatorButton";
import PaginatorSearchbox from "./PaginatorSearchbox";
import PropTypes from "prop-types";

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
        invalidPagePopup
    } = usePokedexContext();
    
    return (
        <PaginatorContainer 
            className="pagination justify-content-center" 
            data-cy={"pagination-section"}
        >
            <Pagination className="page-item">
                <PaginatorButton onClick={() => setPreviousPage()} isDisabled={currentPage === firstPage}>Previous</PaginatorButton>
                {totalPages.map((pageNumber) => (
                    <PaginatorButton 
                        key={pageNumber} 
                        isHidden={setItemRange(pageNumber, currentPage)}
                        isActive={pageNumber === currentPage} 
                        onClick={() => setCurrentPage(pageNumber)}>
                        {pageNumber}
                    </PaginatorButton>   
                ))}
                <PaginatorButton onClick={() => setNextPage()} isDisabled={currentPage === lastPage}>Next</PaginatorButton>
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
PropTypes.Paginator = {
    totalPages: PropTypes.array,
    currentPage: PropTypes.number,
    firstPage: PropTypes.number,
    lastPage: PropTypes.number,
    nextPage: PropTypes.func,
    previousPage: PropTypes.func,
    setCurrentPage: PropTypes.func,
    setHiddenRange: PropTypes.func
};

export default Paginator;