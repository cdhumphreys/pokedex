import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";

import Sort from "../search/Sort";
import Options from "../search/Options";

import { Button, Nav, Box, Layer } from "grommet";
import { FormClose, Descend, List } from "grommet-icons";

import { getAllPokemonTypes, getAllPokemonGenerations } from "../../api/pokemon";

const Layout = ({ title = "Pokemon", children }) => {
    const sortChoices = [
        { displayText: "Smallest number first", key: "pokedexId", direction: "+" },
        { displayText: "Highest number first", key: "pokdexId", direction: "-" },
        { displayText: "A-Z", key: "name", direction: "+" },
        { displayText: "Z-A", key: "name", direction: "-" },
    ];

    const [allPokemonTypes, setAllPokemonTypes] = useState([]);
    const [allPokemonGenerations, setAllPokemonGenerations] = useState([]);

    useEffect(() => {
        (async function(){
            const allTypes = await getAllPokemonTypes();
            setAllPokemonTypes(allTypes);

            const allGenerations = await getAllPokemonGenerations();
            setAllPokemonGenerations(allGenerations);
        })();
    }, [])

    

    const [sortChoice, setSortChoice] = useState(sortChoices[0]);
    const [sortPopupIsVisible, setSortPopupIsVisible] = useState(false);
    const [optionsPopupIsVisible, setOptionsPopupIsVisible] = useState(false);

    return (
        <div className="bg-gray-200 pb-12">
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Nav
                direction="row"
                align="center"
                justify="end"
                pad="xsmall"
                elevation="small"
                background="white"
                style={{ position: "sticky", top: "0", zIndex: 10 }}
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
            <main className="container max-w-full md:max-w-3xl lg:max-w-6xl min-h-screen mx-auto pt-8 px-4 w-3xl">
                {children}
            </main>
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
        </div>
    );
};

export default Layout;
