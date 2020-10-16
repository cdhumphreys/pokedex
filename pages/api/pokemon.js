const POKEAPI_URL = "https://pokeapi.co/api/v2";
const POKEASSETS_URL = "https://assets.pokemon.com/assets/cms2/img/pokedex/full";

// To get types, attributes, moves etc
// Each endpoint has to be hit individually
export async function getPokemonData(start, end = null) {
    const requests = [];
    const allTypesData = await getAllPokemonTypes();

    // For fetching a range of pokemon e.g. by generation
    if (start && end) {
        for (let i = start; i <= end; i++) {
            const req = fetchPokemonDetails(i, allTypesData);
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
            console.log("error resolving all Pokemon data promises", error);
        }
    } else {
        // For fetching details about a single Pokemon e.g details screen
        const pokemonData = await fetchPokemonDetails(start, allTypesData);
        return pokemonData;
    }
}

// Return promise containing pokemon data, image, type data
function fetchPokemonDetails(pokemonNumber, allTypesData) {
    const num = parseInt(pokemonNumber, 10);
    const image = getPokemonImage(num);
    const url = `${POKEAPI_URL}/pokemon/${num}`;
    const pokedexId = `${num}`.padStart(3, "0");

    const req = fetch(url)
        .then((response) => response.json())
        .then((pokemonData) => {
            // Attach more details about types (e.g. damage relations between types)
            const types = pokemonData.types.map((t) => {
                const typeName = t.type.name;
                return { ...t, type: allTypesData[typeName] };
            });
            const p = {
                ...pokemonData,
                image,
                pokedexId,
                types,
            };
            return p;
        })
        .catch((e) => console.log("error fetching individual pokemon data", e));
    return req;
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
    // Get list of all pokemon type names, urls
    let typeObjects = [];
    try {
        const res = await fetch(`${POKEAPI_URL}/type`);
        const jsonData = await res.json();
        typeObjects = jsonData.results;
    } catch (e) {
        console.log("error fetching pokemon types", e);
    }

    // Have to query each type endpoint individually to get details
    try {
        const requests = typeObjects.map((r) => getPokemonTypeWithDetails(r.name));
        const data = await Promise.all(requests)
            .then((complete) => {
                // Convert to object for easy access by type name
                return complete.reduce((typeMap, type) => {
                    typeMap[type.name] = type;
                    return typeMap;
                }, {});
            })
            .catch((e) => {
                console.log("error", e);
            });
        return data;
    } catch (e) {
        console.log("error fetching pokemon type details", e);
        return [];
    }
}

export async function getPokemonTypeWithDetails(name) {
    // Return name & damage relations, get rid of other extraneous type data
    try {
        const res = await fetch(`${POKEAPI_URL}/type/${name}`);
        const typeDetails = await res.json();

        return { name, damage_relations: typeDetails.damage_relations };
    } catch (e) {
        console.log(`error getting [${name}] details`, e);
        return { name };
    }
}
