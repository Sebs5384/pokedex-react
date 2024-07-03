import styled from "@emotion/styled";
import PaginatorButton from "./PaginatorButton";
import PropTypes from "prop-types";

const PaginatorContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
`;

const Pagination = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
`;

function Paginator({ totalPages, currentPage, firstPage, lastPage, nextPage, previousPage, setCurrentPage, setHiddenRange }) {  
    return (
        <PaginatorContainer className="pagination justify-content-center">
            <Pagination className="page-item">
                <PaginatorButton onClick={() => previousPage()} isDisabled={currentPage === firstPage}>Previous</PaginatorButton>
                {totalPages.map((pageNumber) => (
                    <PaginatorButton 
                        key={pageNumber} 
                        isHidden={setHiddenRange(pageNumber, currentPage)}
                        isActive={pageNumber === currentPage} 
                        onClick={() => setCurrentPage(pageNumber)}>
                        {pageNumber}
                    </PaginatorButton>   
                ))}
                <PaginatorButton onClick={() => nextPage()} isDisabled={currentPage === lastPage}>Next</PaginatorButton>
            </Pagination>
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