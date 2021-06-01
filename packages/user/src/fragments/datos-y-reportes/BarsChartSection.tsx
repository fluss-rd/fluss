import { Typography } from "@material-ui/core";
import ModuleMeasure from "models/ModuleMeasure";
import React, { FC, useMemo } from "react";
import { DataTableColumn, useDataTable } from "shared/components/Tables";

import BarChart from "./BarChart";

interface BarsChartSectionProps {
  ignored?: Array<keyof ModuleMeasure>;
}

const BarsChartSection: FC<BarsChartSectionProps> = (props) => {
  const context = useDataTable();
  const groups = context.table.headerGroups as unknown as Array<{
    headers: DataTableColumn<ModuleMeasure>[];
  }>;
  const columnIds = groups[0].headers ? groups[0].headers.map((group) => group.id) : [];
  console.log(props.ignored);
  const valid = columnIds.filter((id: keyof ModuleMeasure) => props.ignored!.indexOf(id) === -1);

  return (
    <div>
      <Typography variant="h5">Gráfico de barras</Typography>
      <div style={{ height: 300 }}>
        <BarChart
          data={context.table.data}
          columns={valid}
          indexBy="moment"
          axisBottomTitle={"hmmm"}
          axisLeftTitle="Porcentaje"
        />
      </div>
    </div>
  );
};

BarsChartSection.defaultProps = {
  ignored: ["moment"],
};

export default BarsChartSection;
