import { createMuiTheme, withStyles } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#1f6485" },
    secondary: { main: "#7db6d1" },
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

