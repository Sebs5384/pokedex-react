import { render, screen, fireEvent } from "@testing-library/react";
import Searchbox from "../Searchbox";
import "@testing-library/jest-dom";

describe("Searchbox", () => {
    it("Should render the searchbox correctly", () => {
        render(<Searchbox 
            filteredPokemons={["bulbasaur", "squirtle", "charmander"]}
            dropdownVisibility={false}
            handleSearchPokemon={() => {}}
            handleInputFocus={() => {}}
            handleInputOnBlur={() => {}}
            selectPokemon={() => {}}
            searchboxError={false}
            errorCauseMessage={""}
            errorMessage={""}
            searchboxErrorMessageVisibility={false}
            handleCloseErrorMessage={() => {}}
        />);

        const searchboxInput = screen.getByTestId("navbar-search-input");
        expect(searchboxInput).toBeInTheDocument();
        const searchboxIcon = screen.getByTestId("navbar-searchbox-icon");
        expect(searchboxIcon).toBeInTheDocument();
    });

    it("Should search for a pokemon when using the searchbox input", () => {
        const mockedHandleSearchPokemon = jest.fn();
        render(<Searchbox 
            handleSearchPokemon={mockedHandleSearchPokemon}
        />)

        const searchboxInput = screen.getByTestId("navbar-search-input");
        expect(searchboxInput).toBeInTheDocument();

        fireEvent.change(searchboxInput, { target: { value: "b" } });
        expect(mockedHandleSearchPokemon).toHaveBeenCalledTimes(1);

        fireEvent.change(searchboxInput, { target: { value: "bu" } });
        expect(mockedHandleSearchPokemon).toHaveBeenCalledTimes(2);

        fireEvent.change(searchboxInput, { target: { value: "bul" } });
        expect(mockedHandleSearchPokemon).toHaveBeenCalledTimes(3);

        fireEvent.change(searchboxInput, { target: { value: "" } });
        expect(mockedHandleSearchPokemon).toHaveBeenCalledTimes(4);
    });

    it("Should filter the pokemon list when using the searchbox input", () => {
        const mockedFilteredPokemons = ["bulbasaur", "squirtle", "charmander"];
        const mockedHandleSearchPokemon = jest.fn((searchTerm) => {
            return mockedFilteredPokemons.filter(pokemon => pokemon.startsWith(searchTerm));
        });
        let mockedDropdownVisibility = false;

        const { rerender } = render(<Searchbox
            filteredPokemons={mockedFilteredPokemons}
            handleSearchPokemon={mockedHandleSearchPokemon}
            dropdownVisibility={mockedDropdownVisibility}
        />);
        
        const searchboxInput = screen.getByTestId("navbar-search-input");
        expect(searchboxInput).toBeInTheDocument();

        fireEvent.change(searchboxInput, { target: { value: "charman" } });
        expect(mockedHandleSearchPokemon).toHaveBeenCalledTimes(1);
        expect(mockedHandleSearchPokemon).toHaveBeenCalledWith(
            expect.objectContaining({
                target: expect.objectContaining({
                    value: "charman"
                })
            })
        );
        mockedDropdownVisibility = true;
        const updatedFilteredPokemons = mockedHandleSearchPokemon("charman");
        
        rerender(<Searchbox 
            filteredPokemons={updatedFilteredPokemons}
            handleSearchPokemon={mockedHandleSearchPokemon}
            dropdownVisibility={mockedDropdownVisibility}
        />)

        const dropdownItems = screen.getAllByTestId("dropdown-item");
        expect(dropdownItems).toHaveLength(1);
        expect(dropdownItems[0]).toHaveTextContent("charmander");
    });

    it("Should show the dropdown items when the searchbox input is focused and hide them when the searchbox input is blurred", () => {
        const mockedHandleInputFocus = jest.fn();
        const mockedHandleInputOnBlur = jest.fn();
        let mockedDropdownvisibility = false;
        const { rerender } = render(<Searchbox 
            filteredPokemons={["bulbasaur", "squirtle", "charmander"]}
            dropdownVisibility={mockedDropdownvisibility}
            handleInputFocus={mockedHandleInputFocus}
            handleInputOnBlur={mockedHandleInputOnBlur}
        />);

        const searchboxInput = screen.getByTestId("navbar-search-input");
        expect(searchboxInput).toBeInTheDocument();

        fireEvent.focus(searchboxInput);
        expect(mockedHandleInputFocus).toHaveBeenCalledTimes(1);
        mockedDropdownvisibility = true;

        rerender(<Searchbox
            filteredPokemons={["bulbasaur", "squirtle", "charmander"]}
            dropdownVisibility={mockedDropdownvisibility}
            handleInputFocus={mockedHandleInputFocus}
            handleInputOnBlur={mockedHandleInputOnBlur}
        />);

        const searchboxDropdown = screen.getByTestId("navbar-dropdown-menu");
        expect(searchboxDropdown).toBeInTheDocument();

        fireEvent.blur(searchboxInput);
        expect(mockedHandleInputOnBlur).toHaveBeenCalledTimes(1);
        mockedDropdownvisibility = false;

        rerender(<Searchbox
            filteredPokemons={["bulbasaur", "squirtle", "charmander"]}
            dropdownVisibility={mockedDropdownvisibility}
            handleInputFocus={mockedHandleInputFocus}
            handleInputOnBlur={mockedHandleInputOnBlur}
        />);

        expect(searchboxDropdown).not.toBeInTheDocument();
    });

    it("Should select a pokemon when an item in the dropdown is clicked", () => {
        const mockedSelectPokemon = jest.fn();
        
        render(<Searchbox
            filteredPokemons={["bulbasaur", "squirtle", "charmander"]}
            dropdownVisibility={true}
            selectPokemon={mockedSelectPokemon}
        />);

        const navbarDropdown = screen.getByTestId("navbar-dropdown-menu");
        expect(navbarDropdown).toBeInTheDocument();

        const dropdownItems = screen.getAllByTestId("dropdown-item");
        expect(dropdownItems).toHaveLength(3);

        fireEvent.mouseDown(dropdownItems[0]);
        expect(mockedSelectPokemon).toHaveBeenCalledTimes(1);
        expect(mockedSelectPokemon).toHaveBeenCalledWith("bulbasaur");
    });

    it("Should display the error message when there's an error", () => {
        let mockedErrorVisibility = true;
        const { rerender } = render(<Searchbox
            searchboxError={true}
            searchboxErrorMessageVisibility={mockedErrorVisibility}
            errorMessage={"Some error message"}
        />);

        const searchboxInput = screen.getByTestId("navbar-search-input");
        expect(searchboxInput).toBeInTheDocument();
        const errorMessage = screen.getByTestId("error-message-modal");
        expect(errorMessage).toBeInTheDocument();
        expect(errorMessage).toHaveTextContent("Some error message");

        mockedErrorVisibility = false;
        
        rerender(<Searchbox
            searchboxError={false}
            searchboxErrorMessageVisibility={mockedErrorVisibility}
        />);

        expect(errorMessage).not.toBeInTheDocument();
    });

    it("Should render no pokemons found message when given an empty list", () => {
        render(<Searchbox
            filteredPokemons={[]}
            dropdownVisibility={true}
        />);

        const searchboxInput = screen.getByTestId("navbar-search-input");
        expect(searchboxInput).toBeInTheDocument();

        const dropdownItems = screen.getAllByTestId("dropdown-item");
        expect(dropdownItems).toHaveLength(1);
        expect(dropdownItems[0]).toHaveTextContent("No pokemons found");
    });
});