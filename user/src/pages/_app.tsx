import "@fontsource/nunito";

import React, { useEffect } from "react";

import Layout from "layouts";
import { ServiceProvider } from "services/service";
import { initialState, StateContext } from "store/state";

function MyApp({ Component, pageProps }) {
  useEffect(removeServerSideInjectedCss, []);

  function removeServerSideInjectedCss() {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  return (
    <StateContext.Provider value={initialState}>
      <ServiceProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ServiceProvider>
    </StateContext.Provider>
  );
}

export default MyApp;
