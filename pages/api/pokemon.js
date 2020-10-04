// To get types, attributes, moves etc
// Each endpoint has to be hit individually
export async function getPokeData(start, end) {
    const requests = [];
    for (let i = start; i < end; i++) {
        const paddedIndex = `${i + 1}`.padStart(3, "0");
        const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;

        const req = fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}`)
            .then((response) => response.json())
            .then((data) => {
                const p = {
                    ...data,
                    image,
                    pokedexId: paddedIndex,
                };
                return p;
            })
            .catch((e) => console.log("error fetching individual poke data", e));

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
