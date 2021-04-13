import { Fab, makeStyles } from "@material-ui/core";
import PermissionGroup from "models/PermissionGroup";
import Rol from "models/Rol";
import { useMemo } from "react";
import { DataTableColumn, EnhancedDataTable } from "shared/components/Tables";
import { useMergeState } from "shared/hooks";

import Actions, { ActionsEvent } from "./Action";
import AddPermission from "./AddPermission";
import NullActions from "./NullActions";

export default function Permissions() {
  const classes = useStyles();
  const [data, columns] = useMemo(() => generateDateAndColumns(handleChange), []);
  const [state, setState] = useMergeState({ data });

  function handleChange({ groupIndex, actionIndex, actionType, checked }: ActionsEvent) {
    setState((prev) => {
      const modified = [...prev.data];
      modified[groupIndex].actions[actionIndex][actionType] = checked;

      return { data: modified };
    });
  }

  return (
    <>
      <EnhancedDataTable data={state.data} columns={columns} />
      <AddPermission />
    </>
  );
}

function generateDateAndColumns(handleChange: (event: ActionsEvent) => void): DataAndColumns {
  const roles: Rol[] = Rol.mockData();
  const data: PermissionGroup[] = PermissionGroup.mockData();
  const columns: DataTableColumn<PermissionGroup>[] = [];

  // Add columns.
  columns.push({
    Header: "Recurso",
    accessor: (group: PermissionGroup) => group.permission.name,
    columnWidth: "10%",
  });
  columns.push({
    Header: "Descripción",
    accessor: (group: PermissionGroup) => group.permission.description,
    columnWidth: "30%",
  });

  for (const rol of roles) {
    columns.push({
      Header: rol.name,
      columnTitleStyles: { textAlign: "center" },
      accessor: (group: PermissionGroup, i: number) => {
        const index = group.actions.findIndex((a) => a.rol.id === rol.id);
        const action = group.actions[index];

        if (!action)
          return (
            <NullActions rolName={rol.name} permissionName={group.actions[0].permission.name} />
          );

        return (
          <Actions
            actions={action}
            groupIndex={i}
            actionIndex={index}
            handleChange={handleChange}
          />
        );
      },
    });
  }

  return [data, columns];
}

type DataAndColumns = [PermissionGroup[], DataTableColumn<PermissionGroup>[]];

const useStyles = makeStyles((theme) => ({}));
