import { usePokedexContext } from "../../context/PokedexContext";
import PaginatorButton from "./PaginatorButton";
import PaginatorSearchbox from "./PaginatorSearchbox";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const PaginatorContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    margin-left: 135px;
`;

const Pagination = styled.nav`
    display: flex;
    justify-content: center;
    align-items: center;
`;

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
    } = usePokedexContext();
    
    return (
        <PaginatorContainer className="pagination justify-content-center">
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