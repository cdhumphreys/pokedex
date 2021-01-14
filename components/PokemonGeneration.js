import React from "react";
import { Box, Button, Image, Heading } from "grommet";
// import { Button } from "./common";
import { getPokemonImageUrl, getGenerationStarters } from "../api/pokemon";
import { convertNumeralToInt } from "./utils";

const PokemonGeneration = ({ generationNumeral, isSelected, onClick }) => {
    function getStarterImages(generationNumeral) {
        const generationInt = convertNumeralToInt(generationNumeral);
        const startingPokemon = getGenerationStarters(generationInt);

        return startingPokemon.map((p) => getPokemonImageUrl(p));
    }

    return (
        <Button
            primary={isSelected}
            plain={false}
            size="medium"
            onClick={(e) => onClick(e, isSelected, generationNumeral)}
        >
            <Box fill alignContent="center" justify="center" direction="column">
                <Box height="medium" width="medium" direction="row">
                    {getStarterImages(generationNumeral).map((url, i) => (
                        <Image fit="contain" key={`${generationNumeral}-${i}`} src={url} />
                    ))}
                </Box>
                <Heading size="xsmall" textAlign="center">
                    Generation {generationNumeral}
                </Heading>
            </Box>
        </Button>
    );
};

export default PokemonGeneration;
