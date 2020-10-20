import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import StoryPost from "./story-post";
import EstimationChat from "./estimation-chat";
import EstimationChart from "./estimation-chart";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    height: "84vh",
  },
  left: {
    height: "inherit",
    width: "70%",
    float: "left",
  },
  right: {
    height: "inherit",
    width: "30%",
    float: "right",
  },
}));

const Poll = ({ currentUser, squads, releases, sprints }) => {
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

  const onSave = async () => {
    console.log(`Save - ${sprint} - ${story}`);
    const data = {
      sprint,
      story,
      ...estimation,
    };
    await axios.post("/api/estimation", data);
    fetchCapacity(sprint);
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
          handleStory={handleStory}
          switchFlip={handleFlip}
          onSave={onSave}
        />
        <EstimationChart estimation={stories} />
      </div>
      <div className={classes.right}>
        <EstimationChat
          currentUser={currentUser}
          squad={squad}
          flipped={flipped}
          handleTotal={handleTotal}
        />
      </div>
    </div>
  );
};

export default Poll;
