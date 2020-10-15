const POKEAPI_URL = "https://pokeapi.co/api/v2";
const POKEASSETS_URL = "https://assets.pokemon.com/assets/cms2/img/pokedex/full";

// To get types, attributes, moves etc
// Each endpoint has to be hit individually
export async function getPokemonData(start, end) {
    const requests = [];
    const allTypesData = await getAllPokemonTypes();

    for (let i = start; i <= end; i++) {
        const image = getPokemonImage(i);

        const req = fetch(`${POKEAPI_URL}/pokemon/${i}`)
            .then((response) => response.json())
            .then((data) => {
                const typesData = data.types.map((t) => allTypesData[t.name]);
                const p = {
                    ...data,
                    image,
                    pokedexId: `${i}`.padStart(3, "0"),
                    types: typesData,
                };
                return p;
            })
            .catch((e) => console.log("error fetching individual pokemon data", e));

        requests.push(req);
    }

    try {
        const data = await Promise.all(requests)
            .then((complete) => {
                return complete;
            })
            .catch((e) => {
                console.log("error", e);
            });
        return data;
    } catch (error) {
        console.log("fetching error", error);
    }
}

export function getPokemonImage(pokedexNumber) {
    const paddedIndex = `${pokedexNumber}`.padStart(3, "0");
    return `${POKEASSETS_URL}/${paddedIndex}.png`;
}

export function getGeneration1Pokemon() {
    // 151 Pokemon total
    return getPokemonData(1, 151);
}

export function getGeneration2Pokemon() {
    // 100 Pokemon total
    return getPokemonData(152, 251);
}

export function getGeneration3Pokemon() {
    // 135 Pokemon total
    return getPokemonData(252, 386);
}

export function getGeneration4Pokemon() {
    // 107 Pokemon total
    return getPokemonData(387, 493);
}

export function getGeneration5Pokemon() {
    // 156 Pokemon total
    return getPokemonData(494, 649);
}

export function getGeneration6Pokemon() {
    // 72 Pokemon total
    return getPokemonData(650, 721);
}

export function getGeneration7Pokemon() {
    // 88 Pokemon total
    return getPokemonData(722, 809);
}

export function getGeneration8Pokemon() {
    // 87 Pokemon total
    return getPokemonData(810, 896);
}

export async function getAllPokemonTypes() {
    let typeObjects = [];
    try {
        const res = await fetch(`${POKEAPI_URL}/types`);
        const typeObjects = await res.json();
    } catch (e) {
        console.log("error fetching pokemon types", e);
    }

    try {
        const requests = typeObjects.results.map((r) => getPokemonTypeDetails(r.name));
        await Promise.all(requests)
            .then((complete) => {
                return complete;
            })
            .catch((e) => {
                console.log("error", e);
            });
    } catch (error) {
        console.log("error fetching pokemon type details", e);
        return [];
    }
}

export async function getPokemonTypeWithDetails(name) {
    try {
        const res = await fetch(`${POKEAPI_URL}/type/${name}`);
        const typeDetails = await res.json();
        return { name, damage_relations: typeDetails.damage_relations };
    } catch (e) {
        console.log("error fetching pokemon types", e);
        return {};
    }
}
