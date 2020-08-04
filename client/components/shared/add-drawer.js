import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Drawer } from "@material-ui/core";

const useStyles = makeStyles({
  drawer: {
    width: "60%",
    flexShrink: 0,
  },
  drawerPaper: {
    width: "60%",
    margin: "auto",
  },
});

const AddDrawerComponent = (props) => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    setOpenDrawer(props.shouldOpen);
  }, [props]);

  const closeDrawer = () => {
    setOpenDrawer(false);
    props.shouldClose();
  };

  return (
    <Drawer
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="bottom"
      open={openDrawer}
      onClose={() => closeDrawer()}
    >
      {props.children}
    </Drawer>
  );
};

export default AddDrawerComponent;
