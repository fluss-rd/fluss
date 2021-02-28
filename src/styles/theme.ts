import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#1f6485" },
    secondary: { main: "#7db6d1" },
    background: { default: "#ffffff" },
  },
  typography: {
    fontFamily: ["nunito"].join(","),
  },
});

export default theme;
