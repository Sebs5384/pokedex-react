import { NavContainer, PokeballButton } from "./Pokemon";
import ImageContainer from "../shared/ImageContainer";
import pokeBackground from "../../assets/img/misc/poke-background.png";
import pokemonLen from "../../assets/img/misc/pokedex-len.png";
import catchPokemon from "../../assets/img/misc/catch-a-pokemon.png";
import { useState, useEffect } from "react";
import { useFetchPokemon } from "../../hooks/index";

function CatchPokemon({ selectPokemon }) {
    const [isShaking, setIsShaking] = useState(false);
    const [randomNumber, setRandomNumber] = useState(null);
    const { randomPokemon } = useFetchPokemon(randomNumber);
    const handleClick = () => {
        setIsShaking(true);
        setRandomNumber(Math.floor(Math.random() * 100) + 1);
        setTimeout(() => {
            setIsShaking(false);
        }, 6000);
    };

    useEffect(() => {
        console.log(randomPokemon);
    }, [randomPokemon]);

    return(
        <>
            <PokeballButton 
                className={isShaking ? "poke-shake" : ""}
                backgroundImage={pokeBackground}
                onClick={handleClick}
            />
            <NavContainer className="catch-pokemon">
                <ImageContainer src={catchPokemon}></ImageContainer>
            </NavContainer>
            <NavContainer className="poke-slot">
                <ImageContainer src={randomNumber ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomNumber}.png` : pokemonLen } ></ImageContainer>
                <ImageContainer src={randomNumber ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomNumber}.png` : pokemonLen } ></ImageContainer>
                <ImageContainer src={randomNumber ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${randomNumber}.png` : pokemonLen } ></ImageContainer>
            </NavContainer>
        </>
    );
};

export default CatchPokemon;