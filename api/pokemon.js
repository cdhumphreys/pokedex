import {
    GENERATION_1_START,
    GENERATION_1_END,
    GENERATION_2_START,
    GENERATION_2_END,
    GENERATION_3_START,
    GENERATION_3_END,
    GENERATION_4_START,
    GENERATION_4_END,
    GENERATION_5_START,
    GENERATION_5_END,
    GENERATION_6_START,
    GENERATION_6_END,
    GENERATION_7_START,
    GENERATION_7_END,
    GENERATION_8_START,
    GENERATION_8_END,
    POKEAPI_URL,
    POKEASSETS_URL,
} from "./constants";

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
    const image = getPokemonImageUrl(num);
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

export function getPokemonImageUrl(pokedexNumber) {
    const paddedIndex = `${pokedexNumber}`.padStart(3, "0");
    return `${POKEASSETS_URL}/${paddedIndex}.png`;
}

export function getGeneration1Pokemon() {
    // 151 Pokemon total
    return getPokemonData(GENERATION_1_START, GENERATION_1_END);
}

export function getGeneration2Pokemon() {
    // 100 Pokemon total
    return getPokemonData(GENERATION_2_START, GENERATION_2_END);
}

export function getGeneration3Pokemon() {
    // 135 Pokemon total
    return getPokemonData(GENERATION_3_START, GENERATION_3_END);
}

export function getGeneration4Pokemon() {
    // 107 Pokemon total
    return getPokemonData(GENERATION_4_START, GENERATION_4_END);
}

export function getGeneration5Pokemon() {
    // 156 Pokemon total
    return getPokemonData(GENERATION_5_START, GENERATION_5_END);
}

export function getGeneration6Pokemon() {
    // 72 Pokemon total
    return getPokemonData(GENERATION_6_START, GENERATION_6_END);
}

export function getGeneration7Pokemon() {
    // 88 Pokemon total
    return getPokemonData(GENERATION_7_START, GENERATION_7_END);
}

export function getGeneration8Pokemon() {
    // 87 Pokemon total
    return getPokemonData(GENERATION_8_START, GENERATION_8_END);
}

export function getGenerationStarters(generationInt) {
    console.log("GEN INT", generationInt);
    let starters = [];
    switch (generationInt) {
        case 1:
            starters = [1, 4, 7];
            break;
        case 2:
            starters = [152, 155, 158];
            break;
        case 3:
            starters = [252, 255, 258];
            break;
        case 4:
            starters = [387, 390, 393];
            break;
        case 5:
            starters = [495, 498, 501];
            break;
        case 6:
            starters = [650, 653, 656];
            break;
        case 7:
            starters = [722, 725, 728];
            break;
        case 8:
            starters = [810, 813, 816];
            break;
        default:
            // default as pikachu & eevee
            starters = [25, 133];
            break;
    }

    return starters;
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

export async function getAllPokemonGenerations() {
    try {
        const res = await fetch(`${POKEAPI_URL}/generation`);
        const jsonData = await res.json();
        const generationNumerals = jsonData.results.map((genData) => {
            // PokeAPI returns names as generation + '-' + roman numeral e.g. 'generation-ii'
            let [lowerCaseGenerationNumeral] = genData.name.split("-").slice(-1);
            if (lowerCaseGenerationNumeral) {
                return lowerCaseGenerationNumeral.toUpperCase();
            }
        });

        return generationNumerals;
    } catch (e) {
        console.log("error fetching pokemon types", e);
        return [];
    }
}
