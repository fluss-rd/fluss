import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Popover,
  SvgIconTypeMap,
  Typography,
} from "@material-ui/core";
import { OverridableComponent } from "@material-ui/core/OverridableComponent";
import { BatteryFull, Update } from "@material-ui/icons";
import { wqiToColor } from "../../../models/Wqi";
import { mockModules } from "shared/models/Module";
import React, { FC } from "react";
import formatDate from "shared/helpers/formatDate";
import { ratingToText, ratingToColor } from "shared/models/WqiRating";

import ModuleLast24HoursChart from "./ModuleLast24HoursChart";

interface ModuleMarkerPreviewProps {
  moduleId: string;
  onModuleData?: (moduleId: string) => void;
  onClose: () => void;
  anchorEl: HTMLButtonElement;
}

const ModuleMarkerPreview: FC<ModuleMarkerPreviewProps> = (props) => {
  const openPopover = Boolean(props.anchorEl);
  const popoverId = openPopover ? "module-mark-popover" : undefined;
  const module = mockModules().find((m) => m.id === props.moduleId);
  const color = ratingToColor(module?.wqi?.rating);

  const onModuleData = () => {
    if (props.onModuleData) {
      props.onModuleData(props.moduleId);
    }
  };

  return (
    <>
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
          horizontal: "center",
        }}
      >
        <Card onMouseLeave={props.onClose}>
          <CardContent>
            <Typography variant="caption" style={{ fontWeight: "bold" }}>
              {/*TODO: Only for admins: {module.id}*/} {/*TODO: Only for admins: —*/} {module.alias}
            </Typography>
            <Typography variant="h6" style={{ color }}>
              WQI {module.wqi.value} - {ratingToText(module.wqi.rating)}
            </Typography>
            {/* TODO: only for admins
            <br />
      <table>
      <tbody>
      <Item
      icon={Update}
      title="Última actualización"
      value={formatDate(module.updateDate, { type: "dateAndTime" })}
      />
      <Item
      icon={BatteryFull}
      title="Nivel de batería"
      value={`${module.batteryLevel}%`}
      />
      </tbody>
      </table>
      */}
          </CardContent>
          <Divider />
          <CardContent>
            <ModuleLast24HoursChart />
          </CardContent>
          <Divider />
          <CardActions style={{ flexDirection: "row-reverse" }}>
            <Button size="small" color="primary" onClick={onModuleData}>
              Ver datos
            </Button>
            {/*TODO: This can only be visible for admins:
      <Button size="small" color="primary" onClick={openEdit}>
      Editar
      </Button>
      */}
          </CardActions>
        </Card>
      </Popover>
    </>
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

export default ModuleMarkerPreview;

