import Layout from "../components/Layout";
import SearchPokemon from "../components/search/SearchPokemon";

export default function Home({ pokemon }) {
    return (
        <div>
            <Layout title="NextJS Pokedex">
                <div>
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold">Pokédex</h1>
                        <h2 className="text-md">Search for Pokémon by name or using the National Pokédex number.</h2>
                    </div>
                    <SearchPokemon allPokemon={pokemon} />
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
