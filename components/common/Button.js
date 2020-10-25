import React from "react";

const Button = ({ className = "", children, isPrimary, ...props }) => {
    const classes = isPrimary
        ? "bg-red-500 text-white hover:bg-red-600"
        : "bg-gray-400 text-gray-700 hover:bg-gray-500";

    return (
        <button
            className={`flex items-center justify-center py-3 px-3 rounded-lg focus:outline-none ${classes} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
