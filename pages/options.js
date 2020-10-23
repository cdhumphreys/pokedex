import React from "react";
import { getAllPokemonTypes } from "./api/pokemon";

export const Options = ({ preferences }) => {
    return <div></div>;
};

export default Options;

export async function getStaticProps() {
    const preferences = {};

    preferences["generations"] = localStorage.getItem("generations") || [1];
    preferences["pokedexNumberRange"] = localStorage.getItem("pokedexNumberRange") || [];
    preferences["pokemonTypes"] = localStorage.getItem("pokemonTypes") || (await getAllPokemonTypes());
    preferences["pokemonEffectiveAgainst"] = localStorage.getItem("pokemonEffectiveAgainst") || [];
    preferences["pokemonWeakAgainst"] = localStorage.getItem("pokemonWeakAgainst") || [];

    return {
        props: {
            preferences,
        },
    };
}
