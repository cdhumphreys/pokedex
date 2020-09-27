import Layout from "../components/Layout";
import PokeCard from "../components/PokeCard";

export default function Home({ pokemon }) {
    return (
        <div>
            <Layout title="NextJS Pokedex">
                <div>
                    <h1 className="text-4xl mb-8 text-center">NextJS Pokedex</h1>
                    <div className="grid grid-flow-row grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {pokemon.map((p) => {
                            const url = `https://www.pokemon.com/uk/pokedex/${p.name}`;
                            return <PokeCard key={p.pokedexId} pokemon={{ ...p, url }} />;
                        })}
                    </div>
                </div>
            </Layout>
        </div>
    );
}

async function getPokeData(index) {
    try {
        const pokedata = await fetch(`https://pokeapi.co/api/v2/pokemon/${index + 1}`);
        const data = await pokedata.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}

export async function getStaticProps() {
    let pokemon = [];
    try {
        // Only has name and url
        const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=151&offset=0");
        const { results } = await res.json();

        // Fetch image, other data
        pokemon = results.map(async (result, index) => {
            const paddedIndex = `${index + 1}`.padStart(3, "0");
            const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;

            // Rest of useful data
            const data = await getPokeData(index);
            return {
                ...result,
                image,
                pokedexId: paddedIndex,
                data,
            };
        });

        var pokemonDetails = await Promise.all(pokemon).then((complete) => {
            return complete;
        });
        return {
            props: { pokemon: pokemonDetails },
        };
    } catch (error) {
        console.error(error);
    }
}
