import React from "react";
import Link from "next/link";
import Layout from "../components/Layout";
import PokemonTypePill from "../components/PokemonTypePill";

const Pokemon = ({ pmon, image }) => {
    const heightString = String(pmon.height).padStart(2, "0");
    const weightString = String(pmon.weight).padStart(2, "0");
    const height = `${heightString.slice(0, heightString.length - 1)}.${heightString.slice(-1)}`;
    const weight = `${weightString.slice(0, weightString.length - 1)}.${weightString.slice(-1)}`;

    return (
        <Layout>
            <Link href="/" className="text-white">
                <a>Back</a>
            </Link>
            <div className="space-y-10">
                <section>
                    <h1 className="capitalize text-4xl font-bold text-center mb-2">{pmon.name}</h1>
                    <div className="max-w-50 border-2 border-blue-300 bg-white rounded-lg">
                        <img className="mx-auto" src={image} alt={pmon.name} />
                    </div>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Error tenetur veritatis impedit
                        dolorem nulla vel quidem ipsum veniam adipisci, cum eligendi aliquid earum, numquam aliquam
                        fugiat, illum deserunt. In, non.
                    </p>
                </section>
                <section>
                    <table className="table-auto mx-auto">
                        <thead>
                            <tr>
                                <th className="w-1/5 px-4 py-2">Height (m)</th>
                                <th className="w-1/5 px-4 py-2">Weight (kg)</th>
                                <th className="w-3/5 px-4 py-2">Type{pmon.types.length > 1 ? "s" : ""}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-4 py-2 border border-blue-500 text-right">{height}</td>
                                <td className="px-4 py-2 border border-blue-500 text-right">{weight}</td>
                                <td className="px-4 py-2 border border-blue-500 flex items-center justify-center flex-wrap">
                                    {pmon.types.map((t) => (
                                        <PokemonTypePill key={t.type.name} type={t} />
                                    ))}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </section>
            </div>
        </Layout>
    );
};

export default Pokemon;

export async function getServerSideProps({ query }) {
    const pokedexId = query.id;
    const id = parseInt(pokedexId, 10);
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pmon = await res.json();

        const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${pokedexId}.png`;

        return {
            props: { pmon, image },
        };
    } catch (error) {
        console.error(error);
    }
}
