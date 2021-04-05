import { Theme } from "@material-ui/core/styles";
import theme, { GlobalCss } from "shared/styles/theme";

const customTheme: Theme = { ...theme };
customTheme.palette.background.default = "#ffffff";

export default theme;
export { GlobalCss };
