import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import AddWatershed from "fragments/watersheds/AddWatershed";
import EditWatershed from "fragments/watersheds/EditWatershed";
import WatershedCard from "fragments/watersheds/WatershedCard";
import WatershedDetail, { detailWidth } from "fragments/watersheds/WatershedDetail";
import { useLayoutContext } from "layouts/Layout/LayoutContext";
import { NextPage } from "next";
import { useMergeState } from "shared/hooks";
import { useGetWatersheds } from "shared/services/watersheds/hooks";

const Watersheds: NextPage = () => {
  const classes = useStyles();
  const context = useLayoutContext();
  const watershedsQuery = useGetWatersheds();
  const watersheds = watershedsQuery.data || [];
  const quantity = watersheds.length;
  const [state, setState] = useMergeState({ detail: "", edition: "" });

  const onEditWatershed = (watershedId: string) => {
    setState({ edition: watershedId });
  };

  const closeWatershedEdition = () => {
    setState({ edition: "" });
  };

  const onViewWatershedDetail = (watershedId: string) => {
    setState({ detail: watershedId });
    context.values.collapseSideBar();
  };

  const closeWatershedDetail = () => {
    setState({ detail: "" });
    context.values.expandSidebar();
  };

  return (
    <>
      <div style={{ display: "flex", height: "100%" }}>
        <div style={{ flex: 1 }}>
          <Typography variant="h4">Cuerpos hídricos</Typography>

          <Typography variant="subtitle1" color="textSecondary" className={classes.subtitle}>
            {quantity} en total
          </Typography>

          <br />
          <div className={classes.watershedCards}>
            {watersheds.map((watershed) => {
              return (
                <WatershedCard
                  key={watershed.id}
                  id={watershed.id}
                  name={watershed.name}
                  wqiValue={watershed.wqi.value}
                  lastUpdate={new Date(watershed.updateDate)}
                  modulesQuantity={watershed.modulesQuantity}
                  location={watershed.area}
                  onViewMore={onViewWatershedDetail}
                  onEdit={onEditWatershed}
                />
              );
            })}
          </div>
        </div>
        <div style={{ width: state.detail ? detailWidth : 0, height: "100vh", color: "red" }} />
        <AddWatershed marginRight={detailWidth} detailIsOpen={!!state.detail} />

        <EditWatershed
          isOpen={!!state.edition}
          watershedId={state.edition}
          close={closeWatershedEdition}
        />
      </div>
      <WatershedDetail
        riverId={state.detail}
        isOpen={!!state.detail}
        close={closeWatershedDetail}
      />
    </>
  );
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
