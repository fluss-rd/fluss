import { Theme } from "@material-ui/core/styles";

export default function appBarHeight(theme: Theme): number {
  return (theme.mixins.toolbar.minHeight as number) + theme.spacing(1);
}

