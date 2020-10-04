import React from "react";

const Button = ({ children, isPrimary, ...props }) => {
    const classes = isPrimary ? "bg-red-500 text-white" : "bg-gray-400 text-gray-700";

    return (
        <button className={`flex p-4 rounded-lg ${classes}`} {...props}>
            {children}
        </button>
    );
};

export default Button;
