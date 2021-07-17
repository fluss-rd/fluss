import { makeStyles } from "@material-ui/core/styles";
import { NextPage } from "next";
import { Typography, Box, IconButton, Tooltip } from "@material-ui/core";
import Module, { mockModules } from "shared/models/Module";
import { moduleStateToColor, moduleStateToString } from "shared/models/ModuleState";
import DataTable, { DataTableColumn } from "shared/components/DataTable";
import { useMemo } from "react";
import Battery90Icon from "@material-ui/icons/Battery90";
import { formatDate } from "shared/helpers";
import SelectColumnFilter from "shared/components/DataTable/filters/SelectColumnFilter";
import CreateModule from "fragments/modules/CreateModule";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { useRouter } from "next/router";

const Modules: NextPage = () => {
  const classes = useStyles();
  const modules = mockModules();
  const router = useRouter();
  const moduleColumns = useColumns(goToDetails);
  const modulesQuantity = 3;

  function goToDetails(moduleId: string) {
    router.push(`/modules/${moduleId}`);
  }

  return (
    <div>
      <Typography variant="h4">Módulos</Typography>
      <Typography variant="subtitle1" color="textSecondary">
        {modulesQuantity} en total
      </Typography>

      <br />
      <DataTable showGlobalFilter showFilters columns={moduleColumns} data={modules} />
      <CreateModule />
    </div>
  );
};

function useColumns(goToDetail: (moduleId: string) => void): DataTableColumn<Module>[] {
  const classes = useStyles();

  const columns: DataTableColumn<Module>[] = useMemo(
    () =>
      [
        { accessor: "id", Header: "ID" },
        { accessor: "alias", Header: "Alias" },
        { accessor: "watershedName", Header: "Ubicación", Filter: SelectColumnFilter },
        {
          id: "state",
          Header: "Estado",
          accessor: ({ state }) => {
            const color = moduleStateToColor(state);
            const stateText = moduleStateToString(state);
            return (
              <div>
                <Box style={{ borderColor: color, color }} border={1} className={classes.state}>
                  <Typography>{stateText}</Typography>
                </Box>
              </div>
            );
          },
        },
        {
          id: "battery",
          Header: "Batería",
          accessor: () => (
            <div className={classes.battery}>
              <Typography>98%</Typography>
              <Battery90Icon />
            </div>
          ),
        },
        {
          id: "creationDate",
          Header: "Fecha de registro",
          accessor: ({ creationDate }) => formatDate(creationDate, { type: "dateAndTime" }),
        },
        {
          id: "updateDate",
          Header: "Última actualización",
          accessor: ({ updateDate }) => formatDate(updateDate, { type: "dateAndTime" }),
        },
        {
          id: "more",
          Header: " ",
          accessor: ({ id }) => (
            <Tooltip title="Ver detalles">
              <IconButton onClick={() => goToDetail(id)}>
                <ChevronRightIcon />
              </IconButton>
            </Tooltip>
          ),
        },
      ] as DataTableColumn<Module>[],
    []
  );

  return columns;
}
const useStyles = makeStyles((theme) => ({
  state: {
    padding: theme.spacing(0.5),
    borderRadius: theme.shape.borderRadius,
    width: "fit-content",
  },
  battery: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "fit-content",
  },
}));

export default Modules;

