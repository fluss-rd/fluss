import { Box, BoxProps } from "@material-ui/core";
import { CSSProperties } from "react";

import AntTabs, { AntTab } from "./AntTabs";
import HorizontalIconTab from "./HorizontalIconTab";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
  padding?: number;
  style?: CSSProperties;
  className?: string;
  BoxProps?: BoxProps;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, padding, ...other } = props;
  console.log(padding);

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      style={{ height: "100%" }}
      {...other}
    >
      {value === index && (
        <Box p={padding} {...other.BoxProps}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.defaultProps = {
  padding: 3,
  BoxProps: {},
  styles: {},
};

export default TabPanel;
export { AntTab, AntTabs, HorizontalIconTab };
