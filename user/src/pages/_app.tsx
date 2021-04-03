import "@fontsource/nunito";

import React, { useEffect } from "react";

import Layout from "layouts";
import { ServiceProvider } from "services/service";
import { initialState, StateContext } from "store/state";
import theme, { GlobalCss } from "styles/theme";
import { ThemeProvider } from "@material-ui/styles";

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
      <ThemeProvider theme={theme}>
        <GlobalCss />
        <ServiceProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ServiceProvider>
      </ThemeProvider>
    </StateContext.Provider>
  );
}

export default MyApp;

