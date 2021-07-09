import { Grid, Typography } from "@material-ui/core";
import NotificationItem from "fragments/notifications/NotificationItem";
import { mockNotifications } from "models/Notification";
import { NextPage } from "next";

const Notifications: NextPage = () => {
  const notifications = mockNotifications();
  const quantity = notifications.length;

  return (
    <div>
      <Typography variant="h4">Notificaciones</Typography>
      <Typography variant="subtitle1" color="textSecondary">
        {quantity} en total
      </Typography>

      <br />

      <Grid container spacing={3}>
        {notifications.map((notification) => (
          <Grid item xs={12} key={notification.id}>
            <NotificationItem
              date={notification.date}
              message={notification.message}
              riverId={notification.riverId}
              category={notification.category}
              moduleId={notification.moduleId}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Notifications;
