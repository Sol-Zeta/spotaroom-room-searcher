import "normalize.css/normalize.css";
import "../../styles/globals.css";
import type { AppProps } from "next/app";
import PropertiesState from "../context/Properties/PropertiesState";
import { Navigation } from "../navigation";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PropertiesState>
      <Navigation>
        <Component {...pageProps} />
      </Navigation>
    </PropertiesState>
  );
}

export default MyApp;
