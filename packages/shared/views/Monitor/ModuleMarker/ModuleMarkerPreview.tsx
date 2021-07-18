import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Popover,
  Typography,
} from "@material-ui/core";
import React, { FC, memo } from "react";
import { ratingToText, ratingToColor } from "shared/models/WqiRating";

import ModuleLast24HoursChart from "../../../components/ModuleLast24HoursChart";
import { useGetModuleInfoById, useGetModuleDetailsById } from "../../../services/modules/hooks";
import Module, { fromModuleResponse } from "../../../models/Module";

interface ModuleMarkerPreviewProps {
  moduleId: string;
  onModuleData?: (moduleId: string) => void;
  onClose: () => void;
  anchorEl: HTMLButtonElement;
  open?: boolean;
}

const ModuleMarkerPreview: FC<ModuleMarkerPreviewProps> = (props) => {
  const infoQuery = useGetModuleInfoById(props.moduleId);
  const detailsQuery = useGetModuleDetailsById(props.moduleId);
  const infoData = infoQuery?.data?.data;
  const detailsData = detailsQuery?.data?.data;
  const module = infoData && detailsQuery && fromModuleResponse(infoData, detailsData);

  const color = ratingToColor(module?.wqi?.rating);
  const openPopover = props.open;
  const popoverId = openPopover ? "module-mark-popover" : undefined;

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
        {props.moduleId && module && (
          <Card onMouseLeave={props.onClose}>
            <CardContent>
              <Typography variant="caption" style={{ fontWeight: "bold" }}>
                {/*TODO: Only for admins: {module.id}*/} {/*TODO: Only for admins: —*/}{" "}
                {module?.alias}
              </Typography>
              <Typography variant="h6" style={{ color }}>
                WQI {module?.wqi?.value} - {ratingToText(module?.wqi?.rating)}
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
              <Typography variant="body1" style={{ fontWeight: "bold" }}>
                Últimas 48 horas
              </Typography>
              <br />

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
        )}
      </Popover>
    </>
  );
};

export default memo(ModuleMarkerPreview, (prev, next) => prev.open === next.open);

