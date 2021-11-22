import { makeStyles } from "@material-ui/core/styles";
import appBarHeight from "shared/helpers/appBarHeight";
import React, { FC } from "react";
import { Element } from "react-scroll";
import clsx from "clsx";

interface HomeSectionProps {
  name: string;
  className?: string;
}

const HomeSection: FC<HomeSectionProps> = ({ name, className, children }) => {
  const classes = useStyles();

  return (
    <Element name={name} className={clsx(classes.section, className)}>
      {children}
    </Element>
  );
};

const useStyles = makeStyles((theme) => ({
  section: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "calc(100vh / 1.5)",
    [theme.breakpoints.down("xs")]: {
      minHeight: `calc(100vh - ${appBarHeight(theme)}px)`,
    },
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
  },
}));

export default HomeSection;

