import React from "react";
import Head from "next/head";

const Layout = ({ title = "Pokemon", children }) => {
    return (
        <div className="bg-gray-300 pb-12">
            <Head>
                <title>{title}</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="container max-w-full md:max-w-3xl lg:max-w-4xl min-h-screen mx-auto pt-8 px-4 w-3xl">
                {children}
            </main>
        </div>
    );
};

export default Layout;
