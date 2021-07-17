import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Log, { mockLogs } from "models/Log";
import React, { FC } from "react";
import DataTable, { DataTableColumn } from "shared/components/DataTable";

import { formatDate } from "../../../../../shared/helpers";

interface LogsProps {}

const Logs: FC<LogsProps> = (props) => {
  const classes = useStyles();

  return <DataTable data={mockLogs()} columns={columns} />;
};

const columns: DataTableColumn<Log>[] = [
  {
    Header: "Fecha",
    accessor: ({ timestamp }) => formatDate(timestamp, { type: "dateAndTime" }),
  },
  {
    Header: "Mensaje",
    accessor: ({ description, moduleName }) => (
      <Accordion elevation={0}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="detail"
          id={`detail-${moduleName}`}
        >
          <Typography>{description}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List dense>
            <ListItem>
              <ListItemText primary="pH: 4" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Oxígeno: 4" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Sólidos disueltos: 4" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Turbidez: 4" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Temperatura: 4" />
            </ListItem>
          </List>
        </AccordionDetails>
      </Accordion>
    ),
  },
];

const useStyles = makeStyles({});

export default Logs;
