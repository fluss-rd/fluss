import "@fontsource/nunito";

import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import Layout from "layouts";
import React, { useEffect } from "react";
import ServiceProvider from "services/ServiceProvider";
import { initialState, StateContext } from "store/state";
import theme, { GlobalCss } from "styles/theme";

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
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider theme={theme}>
          <GlobalCss />
          <ServiceProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ServiceProvider>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </StateContext.Provider>
  );
}

export default MyApp;
