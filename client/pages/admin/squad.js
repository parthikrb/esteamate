import React, { Fragment, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Fab, Drawer } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AddSquadComponent from "../../components/squads/add-squad";

const useStyles = makeStyles({
  root: {
    display: "flex",
    height: "100%",
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

const Squad = ({ users }) => {
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
          <AddSquadComponent users={users} />
        </Drawer>
      </div>
    </Fragment>
  );
};

Squad.getInitialProps = async (context, client) => {
  const userResponse = await client.get("/api/users");
  console.log(`Users - ${JSON.stringify(userResponse.data)}`);

  return { users: userResponse.data };
};

export default Squad;
