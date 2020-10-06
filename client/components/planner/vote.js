import React from "react";
import { makeStyles } from "@material-ui/core/styles";
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

const Vote = () => {
  const classes = useStyles();
  const cardValues = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

  return (
    <div className={classes.root}>
      <div className={classes.voteInfo}>
        You are casting your vote for Story
      </div>
      <div className={classes.cards}>
        {cardValues.map((value, index) => (
          <VoteCard
            key={index}
            value={value}
          />
        ))}
      </div>
    </div>
  );
};

export default Vote;
