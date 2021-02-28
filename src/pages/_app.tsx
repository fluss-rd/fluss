import React, { useEffect } from "react";
import Layout from "../layouts";
import { initialState, StateContext } from "../store/state";
import "@fontsource/nunito";

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
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </StateContext.Provider>
  );
}

export default MyApp;
