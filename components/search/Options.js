import React from "react";
import { Grid, Box, Heading, Text, Button } from "grommet";
import PokemonGeneration from "../PokemonGeneration";
import PokemonTypePill from "../PokemonTypePill";
import { useLocalStorage } from "../hooks";

export const Options = ({ allPokemonTypes, allPokemonGenerations, closePopupFn }) => {
    const [selectedGenerations, setSelectedGenerations] = useLocalStorage("generations", ["I"]);
    const [pokemonEffectiveAgainst, setPokemonEffectiveAgainst] = useLocalStorage("pokemonEffectiveAgainst", []);
    const [pokemonWeakAgainst, setPokemonWeakAgainst] = useLocalStorage("pokemonWeakAgainst", []);

    const onSelectGeneration = (e, isSelected, generationNumeral) => {
        e.stopPropagation();
        if (isSelected) {
            setSelectedGenerations(selectedGenerations.filter((g) => g !== generationNumeral));
        } else {
            setSelectedGenerations([...selectedGenerations, generationNumeral]);
        }
    };

    const onSelectEffectiveAgainstType = (e, type) => {
        e.stopPropagation();
        if (pokemonEffectiveAgainst.includes(type)) {
            setPokemonEffectiveAgainst(pokemonEffectiveAgainst.filter((t) => t !== type));
        } else {
            setPokemonEffectiveAgainst([...pokemonEffectiveAgainst, type]);
        }
    };

    const onSelectWeakAgainstType = (e, type) => {
        e.stopPropagation();
        if (pokemonWeakAgainst.includes(type)) {
            setPokemonWeakAgainst(pokemonWeakAgainst.filter((t) => t !== type));
        } else {
            setPokemonWeakAgainst([...pokemonWeakAgainst, type]);
        }
    };

    const onReset = () => {
        setSelectedGenerations(["I"]);
        setPokemonEffectiveAgainst([...Object.keys(allPokemonTypes)]);
        setPokemonWeakAgainst([...Object.keys(allPokemonTypes)]);
    };

    return (
        <Box fill direction="column" gap="medium">
            <Box justify="center" align="center" pad={{ vertical: "medium", horizontal: "small" }}>
                <Heading level="3" textAlign="center" color="dark-1" margin={{ bottom: "small" }}>
                    Pokédex Options
                </Heading>
                <Text color="dark-3">Configure your Pokédex!</Text>
            </Box>
            <Box
                style={{ boxShadow: "inset 0px 0px 4px 0px rgba(0, 0, 0, 0.5)" }}
                pad={{ vertical: "medium", horizontal: "small" }}
                overflow={{ vertical: "auto", horizontal: "hidden" }}
                direction="row"
                wrap
            >
                <Box width="full" margin={{ bottom: "medium" }}>
                    <Heading level="5">Effective Against</Heading>
                    <Grid columns="xsmall" gap="small" pad="small">
                        {Object.keys(allPokemonTypes)
                            .sort((a, b) => (a < b ? -1 : 1))
                            .map((type) => {
                                const isSelected = pokemonEffectiveAgainst.includes(type);
                                return (
                                    <PokemonTypePill
                                        key={type}
                                        typeName={type}
                                        text={true}
                                        selected={isSelected}
                                        onClick={(e) => onSelectEffectiveAgainstType(e, type)}
                                    />
                                );
                            })}
                    </Grid>
                </Box>
                <Box width="full" margin={{ bottom: "medium" }}>
                    <Heading level="5">Weak Against</Heading>
                    <Grid gap="small" columns="xsmall" pad="small">
                        {Object.keys(allPokemonTypes)
                            .sort((a, b) => (a < b ? -1 : 1))
                            .map((type) => {
                                const isSelected = pokemonWeakAgainst.includes(type);
                                return (
                                    <PokemonTypePill
                                        key={type}
                                        typeName={type}
                                        text={true}
                                        selected={isSelected}
                                        onClick={(e) => onSelectWeakAgainstType(e, type)}
                                    />
                                );
                            })}
                    </Grid>
                </Box>
                <Box width="full" margin={{ bottom: "medium" }}>
                    <Grid columns={["small", "small", "small"]} rows="xsmall" gap="small" pad="small">
                        {allPokemonGenerations.map((generationNumeral) => {
                            const isSelected = selectedGenerations.includes(generationNumeral);
                            return (
                                <PokemonGeneration
                                    key={generationNumeral}
                                    generationNumeral={generationNumeral}
                                    isSelected={isSelected}
                                    onClick={onSelectGeneration}
                                />
                            );
                        })}
                    </Grid>
                </Box>
            </Box>
            <Box direction="row" justify="center" align="center" gap="small">
                <Button size="medium" plain={false} onClick={onReset}>
                    Reset
                </Button>
                <Button size="medium" onClick={closePopupFn} primary plain={false}>
                    Apply
                </Button>
            </Box>
        </Box>
    );
};

export default Options;
