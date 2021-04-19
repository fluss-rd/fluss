import { Box } from "@material-ui/core";

import AntTabs, { AntTab } from "./AntTabs";
import HorizontalIconTab from "./HorizontalIconTab";

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

export default TabPanel;
export { AntTab, AntTabs, HorizontalIconTab };

