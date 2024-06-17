import styled from "@emotion/styled";

const Navbar = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem;
    background-color: #dc143c;
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