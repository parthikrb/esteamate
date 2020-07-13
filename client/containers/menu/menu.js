import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Drawer,
  CssBaseline,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  Button,
  Typography,
} from "@material-ui/core";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import axios from "axios";
import { useToasts } from "react-toast-notifications";
import { useRouter } from "next/router";
import Link from "next/link";
import capacityRoute from "../../routes/capacity-route";
import adminRoute from "../../routes/admin-route";
import retroRoute from "../../routes/retro-route";
import { plannerRoute, plannerAdminRoute } from "../../routes/planner-route";

const drawerWidth = 220;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  menuButton: {
    flexGrow: 1,
  },
  logoutButton: {
    color: "red",
  },
  brandImage: {
    zIndex: 1,
    display: "flex",
    position: "absolute",
    bottom: "10px",
    left: "17%",
  },
  brandName: {
    textAlign: "center",
    marginTop: "8%",
    color: theme.palette.primary.main,
  },
  active: {
    color: theme.palette.primary.main,
  },
}));

export default function Menu(props) {
  const classes = useStyles();
  const { addToast } = useToasts();
  const router = useRouter();

  const { isAdmin } = props.currentUser || false;

  // const adminMenu = ["User", "Squad", "Release", "Sprint"];
  // const capacityMenu = ["Dashboard", "My Leaves", "Squad Leaves"];
  // const plannerMenu = isAdmin ? ["Poll", "History"] : ["Vote", "History"];
  // const retroMenu = ["Cast", "History"];
  const plannerMenu = isAdmin ? plannerAdminRoute : plannerRoute;

  const [menuList, setMenuList] = useState(plannerMenu);

  const handleAdminMenuClick = () => {
    setMenuList(adminRoute);
  };

  const handlePlannerMenuClick = () => {
    setMenuList(plannerMenu);
  };

  const handleCapacityMenuClick = () => {
    setMenuList(capacityRoute);
  };

  const handleRetroMenuClick = () => {
    setMenuList(retroRoute);
  };

  const handleLogoutAction = async () => {
    await axios.post("/api/users/signout").then(() => {
      router.push("/");
      addToast("User logged out!", {
        appearance: "info",
      });
    });
  };

  const handleRouting = (e, path) => {
    e.preventDefault();
    router.push(path);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className={classes.menuButton}>
            <Button
              color="inherit"
              onClick={() => handlePlannerMenuClick()}
              disableRipple
            >
              Planner
            </Button>
            <Button
              color="inherit"
              onClick={() => handleCapacityMenuClick()}
              disableRipple
            >
              Capacity
            </Button>
            <Button
              color="inherit"
              onClick={() => handleRetroMenuClick()}
              disableRipple
            >
              Retro
            </Button>
            {isAdmin && (
              <Button
                color="inherit"
                onClick={() => handleAdminMenuClick()}
                disableRipple
              >
                Admin
              </Button>
            )}
          </div>
          <IconButton
            aria-label="logout"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            className={classes.logoutButton}
            onClick={() => handleLogoutAction()}
          >
            <PowerSettingsNewIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar}>
          <Typography className={classes.brandName} variant="h6">
            Esteamate
          </Typography>
        </div>
        <Divider />
        <List>
          {menuList.map((menu, index) => (
            <Link
              key={menu.path}
              href={menu.path}
              className={router.pathname === menu.path ? classes.active : ""}
            >
              <ListItem
                button
                key={menu.path}
                // onClick={(e) => handleRouting(e, menu.path)}
              >
                <ListItemIcon>{menu.icon}</ListItemIcon>
                <ListItemText primary={menu.label} />
              </ListItem>
            </Link>
          ))}
        </List>
        <img
          className={classes.brandImage}
          src={"/images/master.png"}
          width="150"
          height="150"
        />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
    </div>
  );
}