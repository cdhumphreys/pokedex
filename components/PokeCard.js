import React from "react";
import Link from "next/link";
import PokemonTypePill from "./PokemonTypePill";
import styles from "../styles/pokecard.module.scss";

const PokeCard = ({ pokemon }) => {
    const { image, name, pokedexId } = pokemon;

    let bgClasses;
    let boxShadowClasses;

    let pokemonTypes = [];

    try {
        pokemonTypes = pokemon.types;
        const mainTypeNames = pokemonTypes.map((t) => t.type.name).slice(0, 2);
        bgClasses = mainTypeNames.reduce((acc, iter) => {
            return acc + "--" + iter;
        }, "bg");
        boxShadowClasses = mainTypeNames.reduce((acc, iter) => {
            return acc + "--" + iter;
        }, "boxShadow");
    } catch {
        bgClasses = "bg-red-400";
        boxShadowClasses = "";
    }

    return (
        <div className={`relative py-6 px-4 my-2 rounded-lg ${bgClasses} ${boxShadowClasses}`}>
            <div className={styles["bg--hex"]}></div>
            <Link href={`/pokemon?id=${pokedexId}`}>
                <a className="flex flex-row items-center justify-between text-lg">
                    <div className="flex flex-col items-start leading-none space-y-2 z-10">
                        <h3 className="text-sm text-gray-800">#{pokedexId}</h3>
                        <h2 className="text-2xl capitalize text-white font-bold">{name}</h2>
                        <div className="grid gap-1 grid-cols-2 grid-flow-row">
                            {pokemonTypes.map((t) => (
                                <PokemonTypePill key={t.type.name} typeName={t.type.name} />
                            ))}
                        </div>
                    </div>
                    <img className="-my-6 absolute right-0 top-0 w-40 md:w-auto md:h-full" src={image} alt={name} />
                </a>
            </Link>
        </div>
    );
};

export default PokeCard;
