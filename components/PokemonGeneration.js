import React from "react";
import { Button } from "./common";
import { getPokemonImageUrl, getGenerationStarters } from "../api/pokemon";
import { convertNumeralToInt } from "../utils";

const PokemonGeneration = ({ generationNumeral, isSelected, onClick }) => {
    function getStarterImages(generationNumeral) {
        const generationInt = convertNumeralToInt(generationNumeral);
        const startingPokemon = getGenerationStarters(generationInt);

        return startingPokemon.map((p) => getPokemonImageUrl(p));
    }

    return (
        <Button isPrimary={isSelected} onClick={(e) => onClick(e, isSelected, generationNumeral)}>
            <div className="flex flex-col w-full">
                <div className="flex flex-row mb-2 justify-around items-center">
                    {/* <div className="grid grid-cols-3 gap-2 mb-2"> */}
                    {getStarterImages(generationNumeral).map((url) => (
                        <img src={url} className="h-16 w-16 md:w-1/3 md:h-auto" />
                    ))}
                </div>
                <div>Generation {generationNumeral}</div>
            </div>
        </Button>
    );
};

export default PokemonGeneration;
