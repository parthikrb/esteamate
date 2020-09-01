import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import SearchComponent from "../../components/shared/search";
import { styleRoot, styleAddFAB } from "../../helpers/shared-styles";
import AddDrawerComponent from "../../components/shared/add-drawer";
import AddSprintComponent from "../../components/sprints/add-sprint";
import ListSprintsComponent from "../../components/sprints/list-sprints";
import SprintDetailsComponent from "../../components/sprints/sprint-details";

const useStyles = makeStyles({
  tableContent: {
    display: "inline-block",
  },
});

const Sprint = ({ releases, sprints }) => {
  console.log(`Test - ${releases}`);
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [sprintDetails, setSprintDetails] = useState(undefined);
  const [filterColumn, setFilterColumn] = useState(undefined);
  const [query, setQuery] = useState(undefined);

  const fetchSprintDetails = (details) => {
    setSprintDetails(details);
  };

  const fetchQueryDetails = (column, query) => {
    setFilterColumn(column);
    setQuery(query);
  };

  const filterableColumns = ["Release", "Sprint Name"];

  const closingDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <Fragment>
      <div style={styleRoot}>
        <div
          className={classes.tableContent}
          style={sprintDetails ? { width: "70%" } : { width: "100%" }}
        >
          <SearchComponent
            filterableColumns={filterableColumns}
            setQueryDetails={fetchQueryDetails}
          />
          <ListSprintsComponent
            rows={
              filterColumn === "Release" && query.length > 0
                ? sprints.filter((sprint) => {
                    return sprint.release.release_name
                      .toLowerCase()
                      .includes(query);
                  })
                : filterColumn === "Sprint Name" && query.length > 0
                ? sprints.filter((sprint) => {
                    return sprint.sprint_name.toLowerCase().includes(query);
                  })
                : sprints
            }
            sendRowDetails={fetchSprintDetails}
          />
        </div>
        {sprintDetails && (
          <SprintDetailsComponent sprintDetails={sprintDetails} />
        )}
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
          <AddSprintComponent releases={releases} />
        </AddDrawerComponent>
      </div>
    </Fragment>
  );
};

Sprint.getInitialProps = async (context, client) => {
  const releaseResponse = await client.get("/api/releases");
  const sprintResponse = await client.get("/api/sprints");
  console.log("Server");
  return { releases: releaseResponse.data, sprints: sprintResponse.data };
};

export default Sprint;
