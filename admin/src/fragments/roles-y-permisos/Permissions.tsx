import { DataTableColumn, EnhancedDataTable } from "components/Tables";
import useMergeState from "hooks/useMergeState";
import PermissionGroup from "models/PermissionGroup";
import Rol from "models/Rol";
import { useMemo } from "react";

import Actions, { ActionsEvent } from "./Permission";

export default function Permissions() {
  const [data, columns] = useMemo(() => generateDateAndColumns(handleChange), []);
  const [state, setState] = useMergeState({ data });

  function handleChange({ groupIndex, actionIndex, actionType, checked }: ActionsEvent) {
    setState((prev) => {
      const modified = [...prev.data];
      modified[groupIndex].actions[actionIndex][actionType] = checked;

      return { data: modified };
    });
  }

  return <EnhancedDataTable data={state.data} columns={columns} />;
}

function generateDateAndColumns(handleChange: (event: ActionsEvent) => void): DataAndColumns {
  const roles: Rol[] = Rol.mockData();
  const data: PermissionGroup[] = PermissionGroup.mockData();
  const columns: DataTableColumn<PermissionGroup>[] = [];

  // Add columns.
  columns.push({ Header: "Recurso", accessor: "name" });

  for (const rol of roles) {
    columns.push({
      Header: rol.name,
      accessor: (group: PermissionGroup, i: number) => {
        const index = group.actions.findIndex((a) => a.rol.id === rol.id);
        const action = group.actions[index];

        if (!action) return null;

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
