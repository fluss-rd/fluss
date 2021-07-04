import {
  Button,
  Divider,
  ListItem,
  ListItemText,
  Popover,
  Theme,
  ThemeProvider,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AccountCircle, ArrowDropDown } from "@material-ui/icons";
import useLayoutContext from "hooks/useLayoutContext";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { useLogOut } from "services/auth/hooks";
import theme from "shared/styles/theme";

interface FlussDrawerFooterProps {
  drawerIsOpen: boolean;
  openAccount: () => void;
}

const FlussDrawerFooter: FC<FlussDrawerFooterProps> = (props) => {
  const { drawerIsOpen: open, openAccount } = props;
  const logout = useLogOut();
  const context = useLayoutContext();
  const drawerWidth = context.values.drawerWidth;
  const classes = useStyles({ drawerWidth, open });
  const router = useRouter();

  // popover
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const openUserMenu = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const closeUserMenu = () => setAnchorEl(null);

  const openPopover = Boolean(anchorEl);
  const popoverId = openPopover ? "user-menu-popover" : undefined;

  const goTo = (path: string) => {
    return () => router.push(path);
  };

  return (
    <div className={classes.drawerFooter}>
      {open && (
        <Typography variant="body1" style={{ flex: 1, alignSelf: "center" }}>
          Mikhael Santos
        </Typography>
      )}
      <Button size="small" className={classes.options} onClick={openUserMenu}>
        <AccountCircle />
        <ArrowDropDown />
      </Button>
      <ThemeProvider theme={theme}>
        <Popover
          id={popoverId}
          open={openPopover}
          anchorEl={anchorEl}
          onClose={closeUserMenu}
          anchorOrigin={{
            vertical: "center",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <div className={classes.popoverContent}>
            <Typography variant="body1">
              <strong>Opciones</strong>
            </Typography>
          </div>
          <Divider />
          <ListItem
            button
            onClick={() => {
              openAccount();
              closeUserMenu();
            }}
          >
            <ListItemText primary="Ver perfil" />
          </ListItem>
          <ListItem button onClick={() => logout.mutate()}>
            <ListItemText primary="Cerrar sesión" />
          </ListItem>
        </Popover>
      </ThemeProvider>
    </div>
  );
};

const useStyles = makeStyles<Theme, { drawerWidth: number; open: boolean }>({
  drawer: {
    width: ({ drawerWidth }) => drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerBody: {
    flex: 1,
  },
  drawerFooter: ({ open }) => ({
    paddingTop: theme.spacing(1.5),
    paddingLeft: open ? theme.spacing(2) : 0,
    paddingRight: open ? theme.spacing(1) : 0,
    paddingBottom: theme.spacing(1.5),
    display: "flex",
    justifyContent: "center",
  }),
  popoverContent: {
    padding: theme.spacing(2),
  },
  options: {
    "&:hover": {
      background: "none",
    },
  },
});

export default FlussDrawerFooter;
