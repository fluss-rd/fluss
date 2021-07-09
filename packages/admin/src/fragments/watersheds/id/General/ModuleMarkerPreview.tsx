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
import getWqiColor from "helpers/get-wqi-color";
import useBoolean from "hooks/useBoolean";
import { mockModules } from "models/Module";
import React, { FC } from "react";
import formatDate from "shared/helpers/formatDate";
import { ratingToString } from "shared/models/WqiRating";

import EditModule from "../Modules/EditModule";
import ModuleMarkerPreviewChart from "./ModuleMarkerPreviewChart";

interface ModuleMarkerPreviewProps {
  moduleId: string;
  onClose: () => void;
  anchorEl: HTMLButtonElement;
}

const ModuleMarkerPreview: FC<ModuleMarkerPreviewProps> = (props) => {
  const [editIsOpen, openEdit, closeEdit] = useBoolean();
  const openPopover = Boolean(props.anchorEl);
  const popoverId = openPopover ? "module-mark-popover" : undefined;
  const module = mockModules().find((m) => m.id === props.moduleId);
  const color = getWqiColor(module?.wqi);

  const onEdit = () => {
    props.onClose;
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
          horizontal: "right",
        }}
      >
        <Card>
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
                <Item
                  icon={BatteryFull}
                  title="Nivel de batería"
                  value={`${module.batteryLevel}%`}
                />
              </tbody>
            </table>
          </CardContent>
          <Divider />
          <CardContent>
            <ModuleMarkerPreviewChart />
          </CardContent>
          <CardActions style={{ flexDirection: "row-reverse" }}>
            <Button size="small" color="primary">
              Ver datos
            </Button>
            <Button size="small" color="primary" onClick={openEdit}>
              Editar
            </Button>
          </CardActions>
        </Card>
      </Popover>

      {/*TODO: I think the following line es better placing it in general I placed it here just for the moment*/}
      <EditModule isOpen={editIsOpen} onClose={closeEdit} moduleId={module.id} />
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
