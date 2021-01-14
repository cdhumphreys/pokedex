import React, { useState, useEffect } from "react";
import PokeCard from "../PokeCard";
import { useSort, useFuzzySearch } from "../hooks";

const SearchPokemon = ({ allPokemon, sort }) => {
    // Constants
    const searchKeys = ["name", "pokedexId"];

    // State
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearching, filteredResults, setFuzzySearchTerm] = useFuzzySearch(allPokemon, searchKeys, "");
    const [sortedList, setSortKey, setSortDirection] = useSort(filteredResults, sort.key, sort.direction);

    // Update results on search
    useEffect(() => {
        setFuzzySearchTerm(searchTerm);
    }, [searchTerm]);

    // Sort searched list
    useEffect(() => {
        setSortKey(sort.key);
        setSortDirection(sort.direction);
    }, [sort.key, sort.direction]);

    return (
        <div>
            <div className="border-2 flex flex-row rounded-lg items-center mb-10 py-2 px-2 mx-auto w-full md:w-2/3">
                <span className="px-2 md:px-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-4 h-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                </span>
                <input
                    type="text"
                    placeholder="What Pokémon are you looking for?"
                    className="bg-transparent text-gray-900 flex flex-grow px-4 py-2 outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="grid grid-flow-row grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {isSearching ? (
                    <div>Searching...</div>
                ) : (
                    sortedList.map((p) => {
                        const url = `https://www.pokemon.com/uk/pokedex/${p.name}`;
                        return <PokeCard key={p.pokedexId} pokemon={{ ...p, url }} />;
                    })
                )}
            </div>
        </div>
    );
};

export default SearchPokemon;
