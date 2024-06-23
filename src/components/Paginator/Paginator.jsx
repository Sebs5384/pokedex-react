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

function Paginator({ totalPages, currentPage, setCurrentPage, setTotalPages }) {
    const generatePageNumbers = () => {
        return Array.from({ length: totalPages }, (_, index) => index + 1);
    };

    const pageNumbers = generatePageNumbers();

    return (
        <PaginatorContainer className="pagination justify-content-center">
            <Pagination className="page-item">
                <PaginatorButton>Previous</PaginatorButton>
                {pageNumbers.map((pageNumber) => (
                    <PaginatorButton key={pageNumber}>
                        {pageNumber}
                    </PaginatorButton>
                ))};
                <PaginatorButton>Next</PaginatorButton>
            </Pagination>
        </PaginatorContainer>
    );
};

export default Paginator;