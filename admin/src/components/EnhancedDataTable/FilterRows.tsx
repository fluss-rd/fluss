import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FilterList } from "@material-ui/icons";
import React, { FC } from "react";

import PopoverIcon from "../PopoverIcon";

interface FilterRowsProps {}

const FilterRows: FC<FilterRowsProps> = (props) => {
  const classes = useStyles();

  return (
    <PopoverIcon title="Filtros" icon={FilterList}>
      hey
    </PopoverIcon>
  );
};

const useStyles = makeStyles((theme: Theme) => ({}));

export default FilterRows;
