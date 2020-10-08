import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import StoryPost from "./story-post";
import EstimationChat from "./estimation-chat";
import EstimationChart from "./estimation-chart";
import { socket } from "../../helpers/build-socket";

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

const Poll = ({ currentUser, squads, releases, sprints }) => {
  const classes = useStyles();

  useEffect(() => {
    socket.on("userConnected", (username) => {
      console.log(`${username} connected`);
    });

    socket.on("userDisconnected", () => {
      squads.map((squad) => {
        socket.emit("getRoomUsers", squad.id);
      });
    });

    return () => socket.disconnect(currentUser.fullname);
  }, []);

  return (
    <GridList spacing={1} className={classes.root}>
      <GridListTile cols={1.5} rows={0.5}>
        <StoryPost squads={squads} releases={releases} sprints={sprints} />
      </GridListTile>
      <GridListTile cols={1.5} rows={2}>
        <EstimationChat currentUser={currentUser} squads={squads} />
      </GridListTile>
      <GridListTile cols={0.5} rows={2.8}>
        <EstimationChart />
      </GridListTile>
    </GridList>
  );
};

export default Poll;
