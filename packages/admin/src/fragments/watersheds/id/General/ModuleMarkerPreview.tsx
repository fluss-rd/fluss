import {
  Divider,
  Button,
  Popover,
  Typography,
  SvgIconTypeMap,
  Card,
  CardContent,
  CardActions,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { FC, MouseEvent, useState } from "react";
import getWqiColor from "helpers/get-wqi-color";
import Module, { mockModules } from "models/module";
import { Update, BatteryFull } from "@material-ui/icons";
import formatDate from "shared/helpers/formatDate";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { ratingToString } from "models/wqi-rating";

interface ModuleMarkerPreviewProps {
  moduleId: string;
  onClose: () => void;
  anchorEl: HTMLButtonElement;
}

const ModuleMarkerPreview: FC<ModuleMarkerPreviewProps> = (props) => {
  const classes = useStyles();
  const openPopover = Boolean(props.anchorEl);
  const popoverId = openPopover ? "module-mark-popover" : undefined;
  const module = mockModules().find((m) => m.id === props.moduleId);
  const color = getWqiColor(module?.wqi);

  const onEdit = () => {
    props.onClose;
  };

  return (
    <Popover
      id={popoverId}
      open={openPopover}
      anchorEl={props.anchorEl}
      onClose={props.onClose}
      anchorOrigin={{
        vertical: "center",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "center",
        horizontal: "right",
      }}
    >
      <Card className={classes.content}>
        <CardContent>
          <Typography variant="caption" style={{ fontWeight: "bold" }}>
            {module.id} — {module.alias}
          </Typography>
          <Typography variant="h6" style={{ color }}>
            WQI {module.wqi.value} - {ratingToString(module.wqi.rating)}
          </Typography>
          <br />
          <table>
            <tbody>
              <Item
                icon={Update}
                title="Última actualización"
                value={formatDate(module.updateDate, { type: "dateAndTime" })}
              />
              <Item icon={BatteryFull} title="Nivel de batería" value={`${module.batteryLevel}%`} />
            </tbody>
          </table>
        </CardContent>
        <Divider />
        <CardActions style={{ flexDirection: "row-reverse" }}>
          <Button size="small" color="primary">
            Ver datos
          </Button>
          <Button size="small" color="primary">
            Editar
          </Button>
        </CardActions>
      </Card>
    </Popover>
  );
};

interface ItemProps {
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  title: string;
  value: string;
}

const Item: FC<ItemProps> = ({ icon: Icon, title, value }) => {
  return (
    <tr>
      <td style={{ display: "flex", alignItems: "center" }}>
        <Icon fontSize="small" />
      </td>
      <td style={{ paddingRight: "1em" }}>
        <Typography variant="body1">{title}</Typography>
      </td>
      <td>
        <Typography variant="body1">{value}</Typography>
      </td>
    </tr>
  );
};

const useStyles = makeStyles((theme) => ({
  content: {},
}));

export default ModuleMarkerPreview;

