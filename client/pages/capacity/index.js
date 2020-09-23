import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import * as actions from "../../store/actions/current-user";
import { isAfter } from "date-fns";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import EventBusyIcon from "@material-ui/icons/EventBusy";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

const AntTabs = withStyles({
  root: {
    borderBottom: "1px solid #e8e8e8",
  },
  indicator: {
    backgroundColor: "#1890ff",
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
    },
    "&$selected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&:focus": {
      color: "#40a9ff",
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  tab: {
    backgroundColor: theme.palette.background.paper,
  },
  date: {
    margin: 2,
    width: "100%",
    padding: 2,
    display: "flex",
    justifyContent: "center",
  },
  startDate: {
    color: "#2ed573",
    display: "flex",
    alignItems: "center",
    marginRight: 10,
  },
  endDate: {
    color: "#ff6348",
    display: "flex",
    alignItems: "center",
  },
  sprints: {
    display: "flex",
    width: "100%",
    height: "69vh",
    justifyContent: "space-around",
  },
  sprint: {
    display: "flex",
    width: "32%",
    height: "100%",
    borderRadius: "20px",
    overflow: "hidden",
  },
  sprintName: {
    display: "flex",
    top: 0,
    padding: 3,
    height: "7vh",
    backgroundColor: "yellow",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    fontSize: "large",
    fontWeight: "bold",
    minHeight: "20px",
  },
}));

const Dashboard = (props) => {
  const { currentUserDetails } = props;
  const { currentUser, squads, releases, sprints } = currentUserDetails;
  const [currentReleases, setCurrentReleases] = useState([]);
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log(releases);
    console.log(sprints);
    const tempRelease = releases.filter((release) =>
      isAfter(new Date(release.end_date), new Date())
    );
    setCurrentReleases(tempRelease);
  }, [props]);

  return (
    <div className={classes.root}>
      <div className={classes.tab}>
        <AntTabs value={value} onChange={handleChange} aria-label="release tab">
          {currentReleases.map((release) => {
            return <AntTab key={release.id} label={release.release_name} />;
          })}
        </AntTabs>
        <div className={classes.date}>
          <span className={classes.startDate}>
            <EventAvailableIcon />
            {currentReleases[value].start_date.slice(0, 10)}
          </span>
          <span className={classes.startDate}>
            <ArrowRightAltIcon />
          </span>
          <span className={classes.endDate}>
            <EventBusyIcon />
            {currentReleases[value].end_date.slice(0, 10)}
          </span>
        </div>
        <div className={classes.sprints}>
          {sprints
            .filter((sprint) => sprint.release === currentReleases[value].id)
            .map((spr) => {
              return (
                <div className={classes.sprint}>
                  <div className={classes.sprintName}>{spr.sprint_name}</div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

Dashboard.getInitialProps = async (context, client) => {
  await context.store.dispatch(actions.loadCurrentUser(client));
  await context.store.dispatch(actions.loadCurrentUserSquads(client));
  await context.store.dispatch(actions.loadCurrentUserReleases(client));
  await context.store.dispatch(actions.loadCurrentUserSprints(client));
  const state = await context.store.getState();

  return { currentUserDetails: state.current_user };
};

export default Dashboard;
