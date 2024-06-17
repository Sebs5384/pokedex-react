import styled from "@emotion/styled";

const Footer = styled.footer`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
`;

function Paginator() {
    return (
        <Footer>
            <div className="row">
                <nav>
                    <ul className="pagination justify-content-center">
                        <li className="page-item">
                            <a className="page-link">Previous</a>
                        </li>
                        <li className="page-item">
                            <a className="page-link">1</a>
                        </li>
                        <li className="page-item">
                            <a className="page-link">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </Footer>
    );
};

export default Paginator;