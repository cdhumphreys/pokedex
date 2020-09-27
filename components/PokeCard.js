import React from "react";
import Link from "next/link";
import PokemonTypePill from "./PokemonTypePill";
import styles from "../styles/pokemon-types.module.scss";

const PokeCard = ({ pokemon }) => {
    const { image, name, url, pokedexId } = pokemon;
    const mainTypeNames = pokemon.data.types.map((t) => t.type.name).slice(0, 2);
    const typeClasses = mainTypeNames.reduce((acc, iter) => {
        return acc + "--" + iter;
    }, "bg");
    return (
        <div className={`p-4 my-2 border-2 rounded-md ${typeClasses}`}>
            <Link href={`/pokemon?id=${pokedexId}`}>
                <a className="flex flex-row items-center justify-between text-lg">
                    <div className="flex flex-col items-start space-y-2">
                        <h3 className="text-xl text-gray-600">#{pokedexId}</h3>
                        <h2 className="text-2xl capitalize text-white">{name}</h2>
                        <div className="grid grid-flow-row gap-1">
                            {pokemon.data.types.map((t) => (
                                <PokemonTypePill key={t.type.name} type={t} />
                            ))}
                        </div>
                    </div>
                    <img className="w-32" src={image} alt={name} />
                </a>
            </Link>
        </div>
    );
};

export default PokeCard;
