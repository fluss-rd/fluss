import "@fontsource/nunito";
import "mapbox-gl/dist/mapbox-gl.css";
import "regenerator-runtime/runtime";

import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import Layout from "layouts/Layout";
import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { initialState, StateContext } from "store/state";
import theme, { GlobalCss } from "styles/theme";

// Create a client
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  useEffect(removeServerSideInjectedCss, []);

  function removeServerSideInjectedCss() {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <ThemeProvider theme={theme}>
        <GlobalCss />
        <QueryClientProvider client={queryClient} contextSharing={true}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
}

export default MyApp;

