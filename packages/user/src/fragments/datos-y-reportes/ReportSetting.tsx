import { MenuItem, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { ChangeEvent, FC, ReactNode } from "react";
import FormSelect from "shared/components/FormSelect";

interface ReportSettingProps {
  title: string;
  settings: string[];
  value: string;
  onSelect?: (selected: string) => void;
}

const ReportSetting: FC<ReportSettingProps> = ({ title, settings, value, onSelect }) => {
  const classes = useStyles();

  function onChange(e: ChangeEvent<{ name?: string; value: string }>) {
    onSelect(e.target.value);
  }

  return (
    <FormSelect
      noneText="Seleccionar"
      label={title}
      value={value}
      onChange={onChange}
      className={classes.select}
      FormControlProps={{ size: "small" }}
    >
      {settings.map((setting) => (
        <MenuItem key={setting} value={setting}>
          {setting}
        </MenuItem>
      ))}
    </FormSelect>
  );
};

const useStyles = makeStyles((theme) => ({
  select: {
    minWidth: 120,
  },
}));

export default ReportSetting;
