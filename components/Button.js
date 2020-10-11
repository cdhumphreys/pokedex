import React from "react";

const Button = ({ children, isPrimary, ...props }) => {
    const classes = isPrimary
        ? "bg-red-500 text-white hover:bg-red-600"
        : "bg-gray-400 text-gray-700 hover:bg-gray-500";

    return (
        <button className={`flex py-3 px-3 rounded-lg focus:outline-none ${classes}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
