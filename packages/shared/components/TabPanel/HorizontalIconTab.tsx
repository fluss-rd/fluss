import { Tab, TabProps, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC, ReactNode } from "react";

type HorizontalIconTabProps = Partial<TabProps> & {
  index?: number;
  label?: string | ReactNode;
  icon?: ReactNode;
};

const HorizontalIconTab: FC<HorizontalIconTabProps> = ({ index, label, icon, ...props }) => {
  const classes = useStyles();
  const a11Props = a11yProps(index);

  return (
    <Tab
      tabIndex={index}
      label={
        <div className={classes.tabContent}>
          {icon ? icon : null}
          {typeof label === "string" ? (
            <Typography variant="body2">{label}</Typography>
          ) : (
            <>{label}</>
          )}
        </div>
      }
      {...a11Props}
      {...props}
    />
  );
};

HorizontalIconTab.defaultProps = {
  icon: null,
  label: null,
  index: 0,
};

(HorizontalIconTab as any).muiName = "Tab";

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  tabContent: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(2),
    },
  },
}));

export default HorizontalIconTab;
