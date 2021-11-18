import { Box, IconButton, Tooltip, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Battery90Icon from "@material-ui/icons/Battery90";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import CreateModule from "fragments/modules/CreateModule";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useMemo } from "react";
import DataTable, { DataTableColumn } from "shared/components/DataTable";
import SelectColumnFilter from "shared/components/DataTable/filters/SelectColumnFilter";
import { formatDate } from "shared/helpers";
import Module from "shared/models/Module";
import { fromModuleResponse } from "shared/models/Module";
import { moduleStateToColor, moduleStateToString } from "shared/models/ModuleState";
import { useGetModulesInfo } from "shared/services/modules/hooks";

const Modules: NextPage = () => {
  const router = useRouter();
  const { data, isLoading } = useGetModulesInfo();
  const modules = data?.data ? data?.data.map((m) => fromModuleResponse(m)) : [];
  const moduleColumns = useColumns(goToDetails);
  const modulesQuantity = modules?.length || 0;

  console.log({ modules });

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
      <DataTable
        showGlobalFilter
        showFilters
        loading={isLoading}
        columns={moduleColumns}
        data={modules}
      />
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
