import "@fontsource/nunito";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "styles/styles.scss";
import "mapbox-gl/dist/mapbox-gl.css";

import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";
import Layout from "layouts";
import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ServiceProvider } from "services/service";
import { initialState, StateContext } from "store/state";
import theme, { GlobalCss } from "styles/theme";
import { useRouter } from "next/router";
import { createMuiTheme } from "@material-ui/core";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isInMonitor = router.pathname === "/monitor";
  const currentTheme = isInMonitor ? monitorTheme : theme;

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
        <ThemeProvider theme={currentTheme}>
          <GlobalCss />
          <ServiceProvider>
            <QueryClientProvider client={queryClient}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </QueryClientProvider>
          </ServiceProvider>
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </StateContext.Provider>
  );
}

const monitorTheme = createMuiTheme({
  ...theme,
  palette: {
    type: "dark",
    primary: {
      main: "#FFFFFF",
    },
  },
});
export default MyApp;

