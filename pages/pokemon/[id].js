import React from "react";
import Link from "next/link";

import { getPokemonData, getSpeciesData } from "../../api/pokemon";

import { Layout } from "../../components/common";
import PokemonTypePill from "../../components/PokemonTypePill";

// Individual pokemon details page
const Pokemon = ({ pokemonData }) => {
    // Weight and height are given to 1dp without the decimal point, God knows why you would do this
    const heightString = String(pokemonData.height).padStart(2, "0");
    const weightString = String(pokemonData.weight).padStart(2, "0");
    const height = `${heightString.slice(0, heightString.length - 1)}.${heightString.slice(-1)}`;
    const weight = `${weightString.slice(0, weightString.length - 1)}.${weightString.slice(-1)}`;

    console.log(pokemonData);
    
    let flavourText = '';
    try {
      flavourText = pokemonData.speciesData.flavor_text_entries[0].flavor_text;
      
    } catch (error) {
      flavourText = 'No description found'
    }

    return (
        <Layout>
            <Link href="/">
                <a className="inline-flex flex-row items-center p-4">
                    <svg
                        className="w-6 h-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                </a>
            </Link>
            <div className="space-y-10">
                <section>
                    <h1 className="capitalize text-4xl font-bold text-center mb-2">{pokemonData.name}</h1>
                    <div className="max-w-50 border-2 border-blue-300 bg-white rounded-lg">
                        <img className="mx-auto" src={pokemonData.image} alt={pokemonData.name} />
                    </div>
                    {flavourText &&
                      <p>
                          {flavourText}
                      </p>
                    }
                </section>
                <section>
                    <table className="table-auto mx-auto">
                        <thead>
                            <tr>
                                <th className="w-1/5 px-4 py-2">Height (m)</th>
                                <th className="w-1/5 px-4 py-2">Weight (kg)</th>
                                <th className="w-3/5 px-4 py-2">Type{pokemonData.types.length > 1 ? "s" : ""}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-4 py-2 border border-blue-500 text-right">{height}</td>
                                <td className="px-4 py-2 border border-blue-500 text-right">{weight}</td>
                                <td className="px-4 py-2 border border-blue-500 flex items-center justify-center flex-wrap">
                                    {pokemonData.types.map((t) => (
                                        <PokemonTypePill key={t.type.name} typeName={t.type.name} />
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

export async function getServerSideProps({ params }) {
    const pokedexId = params.id;
    try {
      const id = parseInt(pokedexId, 10);
      const pokemonData = await getPokemonData(id);
      const speciesData = await getSpeciesData(id);
      return {
          props: {
            pokemonData: {...pokemonData, speciesData},
          },
      };
      
    } catch (error) {
      console.log('Error fetching Pokemon data:', error);
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      }
    }

}
