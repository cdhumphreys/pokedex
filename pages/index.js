import React from "react";
import { getGeneration1Pokemon } from "../api/pokemon";
import SearchPokemon from "../components/search/SearchPokemon";

import { Layout } from '../components/common';
import { Box, Heading, Text } from "grommet";



export default function Home({ pokemon }) {

    return (
        <Layout>
            <Box pad="medium">
                <Box margin={{ bottom: "medium" }}>
                    <Heading level="1" textAlign="center">
                        Pokédex
                    </Heading>
                    <Text textAlign="center">Search for Pokémon by name or using the National Pokédex number.</Text>
                </Box>
                <SearchPokemon allPokemon={pokemon} sort={sortChoice} />
            </Box>
        </Layout>
    );
}

export async function getStaticProps() {
    const pokemon = await getGeneration1Pokemon();

    return {
        props: { pokemon },
    };
}
