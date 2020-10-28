import React from "react";
import { Popup, Range } from "../common";
import PokemonGeneration from "../PokemonGeneration";
import { useLocalStorage } from "../hooks";
import { GENERATION_1_START, GENERATION_8_END } from "../../api/constants";

export const Options = ({ visible, setVisibleFn, allPokemonTypes, allPokemonGenerations }) => {
    const [selectedGenerations, setSelectedGenerations] = useLocalStorage("generations", ["I"]);
    const [pokedexNumberRange, setPokedexNumberRange] = useLocalStorage("pokedexNumberRange", [
        GENERATION_1_START,
        GENERATION_8_END,
    ]);
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
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-3 lg:gap-2 mb-6">
                    {allPokemonGenerations.map((generationNumeral) => {
                        const isSelected = selectedGenerations.includes(generationNumeral);
                        return (
                            <PokemonGeneration
                                key={generationNumeral}
                                generationNumeral={generationNumeral}
                                isSelected={isSelected}
                                onClick={onSelectGeneration}
                            />
                        );
                    })}
                </div>
                <div className="flex flex-col">
                    <label htmlFor="pokedexRange" className="mb-2">
                        Number Range
                    </label>
                    <Range
                        name="pokedexRange"
                        id="pokedexRange"
                        min={GENERATION_1_START}
                        minValue={pokedexNumberRange[0]}
                        max={GENERATION_8_END}
                        maxValue={pokedexNumberRange[1]}
                    />
                </div>
            </Popup>
        </div>
    );
};

export default Options;
