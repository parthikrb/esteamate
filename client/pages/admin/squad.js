import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { loadSquads } from "../../store/actions/squad";
import { loadUsers } from "../../store/actions/user";
import { makeStyles } from "@material-ui/core/styles";

import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AddSquadComponent from "../../components/squads/add-squad";
import SearchComponent from "../../components/shared/search";
import { styleRoot, styleAddFAB } from "../../helpers/shared-styles";
import AddDrawerComponent from "../../components/shared/add-drawer";
import ListSquadsComponent from "../../components/squads/list-squads";
import SquadDetailsComponent from "../../components/squads/squad-details";

const useStyles = makeStyles({
  tableContent: {
    display: "inline-block",
  },
});

const Squad = (props) => {
  const { users, squads } = props;
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [squadDetails, setSquadDetails] = useState(undefined);
  const [filterColumn, setFilterColumn] = useState(undefined);
  const [query, setQuery] = useState(undefined);

  const fetchSquadDetails = (details) => {
    console.log(details);
    setSquadDetails(details);
  };

  const fetchQueryDetails = (column, query) => {
    setFilterColumn(column);
    setQuery(query);
  };

  const filterableColumns = ["squad_name"];

  const closingDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <Fragment>
      <div style={styleRoot}>
        <div
          className={classes.tableContent}
          style={squadDetails ? { width: "70%" } : { width: "100%" }}
        >
          <SearchComponent
            filterableColumns={filterableColumns}
            setQueryDetails={fetchQueryDetails}
          />
          <ListSquadsComponent
            rows={
              filterColumn
                ? squads.filter((squad) => {
                    squad[filterColumn].toLowerCase().includes(query);
                  })
                : squads
            }
            sendRowDetails={fetchSquadDetails}
          />
        </div>
        {squadDetails && <SquadDetailsComponent squadDetails={squadDetails} />}
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
          <AddSquadComponent users={users} />
        </AddDrawerComponent>
      </div>
    </Fragment>
  );
};

Squad.getInitialProps = async (context, client) => {
  await context.store.dispatch(loadUsers(client));
  await context.store.dispatch(loadSquads(client));

  return { users: [], squads: [] };
};

const mapStateToProps = (state) => {
  return {
    users: state.user.users,
    squads: state.squad.squads,
    loading: state.squad.loading,
    error: state.squad.error,
  };
};

export default connect(mapStateToProps)(Squad);
