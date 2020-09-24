import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import EventBusyIcon from "@material-ui/icons/EventBusy";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

const useStyles = makeStyles(() => ({
  date: {
    margin: 2,
    marginTop: 8,
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
}));

const Duration = (props) => {
  const classes = useStyles();
  const { startDate, endDate } = props;

  return (
    <div className={classes.date}>
      <span className={classes.startDate}>
        <EventAvailableIcon />
        {startDate.slice(0, 10)}
      </span>
      <span className={classes.startDate}>
        <ArrowRightAltIcon />
      </span>
      <span className={classes.endDate}>
        <EventBusyIcon />
        {endDate.slice(0, 10)}
      </span>
    </div>
  );
};

export default Duration;
