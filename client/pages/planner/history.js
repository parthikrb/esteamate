import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import StoryPost from "../../components/planner/story-post";
import EstimationChart from "../../components/planner/estimation-chart";
import axios from "axios";
import * as actions from "../../store/actions/current-user";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    height: "84vh",
    justifyContent: "space-around",
  },
  left: {
    height: "inherit",
    width: "75%",
    float: "center",
  },
  "chartjs-render-monitor": {
    width: "90% !important",
  },
}));

const History = ({ currentUser, squads, releases, sprints }) => {
  const classes = useStyles();

  const [squad, setSquad] = useState(squads[0].id);
  const [sprint, setSprint] = useState(undefined);
  const [story, setStory] = useState(undefined);
  const [stories, setStories] = useState([]);

  const [flipped, setFlipped] = useState(false);
  const [estimation, setEstimation] = useState({
    dev_estimation: 0,
    qa_estimation: 0,
    ba_estimation: 0,
  });

  const handleFlip = (value) => {
    console.log(value);
    setFlipped(value);
  };

  const handleSquadSelection = (value) => {
    setSquad(value);
  };

  const handleSprintSelection = (value) => {
    setSprint(value);
  };

  const handleStory = (value) => {
    setStory(value);
  };

  const handleTotal = (value) => {
    const data = {
      dev_estimation: value.dev,
      qa_estimation: value.qa,
      ba_estimation: value.ba,
    };
    setEstimation(data);
  };

  useEffect(() => {
    sprint && fetchCapacity(sprint);
  }, [sprint]);

  const fetchCapacity = async (sprint) => {
    await axios
      .get("/api/estimation/sprint/" + sprint)
      .then((response) => setStories(response.data));
  };

  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <StoryPost
          squads={squads}
          releases={releases}
          sprints={sprints}
          handleSquadSelection={handleSquadSelection}
          handleSprintSelection={handleSprintSelection}
          history={true}
        />
        <EstimationChart estimation={stories} />
      </div>
    </div>
  );
};

History.getInitialProps = async (context, client) => {
  await context.store.dispatch(actions.loadCurrentUser(client));
  await context.store.dispatch(actions.loadCurrentUserSquads(client));
  await context.store.dispatch(actions.loadCurrentUserReleases(client));
  await context.store.dispatch(actions.loadCurrentUserSprints(client));
  const state = await context.store.getState();
  return {
    currentUser: state.current_user.user,
    squads: state.current_user.squads,
    releases: state.current_user.releases,
    sprints: state.current_user.sprints,
  };
};

export default History;
