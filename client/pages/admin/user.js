import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Fab, Drawer, Paper } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AddUserComponent from "../../components/users/add-user";
import ListUsersComponent from "../../components/users/list-users";
import UserDetailsComponent from "../../components/users/user-details";
import SearchComponent from "../../components/shared/search";

const useStyles = makeStyles({
  root: {
    display: "flex",
    height: "100%",
    position: "relative",
  },
  fab: {
    position: "absolute",
    bottom: 2,
    right: 4,
  },
  drawer: {
    width: "60%",
    flexShrink: 0,
  },
  drawerPaper: {
    width: "60%",
    margin: "auto",
  },
  userTable: {
    display: "inline-block",
  },
});

const User = ({ users }) => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [userDetails, setUserDetails] = useState(undefined);
  const [filterColumn, setFilterColumn] = useState(undefined);
  const [query, setQuery] = useState(undefined);

  const fetchUserDetails = (details) => {
    console.log(details);
    setUserDetails(details);
  };

  const fetchQueryDetails = (column, query) => {
    setFilterColumn(column);
    setQuery(query);
  };

  const filterableColumns = ["firstname", "lastname", "username"];

  return (
    <Fragment>
      <div className={classes.root}>
        <div
          className={classes.userTable}
          style={userDetails ? { width: "70%" } : { width: "100%" }}
        >
          <SearchComponent
            filterableColumns={filterableColumns}
            setQueryDetails={fetchQueryDetails}
          />
          <ListUsersComponent
            users={
              filterColumn
                ? users.filter((user) =>
                    user[filterColumn].toLowerCase().includes(query)
                  )
                : users
            }
            sendUserDetails={fetchUserDetails}
          />
        </div>
        {userDetails && <UserDetailsComponent userDetails={userDetails} />}

        <Fab
          className={classes.fab}
          color="primary"
          aria-label="add"
          size="small"
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
