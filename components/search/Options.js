import React from "react";
import { Popup } from "../common";
import PokemonGeneration from "../PokemonGeneration";
import { useLocalStorage } from "../hooks";
import { GENERATION_1_START, GENERATION_8_END } from "../../api/constants";

export const Options = ({ visible, setVisibleFn, allPokemonTypes, allPokemonGenerations }) => {
    const [selectedGenerations, setSelectedGenerations] = useLocalStorage("generations", ["I"]);
    const [pokedexNumberRange, setPokedexNumberRange] = useLocalStorage("pokedexNumberRange", []);
    const [selectedPokemonTypes, setSelectedPokemonTypes] = useLocalStorage("pokemonTypes", allPokemonTypes);
    const [pokemonEffectiveAgainst, setPokemonEffectiveAgainst] = useLocalStorage("pokemonEffectiveAgainst", []);
    const [pokemonWeakAgainst, setPokemonWeakAgainst] = useLocalStorage("pokemonWeakAgainst", []);

    const onSelectGeneration = (e, isSelected, generationNumeral) => {
        e.stopPropagation();
        if (isSelected) {
            setSelectedGenerations(selectedGenerations.filter((g) => g !== generationNumeral));
        } else {
            setSelectedGenerations([...selectedGenerations, generationNumeral]);
        }
    };

    return (
        <div>
            <Popup visible={visible} closeFn={() => setVisibleFn(false)}>
                <div className="mb-6">
                    <h3 className="text-xl font-bold">Pokédex Options</h3>
                    <h4 className="text-md text-gray-600">Configure your Pokédex!</h4>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-3 lg:gap-2">
                    {allPokemonGenerations.map((generationNumeral) => {
                        const isSelected = selectedGenerations.includes(generationNumeral);
                        return (
                            <PokemonGeneration
                                generationNumeral={generationNumeral}
                                isSelected={isSelected}
                                onClick={onSelectGeneration}
                            />
                        );
                    })}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="pokedexRange">Number Range</label>
                    <input type="range" name="pokedexRange" id="pokedexRange" min="1" max="" />
                </div>
            </Popup>
        </div>
    );
};

export default Options;
