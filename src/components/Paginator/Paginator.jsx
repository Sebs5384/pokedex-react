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

function Paginator() {
    return (
        <PaginatorContainer className="pagination justify-content-center">
            <Pagination className="page-item">
                <PaginatorButton>Previous</PaginatorButton>
                <PaginatorButton>1</PaginatorButton>
                <PaginatorButton>2</PaginatorButton>
                <PaginatorButton>3</PaginatorButton>
                <PaginatorButton>Next</PaginatorButton>
            </Pagination>
        </PaginatorContainer>
    );
};

export default Paginator;