import { Typography, CardContent, Card, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddWatershed from "fragments/watersheds/common/AddWatershed";
import WatershedCard from "fragments/watersheds/WatershedCard";
import { NextPage } from "next";
import { mockWatersheds } from "shared/models/Watershed";
import Watershed from "shared/models/Watershed";
import { useLayoutContext } from "layouts/Layout/LayoutContext";
import WatershedDetail from "fragments/watersheds/WatershedDetail";
import useBoolean from "shared/hooks/useBoolean";
import EditWatershed from "fragments/watersheds/common/EditWatershed";
import { useState } from "react";

interface HydricResourcesProps {
  quantity: number;
  watersheds: Watershed[];
}

const Watersheds: NextPage<HydricResourcesProps> = ({ quantity, watersheds }) => {
  const classes = useStyles();
  const context = useLayoutContext();
  const [selectedDetail, setSelectedDetail] = useState("");
  const [selected, setSelected] = useState("");

  const closeEditWatershed = () => {
    setSelected("");
  };

  const closeDetail = () => {
    setSelectedDetail("");
  };

  return (
    <>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ padding: context.values.pagePadding, flex: 1, position: "relative" }}>
          <Typography variant="h4">Cuerpos hídricos</Typography>

          <Typography variant="subtitle1" color="textSecondary" className={classes.subtitle}>
            {quantity} en total
          </Typography>

          <br />
          <div className={classes.watershedCards}>
            {watersheds.map((watershed) => (
              <WatershedCard
                key={watershed.id}
                id={watershed.id}
                name={watershed.name}
                wqiValue={watershed.wqi.value}
                lastUpdate={new Date(watershed.updateDate)}
                modulesQuantity={watershed.modulesQuantity}
                location={watershed.location}
                onViewMore={(id) => setSelectedDetail(id)}
              />
            ))}
          </div>
          <AddWatershed />
        </div>

        <WatershedDetail isOpen={!!selectedDetail} close={closeDetail} />
        <EditWatershed isOpen={!!selected} watershedId={selected} close={closeEditWatershed} />
      </div>
    </>
  );
};

Watersheds.getInitialProps = async ({ req }) => {
  const watersheds = [mockWatersheds()[0]];

  return { quantity: watersheds.length, watersheds };
};

const useStyles = makeStyles((theme) => ({
  subtitle: {
    paddingLeft: theme.spacing(0.5),
  },
  watershedCards: {
    "& > *:not(:last-child)": {
      marginBottom: theme.spacing(2),
    },
  },
}));

export default Watersheds;

