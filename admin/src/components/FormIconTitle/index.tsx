import { SvgIconTypeMap, Typography } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { makeStyles, Theme } from "@material-ui/core/styles";
import React, { FC } from "react";

interface FormIconTitleProps {
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  title: string;
}

const FormIconTitle: FC<FormIconTitleProps> = (props) => {
  const classes = useStyles();
  const title = props.title.toUpperCase();
  const Icon = props.Icon;

  return (
    <div className={classes.sectionTitle}>
      <Icon color="action" />
      <Typography variant="caption" color="textSecondary">
        {title}
      </Typography>
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  sectionTitle: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(3),
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(1),
    },
  },
}));

export default FormIconTitle;
