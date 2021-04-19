import { makeStyles, Theme } from "@material-ui/core/styles";
import { Tabs, Tab } from "@material-ui/core";
import TabPanel from "shared/components/TabPanel";
import React, { FC, use } from "react";

interface VerticalTabsProps {}

const VerticalTabs: FC<VerticalTabsProps> = (props) => {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);

  return (
  );
};


export default VerticalTabs;

