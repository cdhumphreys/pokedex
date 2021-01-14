import React, { useState } from "react";
import Link from "next/link";
import { getGeneration1Pokemon, getAllPokemonTypes, getAllPokemonGenerations } from "../api/pokemon";
import SearchPokemon from "../components/search/SearchPokemon";
import Sort from "../components/search/Sort";
import Options from "../components/search/Options";
import { Layout } from "../components/common";

import { Box, Grommet, Layer, Button, Heading, Text, Nav } from "grommet";
import { FormClose, Descend, List } from "grommet-icons";
const theme = {
    global: {
        font: {
            family: "sans-serif",
            size: "18px",
            height: "20px",
        },
        colors: {
            brand: "#EF4444",
            brandTransparent: "rgba(239, 68, 68, 0.5)",
            focus: "#80A1D4",
        },
    },
};

export default function Home({ pokemon, allPokemonTypes, allPokemonGenerations }) {
    const sortChoices = [
        { displayText: "Smallest number first", key: "pokedexId", direction: "+" },
        { displayText: "Highest number first", key: "pokdexId", direction: "-" },
        { displayText: "A-Z", key: "name", direction: "+" },
        { displayText: "Z-A", key: "name", direction: "-" },
    ];
    const [sortChoice, setSortChoice] = useState(sortChoices[0]);
    const [sortPopupIsVisible, setSortPopupIsVisible] = useState(false);
    const [optionsPopupIsVisible, setOptionsPopupIsVisible] = useState(false);

    return (
        <Grommet theme={theme}>
            <Nav
                direction="row"
                align="center"
                justify="end"
                pad="xsmall"
                elevation="small"
                background="white"
                style={{ position: "sticky", top: "0", zIndex: 100 }}
            >
                <Button as={Link} href="/">
                    Home
                </Button>
                <Button
                    margin="xsmall"
                    plain={false}
                    onClick={() => setSortPopupIsVisible(!sortPopupIsVisible)}
                    icon={<Descend />}
                />
                <Button margin="xsmall" plain={false} onClick={() => setOptionsPopupIsVisible(true)} icon={<List />} />
            </Nav>
            <Box pad="medium">
                <Box margin={{ bottom: "medium" }}>
                    <Heading level="1" textAlign="center">
                        Pokédex
                    </Heading>
                    <Text textAlign="center">Search for Pokémon by name or using the National Pokédex number.</Text>
                </Box>
                <SearchPokemon allPokemon={pokemon} sort={sortChoice} />
            </Box>
            {sortPopupIsVisible && (
                <Layer onClickOutside={() => setSortPopupIsVisible(false)} onEsc={() => setSortPopupIsVisible(false)}>
                    <Box fill pad="small">
                        <Box justify="end" align="center" direction="row">
                            <Button icon={<FormClose />} onClick={() => setSortPopupIsVisible(false)}></Button>
                        </Box>
                        <Box fill>
                            <Sort setterFn={setSortChoice} currentChoice={sortChoice} sortChoices={sortChoices} />
                        </Box>
                    </Box>
                </Layer>
            )}
            {optionsPopupIsVisible && (
                <Layer
                    onClickOutside={() => setOptionsPopupIsVisible(false)}
                    onEsc={() => setOptionsPopupIsVisible(false)}
                >
                    <Box fill pad="small" direction="column">
                        <Box justify="end" align="center" direction="row">
                            <Button icon={<FormClose />} onClick={() => setOptionsPopupIsVisible(false)}></Button>
                        </Box>
                        <Box>
                            <Options
                                closePopupFn={() => setOptionsPopupIsVisible(false)}
                                allPokemonTypes={allPokemonTypes}
                                allPokemonGenerations={allPokemonGenerations}
                            />
                        </Box>
                    </Box>
                </Layer>
            )}
        </Grommet>
    );
}

export async function getStaticProps() {
    const pokemon = await getGeneration1Pokemon();

    const allPokemonTypes = await getAllPokemonTypes();
    const allPokemonGenerations = await getAllPokemonGenerations();

    return {
        props: { pokemon, allPokemonTypes, allPokemonGenerations },
    };
}
