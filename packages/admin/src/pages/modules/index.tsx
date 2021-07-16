import { makeStyles } from "@material-ui/core/styles";
import { NextPage } from "next";
import { Typography } from "@material-ui/core";
import Module, { mockModules } from "shared/models/Module";
import DataTable, { DataTableColumn } from "shared/components/DataTable";

const Modules: NextPage = () => {
  const classes = useStyles();
  const modules = mockModules();
  const modulesQuantity = 3;

  return (
    <div>
      <Typography variant="h4">Módulos</Typography>
      <Typography variant="subtitle1" color="textSecondary">
        {modulesQuantity} en total
      </Typography>

      {/*
        <DataTable columns={moduleColumns} data={modules} />
          */}
    </div>
  );
};

const computeModuleColumns = (): DataTableColumn<Module>[] => {
  return [];
};

const useStyles = makeStyles((theme) => ({}));

export default Modules;

