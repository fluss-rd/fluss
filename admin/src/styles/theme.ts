import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#1f6485" },
    secondary: { main: "#7db6d1" },
  },
  typography: {
    fontFamily: ["Roboto", "Nunito", "Calibri", "Arial"].join(","),
  },
  shape: {
    borderRadius: 20,
  },
});

export default theme;
