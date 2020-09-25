import Layout from "../components/Layout";
import PokeCard from "../components/PokeCard";

export default function Home({ pokemon }) {
    return (
        <div>
            <Layout title="NextJS Pokedex">
                <div>
                    <h1 className="text-4xl mb-8 text-center">
                        NextJS Pokedex
                    </h1>
                    {pokemon.map((p) => (
                        <PokeCard key={p.pokedexId} pokemon={p} />
                    ))}
                </div>
            </Layout>
        </div>
    );
}

export async function getStaticProps() {
    let pokemon = [];
    try {
        const res = await fetch(
            "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
        );
        const { results } = await res.json();
        pokemon = results.map((result, index) => {
            const paddedIndex = `${index + 1}`.padStart(3, "0");
            return {
                ...result,
                image: `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`,
                pokedexId: paddedIndex,
            };
        });
    } catch (error) {
        console.error(error);
    }

    return {
        props: { pokemon },
    };
}
