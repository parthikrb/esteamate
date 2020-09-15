import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import {
  loadCurrentUser,
  clearCurrentUser,
} from "../../store/actions/current-user";
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

const Menu = (props) => {
  console.log(props);
  const classes = useStyles();
  const { addToast } = useToasts();
  const router = useRouter();

  const { isAdmin } = props.currentUser || false;

  const plannerMenu = !isAdmin ? plannerAdminRoute : plannerRoute;

  const [menuList, setMenuList] = useState(plannerMenu);

  useEffect(() => {
    const path = router.pathname;
    if (path.includes("/admin")) {
      handleAdminMenuClick();
    } else if (path.includes("/retro")) {
      handleRetroMenuClick();
    } else if (path.includes("/capacity")) {
      handleCapacityMenuClick();
    } else {
      handlePlannerMenuClick();
    }
  }, []);

  const handleAdminMenuClick = () => {
    setMenuList(adminRoute);
    router.push("/admin");
  };

  const handlePlannerMenuClick = () => {
    setMenuList(plannerMenu);
    router.push("/planner");
  };

  const handleCapacityMenuClick = () => {
    setMenuList(capacityRoute);
    router.push("/capacity");
  };

  const handleRetroMenuClick = () => {
    setMenuList(retroRoute);
    router.push("/retro");
  };

  const handleLogoutAction = async () => {
    await axios.post("/api/users/signout").then(() => {
      router.push("/");
      props.onLogout();
      addToast("User logged out!", {
        appearance: "info",
      });
    });
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <div className={classes.menuButton}>
            <Button
              color="inherit"
              style={{
                textDecoration: router.pathname.includes("/planner")
                  ? "underline"
                  : "none",
              }}
              onClick={() => handlePlannerMenuClick()}
              disableRipple
            >
              Planner
            </Button>
            <Button
              color="inherit"
              style={{
                textDecoration: router.pathname.includes("/capacity")
                  ? "underline"
                  : "none",
              }}
              onClick={() => handleCapacityMenuClick()}
              disableRipple
            >
              Capacity
            </Button>
            <Button
              color="inherit"
              style={{
                textDecoration: router.pathname.includes("/retro")
                  ? "underline"
                  : "none",
              }}
              onClick={() => handleRetroMenuClick()}
              disableRipple
            >
              Retro
            </Button>
            {isAdmin && (
              <Button
                color="inherit"
                style={{
                  textDecoration: router.pathname.includes("/admin")
                    ? "underline"
                    : "none",
                }}
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
            <Link key={menu.path} href={menu.path}>
              <ListItem
                button
                key={menu.path}
                style={{
                  borderRight:
                    router.pathname === menu.path
                      ? "10px solid #33135c"
                      : "inherit",
                }}
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
};

Menu.getInitialProps = async (context, client) => {
  await context.store.dispatch(loadCurrentUser(client));
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(clearCurrentUser()),
  };
};

export default connect(null, mapDispatchToProps)(Menu);
