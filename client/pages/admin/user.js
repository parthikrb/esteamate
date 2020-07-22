import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Fab, Drawer } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AddUserComponent from "../../components/users/add-user";

const useStyles = makeStyles({
  root: {
    display: "flex",
    height: "81vh",
    position: "relative",
  },
  fab: {
    position: "absolute",
    bottom: 5,
    right: 5,
  },
  drawer: {
    width: "60%",
    flexShrink: 0,
  },
  drawerPaper: {
    width: "60%",
    margin: "auto",
  },
});

const User = ({ users }) => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <Fragment>
      <div className={classes.root}>
        <div className={classes.content}>
          {users.map((user) => (
            <h3 key={user.username}>{user.firstname}</h3>
          ))}
        </div>
        <Fab
          className={classes.fab}
          color="primary"
          aria-label="add"
          onClick={() => setOpenDrawer(true)}
        >
          <AddIcon />
        </Fab>
        <Drawer
          className={classes.drawer}
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="bottom"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
        >
          <AddUserComponent />
        </Drawer>
      </div>
    </Fragment>
  );
};

User.getInitialProps = async (context, client) => {
  const { data } = await client.get("/api/users");
  console.log(`Users - ${JSON.stringify(data)}`);

  return { users: data };
};

export default User;
