import { render, screen } from "@testing-library/react";
import Searchbox from "../Searchbox";
import "@testing-library/jest-dom";

describe("Searchbox", () => {
    const propsMock = {
        filteredPokemons: [],
        dropdownVisibility: false,
        handleSearchPokemon: jest.fn(),
        handleInputFocus: jest.fn(),
        handleInputOnBlur: jest.fn(),
        selectPokemon: jest.fn(),
        searchboxError: false,
        errorCauseMessage: "",
        errorMessage: "",
        searchboxErrorMessageVisibility: false,
        handleCloseErrorMessage: jest.fn(),
    };

    it("Should render Searchbox correctly", () => {
        render(<Searchbox {...propsMock} />);

        const searchbox = screen.getByTestId("navbar-searchbox");
        const searchboxIcon = screen.getByTestId("navbar-searchbox-icon");
        const searchboxInput = screen.getByTestId("navbar-search-input");
        
        expect(searchbox).toBeInTheDocument();
        expect(searchboxIcon).toBeInTheDocument();
        expect(searchboxInput).toBeInTheDocument();

        expect(searchboxIcon).toHaveAttribute("src", "magnifier.png");
        expect(searchboxInput).toHaveAttribute("placeholder", "Search Pokemon");
    });

    it("Should render the filtered list of pokemons when the dropdown is visible", () => {
        render(<Searchbox 
            {...propsMock} 
            filteredPokemons={["testmeleon"]} 
            dropdownVisibility={true} 
        />);

        const searchbox = screen.getByTestId("navbar-searchbox");
        const searchboxInput = screen.getByTestId("navbar-search-input");
        const navbarDropdownMenu = screen.getByTestId("navbar-dropdown-menu");
        const dropdownItem = screen.getByTestId("dropdown-item");
        const dropdownPokemon = screen.getByText("testmeleon");

        expect(searchbox).toBeInTheDocument();
        expect(searchboxInput).toBeInTheDocument();
        expect(navbarDropdownMenu).toBeInTheDocument();
        expect(dropdownItem).toBeInTheDocument();
        expect(dropdownPokemon).toBeInTheDocument();

        expect(searchbox).toBeVisible();
        expect(searchboxInput).toBeVisible();
        expect(navbarDropdownMenu).toBeVisible();
        expect(dropdownItem).toBeVisible();
        expect(dropdownPokemon).toBeVisible();

        expect(searchboxInput).toHaveValue("");
        expect(navbarDropdownMenu).toHaveTextContent("testmeleon");
        expect(dropdownPokemon).toHaveTextContent("testmeleon");
    });

    it("Should render the not found items when the filtered list is empty", () => {
        render(<Searchbox 
            {...propsMock} 
            filteredPokemons={[]} 
            dropdownVisibility={true} 
        />);

        const searchbox = screen.getByTestId("navbar-searchbox");
        const searchboxInput = screen.getByTestId("navbar-search-input");
        const navbarDropdownMenu = screen.getByTestId("navbar-dropdown-menu");
        const dropdownItem = screen.getByTestId("dropdown-item");
        const dropdownPokemon = screen.getByText("No pokemons found");

        expect(searchbox).toBeInTheDocument();
        expect(searchboxInput).toBeInTheDocument();
        expect(navbarDropdownMenu).toBeInTheDocument();
        expect(dropdownItem).toBeInTheDocument();
        expect(dropdownPokemon).toBeInTheDocument();

        expect(searchbox).toBeVisible();
        expect(searchboxInput).toBeVisible();
        expect(navbarDropdownMenu).toBeVisible();
        expect(dropdownItem).toBeVisible();
        
        expect(searchboxInput).toHaveValue("");
        expect(navbarDropdownMenu).toHaveTextContent("No pokemons found");
        expect(dropdownPokemon).toHaveTextContent("No pokemons found");
    });

    it("Should render the error message modal when the searchbox error is true", () => {
        render(<Searchbox 
            {...propsMock}
            searchboxError={true}
            searchboxErrorMessageVisibility={true}   
            errorCauseMessage={"An error happened while loading the searchbox"}
            errorMessage={"Something went wrong"}  
        />);

        const searchbox = screen.getByTestId("navbar-searchbox");
        const searchboxInput = screen.getByTestId("navbar-search-input");
        const errorMessageModal = screen.getByTestId("error-message-modal");
        const errorCauseMessageText = screen.getByTestId("error-cause-message");
        const errorMessageText = screen.getByTestId("error-text");
        const errorCloseButton = screen.getByTestId("error-close-button");

        expect(searchbox).toBeInTheDocument();
        expect(searchboxInput).toBeInTheDocument();
        expect(errorMessageModal).toBeInTheDocument();
        expect(errorCauseMessageText).toBeInTheDocument();
        expect(errorMessageText).toBeInTheDocument();
        expect(errorCloseButton).toBeInTheDocument();

        expect(searchboxInput).toHaveValue("");
        expect(errorMessageModal).toBeVisible();
        expect(errorCauseMessageText).toHaveTextContent("An error happened while loading the searchbox");
        expect(errorMessageText).toHaveTextContent("Something went wrong");
        expect(errorCloseButton).toBeVisible();
    });

    it("Should render an empty dropdown when the searchbox error is true and the dropdown is visible", () => {
        render(<Searchbox 
            {...propsMock} 
            searchboxError={true}
            dropdownVisibility={true}
        />);

        screen.debug();
        const searchbox = screen.getByTestId("navbar-searchbox");
        const searchboxInput = screen.getByTestId("navbar-search-input");
        const dropdownMenu = screen.getByTestId("navbar-dropdown-menu");
        const dropdownItem = screen.getByTestId("dropdown-item");
        const dropdownPokemon = screen.getByText("No pokemons found");

        expect(searchbox).toBeInTheDocument();
        expect(searchboxInput).toHaveValue("");
        expect(dropdownMenu).toBeInTheDocument();
        expect(dropdownMenu).toBeVisible();
        expect(dropdownItem).toBeInTheDocument();
        expect(dropdownItem).toBeVisible();
        expect(dropdownPokemon).toBeInTheDocument();
        expect(dropdownPokemon).toBeVisible();
        expect(dropdownPokemon).toHaveTextContent("No pokemons found");
    });
});