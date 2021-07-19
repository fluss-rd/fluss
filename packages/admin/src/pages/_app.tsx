import "@fontsource/nunito";
import "mapbox-gl/dist/mapbox-gl.css";
import "regenerator-runtime/runtime";

import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider } from "@material-ui/core/styles";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import Layout from "layouts/Layout";
import React, { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import theme, { GlobalCss } from "styles/theme";
import { Hydrate } from "react-query/hydration";
import { useState } from "react";
import { createMuiTheme } from "@material-ui/core";
import { useRouter } from "next/router";


function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();
  const isInMonitor = router.pathname === "/";
  const currentTheme = isInMonitor ? monitorTheme : theme;

  useEffect(removeServerSideInjectedCss, []);

  function removeServerSideInjectedCss() {
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles && jssStyles.parentElement) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <ThemeProvider theme={currentTheme}>
            <GlobalCss />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </MuiPickersUtilsProvider>
      </Hydrate>
    </QueryClientProvider>
  );
}

const monitorTheme = createMuiTheme({
  ...theme,
  palette: {
    type: "dark",
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#7db6d1",
    },
  },
});

export default MyApp;

