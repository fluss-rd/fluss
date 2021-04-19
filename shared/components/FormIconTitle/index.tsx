import { SvgIconTypeMap, Typography } from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { makeStyles, Theme } from "@material-ui/core/styles";
import React, { FC } from "react";
import clsx from "clsx";

interface FormIconTitleProps {
  Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  title: string;
  marginBottom?: number;
  className?: string | string[];
}

const FormIconTitle: FC<FormIconTitleProps> = (props) => {
  const classes = useStyles({ marginBottom: props.marginBottom });
  const title = props.title.toUpperCase();
  const Icon = props.Icon;
  const classNames = props.className
    ? typeof props.className === "string"
      ? [props.className]
      : props.className
    : [];

  return (
    <div className={clsx(classes.sectionTitle, ...classNames)}>
      <Icon color="action" />
      <Typography variant="caption" color="textSecondary">
        {title}
      </Typography>
    </div>
  );
};

FormIconTitle.defaultProps = {
  marginBottom: 3,
};

const useStyles = makeStyles<Theme, { marginBottom: number }>((theme: Theme) => ({
  sectionTitle: {
    display: "flex",
    alignItems: "center",
    marginBottom: ({ marginBottom }) => theme.spacing(marginBottom),
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(1),
    },
  },
}));

export default FormIconTitle;

