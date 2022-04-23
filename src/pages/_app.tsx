import "../../styles/globals.css";
import type { AppProps } from "next/app";
import PropertiesState from "../context/Properties/PropertiesState";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PropertiesState>
      <Component {...pageProps} />
    </PropertiesState>
  );
}

export default MyApp;
