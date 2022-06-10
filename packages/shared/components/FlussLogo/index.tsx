import { Button, Typography, TypographyProps } from "@material-ui/core";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import Image from "next/image";

interface FlussLogoProps {
  imagePath?: string; // TODO: I think this must be a required prop
  darkImagePath?: string; // TODO: I think this must be a required prop
  onClick?: () => void;
  TypographyProps?: TypographyProps;
  grow?: boolean;
}

export default function FlussLogo(props: FlussLogoProps) {
  const classes = useStyles({ grow: props.grow });
  const theme = useTheme();
  const usesDarkTheme = theme.palette.type === "dark";
  const imageUrl = !usesDarkTheme ? props.imagePath : props.darkImagePath;
  console.log({ imageUrl });

  return (
    <Button className={classes.brand} onClick={props.onClick}>
      <div className={classes.logo}>
        <Image src={imageUrl} alt="Logo" width={35} height={35} />
      </div>
      <Typography variant="h5" color="textPrimary" noWrap {...props.TypographyProps}>
        fluss
      </Typography>
    </Button>
  );
}

FlussLogo.defaultProps = {
  imagePath: "/images/logo.png",
  darkImagePath: "/images/logo_image_dark.png",
  color: "secondary",
  grow: true,
} as Partial<FlussLogoProps>;

const useStyles = makeStyles<Theme, { grow: boolean }>((theme: Theme) => ({
  brand: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    cursor: "pointer",
    textTransform: "none",
    flexGrow: ({ grow }) => (grow ? 1 : undefined),
  },
  logo: {
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(2),
  },
}));
