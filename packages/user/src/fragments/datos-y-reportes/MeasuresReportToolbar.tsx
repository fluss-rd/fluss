import { AppBar, Toolbar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC, useMemo } from "react";
import { useDataTable } from "shared/components/Tables";
import { FilterRows, ShowColumns } from "shared/components/Tables";
import { DateTimeRange } from "shared/components/Tables";
import { useMergeState } from "shared/hooks";

import ReportSetting from "./ReportSetting";

const MeasuresReportToolbar: FC = () => {
  const classes = useStyles();
  const context = useDataTable();
  const allColumns = context.table.allColumns;
  const granularityList = useMemo(() => ["Semanal", "Mensual", "Anual"], []);
  const rivers = useMemo(() => ["Yaque del Norte", "Yaque del Sur"], []);

  const [state, setState] = useMergeState({ granularity: granularityList[0], river: rivers[0] });

  return (
    <AppBar className={classes.appBar} color="inherit" elevation={1}>
      <Toolbar className={classes.toolbar}>
        <div className={classes.settings}>
          <ReportSetting
            title="Cuerpo hídrico"
            value={state.river}
            settings={rivers}
            onSelect={(river) => setState({ river })}
          />
          <ReportSetting
            title="Granularidad"
            value={state.granularity}
            settings={granularityList}
            onSelect={(granularity) => setState({ granularity })}
          />
        </div>
        <div className={classes.columnsAndFilters}>
          <FilterRows columns={allColumns} labeled />
          <ShowColumns columns={allColumns} labeled />
          <DateTimeRange labeled />
        </div>
      </Toolbar>
    </AppBar>
  );
};

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  settings: {
    minWidth: 500,
    display: "flex",
    alignItems: "center",
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(2),
    },
  },
  columnsAndFilters: {
    display: "flex",
    alignItems: "center",
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(2),
    },
  },
}));

export default MeasuresReportToolbar;
