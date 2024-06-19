import styled from "@emotion/styled";

const Navbar = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6rem;
    background-color: #dc143c;
    border: 2px solid #dc143c;
    border-style: outset;
    color: #fff;
`;

function Banner() {
    return (
        <Navbar>
            <h1>Pokedex</h1>
        </Navbar>
    );
};

export default Banner;