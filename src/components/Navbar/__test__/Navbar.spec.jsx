import { render, screen, fireEvent } from "@testing-library/react";
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
        const mockedContextValue = {
            card: {
                handleSelectedCard: jest.fn(),
            },
            searchbox: {
                filteredPokemons: ["bulbasaur", "squirtle", "charmander"],
                dropdownVisibility: false,
            },
            catchPokemon: {
                caughtPokemons: [null, null, null],
            },
            error: {
                errorMessageVisibility: false,
            }   
        };

        const { rerender } = render(<Navbar />, { wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper> });
        
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
        const firstSlot = screen.getByTestId("caught-pokemon-0");
        expect(firstSlot).toBeInTheDocument();
        const secondSlot = screen.getByTestId("caught-pokemon-1");
        expect(secondSlot).toBeInTheDocument();
        const thirdSlot = screen.getByTestId("caught-pokemon-2");
        expect(thirdSlot).toBeInTheDocument();

        expect(navbar).toBeVisible();
        expect(navbarLogo).toBeVisible();
        expect(navbarSearchbox).toBeVisible();
        expect(pokeballButton).toBeVisible();
        expect(pokeballButton).not.toBeDisabled();
        expect(navbarPokeSlot).toBeVisible(); 
    
        rerender(<Navbar />, { wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper> });
        
        expect(navbar).toBeVisible();
        expect(navbarLogo).toBeVisible();
        expect(navbarSearchbox).toBeVisible();
        expect(pokeballButton).toBeVisible();
        expect(pokeballButton).not.toBeDisabled();
        expect(navbarPokeSlot).toBeVisible();
    });

    it("Should re-direct to home page on click on logo", () => {
        const reloadMock = jest.fn();
        Object.defineProperty(window, "location",
            { value: { reload: reloadMock } },
            { writable: true },
        );
        const mockedContextValue = {
            card: {
                handleSelectedCard: jest.fn(),
            },
            searchbox: {
                filteredPokemons: [],
            },
            catchPokemon: {
                isShaking: false,
            },
            error: {
                errorMessageVisibility: false,
            }
        };

        render(<Navbar />, { wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper> });
        const navbarLogo = screen.getByTestId("navbar-logo");
        expect(navbarLogo).toBeInTheDocument();
        const logoImage = screen.getByTestId("logo-image");
        expect(logoImage).toBeInTheDocument();

        fireEvent.click(logoImage);
        expect(reloadMock).toHaveBeenCalled();
    });

    it("Should display and hide the searchbox dropdown on click", () => {
        const mockedContextValue = {
            card: {
                handleSelectedCard: jest.fn(),
            },
            searchbox: {
                filteredPokemons: ["bulbasaur", "squirtle", "charmander"],
                dropdownVisibility: false,
            },
            error: {
                errorMessageVisibility: false,
            },
            catchPokemon: {
                isShaking: false,
            },
        };

        const { rerender } = render(<Navbar />, { wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper> });

        const navbar = screen.getByTestId("navbar-section");
        const navbarSearchbox = screen.getByTestId("navbar-search-input");
        expect(navbarSearchbox).toBeInTheDocument();
        fireEvent.click(navbarSearchbox);
        mockedContextValue.searchbox.dropdownVisibility = true;

        rerender(<Navbar />, { wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper> });

        const navbarDropdown = screen.getByTestId("navbar-dropdown-menu");
        expect(navbarDropdown).toBeInTheDocument();
        expect(navbarDropdown).toBeVisible();
        expect(navbarDropdown).toHaveTextContent("bulbasaur");
        expect(navbarDropdown).toHaveTextContent("squirtle");
        expect(navbarDropdown).toHaveTextContent("charmander");

        fireEvent.click(navbar);
        mockedContextValue.searchbox.dropdownVisibility = false;

        rerender(<Navbar />, { wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper> });

        expect(navbarDropdown).not.toBeInTheDocument();
    });

    it("Should display no pokemons found message on the searchbox when an empty list is returned", () => {
        const mockedContextValue = {
            card: {
                handleSelectedCard: jest.fn(),
            },
            searchbox: {
                filteredPokemons: [],
                dropdownVisibility: true,
            },
            error: {
                errorMessageVisibility: false,
            },
            catchPokemon: {
                isShaking: false,
            },
        };

        render(<Navbar />, { wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper> });
        const navbarSearchbox = screen.getByTestId("navbar-search-input");
        expect(navbarSearchbox).toBeInTheDocument();
        
        const noPokemonsFoundMessage = screen.getByText("No pokemons found");
        expect(noPokemonsFoundMessage).toBeInTheDocument();
        expect(noPokemonsFoundMessage).toBeVisible();
    });

    it("Should fill a pokemon slot upon clicking the pokeball button", () => {
        const mockedContextValue = {
            card: {
                handleSelectedCard: jest.fn(),
            },
            searchbox: {
                filteredPokemons: [],
            },
            catchPokemon: {
                caughtPokemons: [null, null, null],
                caughtPokemonSprite: [],
                handlePokeballClick: jest.fn(),
            },
            error: {
                errorMessageVisibility: false,
            }
        };

        const { rerender } = render(<Navbar />, { wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper> });
        const pokeballButton = screen.getByTestId("pokeball-button");
        expect(pokeballButton).toBeInTheDocument();

        const firstSlot = screen.getByTestId("caught-pokemon-0");
        const secondSlot = screen.getByTestId("caught-pokemon-1");
        const thirdSlot = screen.getByTestId("caught-pokemon-2");
        expect(firstSlot).toBeInTheDocument();
        expect(secondSlot).toBeInTheDocument();
        expect(thirdSlot).toBeInTheDocument();

        fireEvent.click(pokeballButton);
        expect(mockedContextValue.catchPokemon.handlePokeballClick).toHaveBeenCalled();
        mockedContextValue.catchPokemon.caughtPokemons[0] = { fullName: "bulbasaur" };
        mockedContextValue.catchPokemon.caughtPokemonSprite[0] = { current: "bulbasaur.png" };
        
        rerender(<Navbar />, { wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper> });

        expect(firstSlot).toBeInTheDocument();
        expect(firstSlot).toHaveAttribute("src", "bulbasaur.png");
        expect(secondSlot).toBeInTheDocument();
        expect(thirdSlot).toBeInTheDocument();

        fireEvent.click(pokeballButton);
        expect(mockedContextValue.catchPokemon.handlePokeballClick).toHaveBeenCalled();
        mockedContextValue.catchPokemon.caughtPokemons[1] = { fullName: "squirtle" };
        mockedContextValue.catchPokemon.caughtPokemonSprite[1] = { current: "squirtle.png" };

        rerender(<Navbar />, { wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper> });

        expect(firstSlot).toBeInTheDocument();
        expect(firstSlot).toHaveAttribute("src", "bulbasaur.png");
        expect(secondSlot).toBeInTheDocument();
        expect(secondSlot).toHaveAttribute("src", "squirtle.png");
        expect(thirdSlot).toBeInTheDocument();

        fireEvent.click(pokeballButton);
        expect(mockedContextValue.catchPokemon.handlePokeballClick).toHaveBeenCalled();
        mockedContextValue.catchPokemon.caughtPokemons[2] = { fullName: "charmander" };
        mockedContextValue.catchPokemon.caughtPokemonSprite[2] = { current: "charmander.png" };

        rerender(<Navbar />, { wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper> });

        expect(firstSlot).toBeInTheDocument();
        expect(firstSlot).toHaveAttribute("src", "bulbasaur.png");
        expect(secondSlot).toBeInTheDocument();
        expect(secondSlot).toHaveAttribute("src", "squirtle.png");
        expect(thirdSlot).toBeInTheDocument();
        expect(thirdSlot).toHaveAttribute("src", "charmander.png");

        fireEvent.click(pokeballButton);
        expect(mockedContextValue.catchPokemon.handlePokeballClick).toHaveBeenCalled();

        rerender(<Navbar />, { wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper> });

        expect(firstSlot).toBeInTheDocument();
        expect(firstSlot).toHaveAttribute("src", "bulbasaur.png");
        expect(secondSlot).toBeInTheDocument();
        expect(secondSlot).toHaveAttribute("src", "squirtle.png");
        expect(thirdSlot).toBeInTheDocument();
        expect(thirdSlot).toHaveAttribute("src", "charmander.png");
    });

    it("Should not render the navbar slots if an empty array is passed", () => {
        const mockedContextValue = {
            card: {
                handleSelectedCard: jest.fn(),
            },
            searchbox: {
                filteredPokemons: [],
            },
            catchPokemon: {
                caughtPokemons: [],
            },
            error: {
                errorMessageVisibility: false,
            }
        };

        render(<Navbar />, { wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper> });
        const navbarPokeSlots = screen.getByTestId("navbar-poke-slot");
        const pokeballButton = screen.getByTestId("pokeball-button");
        expect(navbarPokeSlots).toBeInTheDocument();
        expect(navbarPokeSlots.childElementCount).toBe(0);

        fireEvent.click(pokeballButton);

        expect(navbarPokeSlots.childElementCount).toBe(0);
    });

    it("Should call handleSelected card when clicking on a filled pokemon slot", () => {
        const mockedContextValue = {
            card: {
                handleSelectedCard: jest.fn(),
            },
            searchbox: {
                filteredPokemons: [],
            },
            catchPokemon: {
                caughtPokemons: [{ fullName: "charmander" }, null, null],
                caughtPokemonSprite: [{ current: "charmander.png "}],
            },
            error: {
                errorMessageVisibility: false,
            }
        };

        render(<Navbar />, { wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper> });
    
        const firstSlot = screen.getByTestId("caught-pokemon-0");
        fireEvent.click(firstSlot);

        expect(mockedContextValue.card.handleSelectedCard).toHaveBeenCalledTimes(1);
        expect(mockedContextValue.card.handleSelectedCard).toHaveBeenCalledWith("charmander");
    });

    it("Should call handleSelectedCard when a pokemon in the list is clicked", () => {
        const mockedContextValue = {
            card: {
                handleSelectedCard: jest.fn(),
            },
            searchbox: {
                filteredPokemons: ["bulbasaur", "squirtle", "charmander"],
                dropdownVisibility: true,
            },
            catchPokemon: {
                isShaking: false,
            },
            error: {
                errorMessageVisibility: false,
            }
        };

        render(<Navbar />, { wrapper: ({ children }) => <Wrapper value={mockedContextValue}>{children}</Wrapper> });

        const navbarDropdownMenu = screen.getByTestId("navbar-dropdown-menu");
        expect(navbarDropdownMenu).toBeInTheDocument();

        const bulbasaur = screen.getByText("bulbasaur");
        fireEvent.mouseDown(bulbasaur);

        expect(mockedContextValue.card.handleSelectedCard).toHaveBeenCalledTimes(1);
        expect(mockedContextValue.card.handleSelectedCard).toHaveBeenCalledWith("bulbasaur");
    });
});