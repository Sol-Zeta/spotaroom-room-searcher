import "normalize.css/normalize.css";
import "../../styles/globals.css";
import { useState } from "react";
import { Router } from "next/router";
import type { AppProps } from "next/app";
import PropertiesState from "../context/Properties/PropertiesState";
import { Navigation } from "../navigation";
import { AppLoader } from "../components/Loader/AppLoader";

function MyApp({ Component, pageProps }: AppProps) {

  const [isLoading, setIsLoading] = useState(false)


  Router.events.on ("routeChangeStart", (url) =>{
    setIsLoading(true)
  })

  Router.events.on ("routeChangeComplete", (url) =>{
    setIsLoading(false)
  })

  if(isLoading){
    return <AppLoader />
  }

  return (
    <PropertiesState>
      {isLoading ? <AppLoader /> : <></>}
      <Navigation>
        <Component {...pageProps} />
      </Navigation>
    </PropertiesState>
  );
}

export default MyApp;
