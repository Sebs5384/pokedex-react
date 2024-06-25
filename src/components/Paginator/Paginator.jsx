import styled from "@emotion/styled";
import PaginatorButton from "./PaginatorButton";

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

function Paginator({ totalPages, currentPage, setCurrentPage }) {
    return (
        <PaginatorContainer className="pagination justify-content-center">
            <Pagination className="page-item">
                <PaginatorButton onClick={() => setCurrentPage(currentPage - 1)}>Previous</PaginatorButton>
                {totalPages.map((pageNumber) => (
                    <PaginatorButton key={pageNumber} isHidden={!(pageNumber >= currentPage - 1 && pageNumber <= currentPage + 2)} onClick={() => setCurrentPage(pageNumber)}>{pageNumber}</PaginatorButton>   
                ))}
                <PaginatorButton onClick={() => setCurrentPage(currentPage + 1)}>Next</PaginatorButton>
            </Pagination>
        </PaginatorContainer>
    );
};

export default Paginator;