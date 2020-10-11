import React, { useState } from "react";

import { getPokeData } from "./api/pokemon";

import Layout from "../components/Layout";
import SearchPokemon from "../components/search/SearchPokemon";
import Sort from "../components/search/Sort";
import Button from "../components/Button";

const Nav = ({ onSortClick }) => (
    <nav className="flex flex-row items-center justify-end space-x-2 sticky top-0 p-4 bg-gray-200 z-20 md:shadow">
        <Button type="button" onClick={onSortClick} isPrimary={true}>
            <svg
                className="w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
                />
            </svg>
        </Button>
        <Button isPrimary={false}>
            <svg
                className="w-8 h-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
            </svg>
        </Button>
    </nav>
);

export default function Home({ pokemon }) {
    const sortChoices = [
        { displayText: "Smallest number first", key: "pokedexId", direction: "+" },
        { displayText: "Highest number first", key: "pokdexId", direction: "-" },
        { displayText: "A-Z", key: "name", direction: "+" },
        { displayText: "Z-A", key: "name", direction: "-" },
    ];
    const [sortChoice, setSortChoice] = useState(sortChoices[0]);
    const [popupIsVisible, setPopupIsVisible] = useState(false);

    return (
        <>
            <Nav onSortClick={() => setPopupIsVisible(!popupIsVisible)} />
            <Layout title="NextJS Pokedex">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold">Pokédex</h1>
                    <h2 className="text-md">Search for Pokémon by name or using the National Pokédex number.</h2>
                </div>
                <SearchPokemon allPokemon={pokemon} sort={sortChoice} />
                <Sort
                    visible={popupIsVisible}
                    setVisibleFn={setPopupIsVisible}
                    setterFn={setSortChoice}
                    currentChoice={sortChoice}
                    sortChoices={sortChoices}
                />
            </Layout>
        </>
    );
}

export async function getStaticProps() {
    const pokemon = await getPokeData(0, 50);

    return {
        props: { pokemon },
    };
}
