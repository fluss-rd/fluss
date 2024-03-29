import { red } from "@material-ui/core/colors";
import { createMuiTheme, withStyles } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#060913" },
    secondary: { main: "#7db6d1" },
    error: { main: red[600] },
  },
  typography: {
    fontFamily: ["Nunito", "Roboto", "Calibri", "Arial"].join(","),
  },
  shape: {
    borderRadius: 10,
  },
});

export const GlobalCss = withStyles((theme) => ({
  "@global": {
    ":root": {
      "--color-primary": theme.palette.primary.main,
      "--color-secondary": theme.palette.secondary.main,
      "--color-background": theme.palette.background.default,
      "--color-text-hint": theme.palette.text.hint,
    },
  },
}))(() => null);

export default theme;
