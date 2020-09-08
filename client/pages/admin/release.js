import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { loadSquads } from "../../store/actions/squad";
import { loadReleases } from "../../store/actions/release";

import { makeStyles } from "@material-ui/core/styles";

import { Fab } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import AddReleaseComponent from "../../components/releases/add-release";
import SearchComponent from "../../components/shared/search";
import { styleRoot, styleAddFAB } from "../../helpers/shared-styles";
import AddDrawerComponent from "../../components/shared/add-drawer";
import ListReleasesComponent from "../../components/releases/list-releases";
import ReleaseDetailsComponent from "../../components/releases/release-details";

const useStyles = makeStyles({
  tableContent: {
    display: "inline-block",
  },
});

const Release = (props) => {
  const { squads, releases } = props;
  const classes = useStyles();
  const [openDrawer, setOpenDrawer] = useState(false);
  const [releaseDetails, setReleaseDetails] = useState(undefined);
  const [filterColumn, setFilterColumn] = useState(undefined);
  const [query, setQuery] = useState(undefined);

  const fetchReleaseDetails = (details) => {
    setReleaseDetails(details);
  };

  const fetchQueryDetails = (column, query) => {
    setFilterColumn(column);
    setQuery(query);
  };

  const filterableColumns = ["Squad", "Release Name"];

  const closingDrawer = () => {
    setOpenDrawer(false);
  };

  return (
    <Fragment>
      <div style={styleRoot}>
        <div
          className={classes.tableContent}
          style={releaseDetails ? { width: "70%" } : { width: "100%" }}
        >
          <SearchComponent
            filterableColumns={filterableColumns}
            setQueryDetails={fetchQueryDetails}
          />
          <ListReleasesComponent
            rows={
              filterColumn === "Squad" && query.length > 0
                ? releases.filter((release) => {
                    return release.squad.squad_name
                      .toLowerCase()
                      .includes(query);
                  })
                : filterColumn === "Release Name" && query.length > 0
                ? releases.filter((release) => {
                    return release.release_name.toLowerCase().includes(query);
                  })
                : releases
            }
            sendRowDetails={fetchReleaseDetails}
          />
        </div>
        {releaseDetails && (
          <ReleaseDetailsComponent releaseDetails={releaseDetails} />
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
          <AddReleaseComponent squads={squads} />
        </AddDrawerComponent>
      </div>
    </Fragment>
  );
};

Release.getInitialProps = async (context, client) => {
  await context.store.dispatch(loadSquads(client));
  await context.store.dispatch(loadReleases(client));
  return { squads: [], releases: [] };
};

const mapStateToProps = (state) => {
  return {
    squads: state.squad.squads,
    releases: state.release.releases,
    loading: state.release.loading,
  };
};

export default connect(mapStateToProps)(Release);
