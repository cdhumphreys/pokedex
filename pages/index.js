import Layout from "../components/Layout";
import PokeCard from "../components/PokeCard";

export default function Home({ pokemon }) {
  return (
    <div>
      <Layout title="NextJS Pokedex">
        <div>
          <div className="mb-6">
            <h1 className="text-3xl font-bold">Pokédex</h1>
            <h2 className="text-md">
              Search for Pokémon by name or using the National Pokédex number.
            </h2>
          </div>
          <div className="bg-gray-300 flex flex-row rounded-lg items-center mb-10 py-2 px-2">
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
              className="bg-transparent text-gray-800 flex flex-grow px-4 py-2"
            />
          </div>
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
    const pokedata = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${index + 1}`
    );
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
    const res = await fetch(
      "https://pokeapi.co/api/v2/pokemon?limit=151&offset=0"
    );
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
