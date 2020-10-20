import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { socket } from "../../helpers/build-socket";

import VoteCard from "./vote-card";

const useStyles = makeStyles((theme) => ({
  root: {},
  cards: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  voteInfo: {
    margin: "2px auto",
    textAlign: "center",
    fontSize: "17px",
  },
}));

const Vote = ({ currentUser, squads }) => {
  const classes = useStyles();
  const cardValues = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

  const [story, setStory] = useState("");

  useEffect(() => {
    socket.on("hostMessage", (data) => setStory(data));
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.voteInfo}>
        {!story ? `Awaiting Host` : `You are estimating for Story ${story}`}
      </div>
      <div className={classes.cards}>
        {cardValues.map((value, index) => (
          <VoteCard
            key={index}
            value={value}
            currentUser={currentUser}
            squads={squads}
          />
        ))}
      </div>
    </div>
  );
};

export default Vote;
