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
});