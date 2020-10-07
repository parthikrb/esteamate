import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import StoryPost from "./story-post";
import EstimationChat from "./estimation-chat";
import EstimationChart from "./estimation-chart";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
    width: "100%",
    height: "84vh",
  },
}));

const Poll = () => {
  const classes = useStyles();

  return (
    <GridList spacing={1} className={classes.root}>
      <GridListTile cols={1.5} rows={0.5}>
        <StoryPost />
      </GridListTile>
      <GridListTile cols={1.5} rows={2}>
        <EstimationChat />
      </GridListTile>
      <GridListTile cols={0.5} rows={2.8}>
        <EstimationChart />
      </GridListTile>
    </GridList>
  );
};

export default Poll;
