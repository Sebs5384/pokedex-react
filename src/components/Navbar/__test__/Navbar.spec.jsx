import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { PokedexContext } from "../../../context/PokedexContext";
import Navbar from "../Navbar";
import "@testing-library/jest-dom";

describe("Navbar", () => {
    const Wrapper = ({ children, value }) => {
        return (
            <PokedexContext.Provider value={value}>
                {children}
            </PokedexContext.Provider>
        );
    };

    it("Should render Navbar properly", () => {
        const mockContextValue = {
            filteredPokemons: ["bulbasaur", "squirtle", "charmander"],
            dropdownVisibility: false,
            caughtPokemons: [null, null, null],
        };

        const { rerender } =render(<Navbar />, { wrapper: ({ children }) => <Wrapper value={mockContextValue}>{children}</Wrapper> });
        
        const navbar = screen.getByTestId("navbar-section");
        expect(navbar).toBeInTheDocument();
        const navbarLogo = screen.getByTestId("navbar-logo");
        expect(navbarLogo).toBeInTheDocument();
        const navbarSearchbox = screen.getByTestId("navbar-search-input");
        expect(navbarSearchbox).toBeInTheDocument();
        const pokeballButton = screen.getByTestId("pokeball-button");
        expect(pokeballButton).toBeInTheDocument();
        const navbarPokeSlot = screen.getByTestId("navbar-poke-slot");
        expect(navbarPokeSlot).toBeInTheDocument();
        const caughtPokemons = screen.getAllByTestId("caught-pokemon"); 

        expect(navbar).toBeVisible();
        expect(navbarLogo).toBeVisible();
        expect(navbarSearchbox).toBeVisible();
        expect(pokeballButton).toBeVisible();
        expect(pokeballButton).not.toBeDisabled();
        expect(navbarPokeSlot).toBeVisible();
        expect(caughtPokemons).toHaveLength(3); 
    
        rerender(<Navbar />, { wrapper: ({ children }) => <Wrapper value={mockContextValue}>{children}</Wrapper> });
        
        expect(navbar).toBeVisible();
        expect(navbarLogo).toBeVisible();
        expect(navbarSearchbox).toBeVisible();
        expect(pokeballButton).toBeVisible();
        expect(pokeballButton).not.toBeDisabled();
        expect(navbarPokeSlot).toBeVisible();
        expect(caughtPokemons).toHaveLength(3);
    });

    it("Should re-direct to home page on click on logo", () => {
        const mockContextValue = {
            filteredPokemons: [],
        };

        render(<Navbar />, { wrapper: ({ children }) => <Wrapper value={mockContextValue}>{children}</Wrapper> });
        const navbarLogo = screen.getByTestId("navbar-logo");
        expect(navbarLogo).toBeInTheDocument();

        fireEvent.click(navbarLogo);
        expect(window.location.pathname).toEqual("/");  
    });

    it("Should display and hide the searchbox dropdown on click", () => {
        const mockContextValue = {
            filteredPokemons: ["bulbasaur", "squirtle", "charmander"],
            dropdownVisibility: false,
        };

        const { rerender } = render(<Navbar />, { wrapper: ({ children }) => <Wrapper value={mockContextValue}>{children}</Wrapper> });

        const navbar = screen.getByTestId("navbar-section");
        const navbarSearchbox = screen.getByTestId("navbar-search-input");
        expect(navbarSearchbox).toBeInTheDocument();
        fireEvent.click(navbarSearchbox);
        mockContextValue.dropdownVisibility = true;

        rerender(<Navbar />, { wrapper: ({ children }) => <Wrapper value={mockContextValue}>{children}</Wrapper> });

        const navbarDropdown = screen.getByTestId("navbar-dropdown-menu");
        expect(navbarDropdown).toBeInTheDocument();
        expect(navbarDropdown).toBeVisible();
        expect(navbarDropdown).toHaveTextContent("bulbasaur");
        expect(navbarDropdown).toHaveTextContent("squirtle");
        expect(navbarDropdown).toHaveTextContent("charmander");

        fireEvent.click(navbar);
        mockContextValue.dropdownVisibility = false;

        rerender(<Navbar />, { wrapper: ({ children }) => <Wrapper value={mockContextValue}>{children}</Wrapper> });

        expect(navbarDropdown).not.toBeInTheDocument();
    });

    it("Should display no pokemons found message on the searchbox when an empty list is returned", () => {
        const mockContextValue = {
            filteredPokemons: [],
            dropdownVisibility: true,
        };

        render(<Navbar />, { wrapper: ({ children }) => <Wrapper value={mockContextValue}>{children}</Wrapper> });
        const navbarSearchbox = screen.getByTestId("navbar-search-input");
        expect(navbarSearchbox).toBeInTheDocument();
        
        const noPokemonsFoundMessage = screen.getByText("No pokemons found");
        expect(noPokemonsFoundMessage).toBeInTheDocument();
        expect(noPokemonsFoundMessage).toBeVisible();
    });
});