import { makeStyles } from "@material-ui/core/styles";
import React, { FC } from "react";
import FormField from "shared/components/FormField";
import ModalContent from "shared/components/ModalContent";
import { formatDate } from "shared/helpers";

interface ModalFormDatesProps {
  lastUpdate?: Date;
  creationDate?: Date;
}

const ModalFormDates: FC<ModalFormDatesProps> = ({ lastUpdate, creationDate }) => {
  const classes = useStyles();

  return (
    <ModalContent className={classes.content}>
      <FormField
        disabled
        fullWidth={false}
        value={formatDate(lastUpdate)}
        label="Última actualización"
        variant="standard"
        InputProps={{ classes: { underline: classes.underline } }}
      />
      <FormField
        disabled
        fullWidth={false}
        value={formatDate(creationDate)}
        label="Fecha de creación"
        variant="standard"
        InputProps={{ classes: { underline: classes.underline } }}
      />
    </ModalContent>
  );
};

const useStyles = makeStyles((theme) => ({
  content: {
    display: "flex",
    height: "0px",
    flexDirection: "row",
    "& > *:not(:last-child)": {
      marginRight: theme.spacing(2),
    },
  },
  underline: {
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
  },
}));

export default ModalFormDates;
