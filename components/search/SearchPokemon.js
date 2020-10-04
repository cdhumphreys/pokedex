import React, { useState, useEffect } from "react";
import PokeCard from "../PokeCard";
import useFuzzySearch from "../hooks/useFuzzySearch";

const SearchPokemon = ({ allPokemon, sort }) => {
    // Constants
    const searchKeys = ["name", "pokedexId"];

    // State
    const [searchTerm, setSearchTerm] = useState("");
    const [isSearching, filteredResults, setFuzzySearchTerm] = useFuzzySearch(allPokemon, searchKeys, "", sort);

    // Update results on search or sort change
    useEffect(() => {
        setFuzzySearchTerm(searchTerm);
    }, [searchTerm, sort]);

    return (
        <div>
            <div className="bg-gray-400 flex flex-row rounded-lg items-center mb-10 py-2 px-2">
                <span className="px-4">
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
                    filteredResults.map((p) => {
                        const url = `https://www.pokemon.com/uk/pokedex/${p.name}`;
                        return <PokeCard key={p.pokedexId} pokemon={{ ...p, url }} />;
                    })
                )}
            </div>
        </div>
    );
};

export default SearchPokemon;
