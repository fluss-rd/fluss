import { makeStyles, Theme } from "@material-ui/core/styles";
import React, { FC } from "react";
import { Typography } from "@material-ui/core";

type Margin = Partial<{ top: number; bottom: number; left: number; right: number }> | number;

interface IconLabelProps {
  icon?: JSX.Element;
  title?: number | string | JSX.Element;
  value?: number | string | JSX.Element;
  spacing?: number;
  alignIcon?: string;
  themeSpacing?: Margin;
}

const IconLabel: FC<IconLabelProps> = ({ icon, title, value, spacing, alignIcon, themeSpacing: margin }) => {
  const classes = useStyles({ spacing, alignIcon, margin });
  const selectedTitle = selectFormat(title);
  const selectedValue = selectFormat(value);

  return (
    <div className={classes.content}>
      <div className={classes.icon}>{icon}</div>
      {selectedTitle}
      {selectedValue}
    </div>
  );
};

function selectFormat(element: string | number | JSX.Element) {
  if (typeof element === "string" || typeof element === "number") {
    return <Typography>{element}</Typography>;
  }

  return element;
}

const useStyles = makeStyles<Theme, { spacing: number; alignIcon: string; margin: Margin }>(
  (theme) => ({
    content: ({ spacing, margin }) => ({
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      margin: typeof margin === "number" && theme.spacing(margin),
      marginTop: typeof margin === "object" && theme.spacing(margin.top || 0),
      marginBottom: typeof margin === "object" && theme.spacing(margin.bottom || 0),
      marginLeft: typeof margin === "object" && theme.spacing(margin.left || 0),
      marginRight: typeof margin === "object" && theme.spacing(margin.right || 0),

      "& :not(:last-child)": {
        marginRight: theme.spacing(spacing),
      },
    }),
    icon: ({ alignIcon }) => ({
      display: "flex",
      alignSelf: alignIcon,
    }),
  })
);

IconLabel.defaultProps = {
  spacing: 1,
  alignIcon: "center",
  themeSpacing: { bottom: 1.5 },
};

export default IconLabel;

