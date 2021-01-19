import "../styles/globals.css";
import "../styles/app.scss";

import { Grommet } from "grommet";

const theme = {
    global: {
        font: {
            family: "sans-serif",
            size: "18px",
            height: "20px",
        },
        colors: {
            brand: "#EF4444",
            brandTransparent: "rgba(239, 68, 68, 0.5)",
            focus: "#80A1D4",
        },
    },
};

function MyApp({ Component, pageProps }) {
    
    return (
    <Grommet theme={theme}>
        <Component {...pageProps} />
    </Grommet>
    );
}

export default MyApp;
