import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { loadUsers } from "../../store/actions/user";

import { makeStyles } from "@material-ui/core/styles";

import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AddUserComponent from "../../components/users/add-user";
import ListUsersComponent from "../../components/users/list-users";
import UserDetailsComponent from "../../components/users/user-details";
import SearchComponent from "../../components/shared/search";
import { styleRoot, styleAddFAB } from "../../helpers/shared-styles";
import AddDrawerComponent from "../../components/shared/add-drawer";

const useStyles = makeStyles({
  tableContent: {
    display: "inline-block",
  },
});

const User = (props) => {
  const users = props.users;
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

  const closingDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <Fragment>
      <div style={styleRoot}>
        <div
          className={classes.tableContent}
          style={userDetails ? { width: "70%" } : { width: "100%" }}
        >
          <SearchComponent
            filterableColumns={filterableColumns}
            setQueryDetails={fetchQueryDetails}
          />
          <ListUsersComponent
            rows={
              filterColumn
                ? users.filter((user) =>
                    user[filterColumn].toLowerCase().includes(query)
                  )
                : users
            }
            sendRowDetails={fetchUserDetails}
          />
        </div>
        {userDetails && <UserDetailsComponent userDetails={userDetails} />}

        <Fab
          style={styleAddFAB}
          color="primary"
          aria-label="add"
          size="small"
          onClick={() => setOpenDrawer(true)}
        >
          <AddIcon />
        </Fab>

        <AddDrawerComponent shouldOpen={openDrawer} shouldClose={closingDrawer}>
          <AddUserComponent />
        </AddDrawerComponent>
      </div>
    </Fragment>
  );
};

User.getInitialProps = async (context, client) => {
  // const { data } = await client.get("/api/users");
  // console.log(`Users - ${JSON.stringify(data)}`);

  await context.store.dispatch(loadUsers(client));

  return { users: [] };
};

const mapStateToProps = (state) => {
  return {
    user: state.user.users,
    loading: state.users.loading,
  };
};

export default connect(mapStateToProps)(User);
