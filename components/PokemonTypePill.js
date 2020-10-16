import React from "react";
import styles from "../styles/pokemon-types.module.scss";

const PokemonTypePill = ({ typeName = "", icon = true, text = true }) => {
    let typeIcon = null;
    if (icon) {
        try {
            typeIcon = <img className="w-4 h-4 mx-1" src={`/images/types/${typeName}.png`} alt={typeName} />;
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <button
            className={`inline-flex flex-row justify-items-center items-center font-bold py-1 px-2 rounded full capitalize ${
                styles["type-pill"]
            } bg--${typeName.toLowerCase()}`}
        >
            {icon && typeIcon}
            {text && <span className="mx-1 capitalize text-xs">{typeName}</span>}
        </button>
    );
};

export default PokemonTypePill;
