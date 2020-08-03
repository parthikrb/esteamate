import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AddSquadComponent from "../../components/squads/add-squad";
import SearchComponent from "../../components/shared/search";
import { styleRoot, styleAddFAB } from "../../helpers/shared-styles";
import AddDrawerComponent from "../../components/shared/add-drawer";
import ListSquadsComponent from "../../components/squads/list-squads";

const useStyles = makeStyles({
  tableContent: {
    display: "inline-block",
  },
});

const Squad = ({ users, squads }) => {
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [filterColumn, setFilterColumn] = useState(undefined);
  const [query, setQuery] = useState(undefined);
  const [squadDetails, setSquadDetails] = useState(undefined);

  const fetchSquadDetails = (details) => {
    setSquadDetails(details);
  };

  const fetchQueryDetails = (column, query) => {
    setFilterColumn(column);
    setQuery(query);
  };

  const filterableColumns = ["squadname"];

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
            rows={squads}
            sendRowDetails={fetchSquadDetails}
          />
        </div>
        <Fab
          style={styleAddFAB}
          color="primary"
          aria-label="add"
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
  const userResponse = await client.get("/api/users");
  const squadResponse = await client.get("/api/squads");
  console.log(`Squads - ${JSON.stringify(squadResponse.data)}`);

  return { users: userResponse.data, squads: squadResponse.data };
};

export default Squad;
