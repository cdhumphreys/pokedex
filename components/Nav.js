import React from "react";

const Nav = ({ children }) => (
    <nav className="flex flex-row items-center justify-end space-x-2 sticky top-0 p-4 bg-gray-200 z-20 md:shadow">
        {children}
    </nav>
);

export default Nav;
