import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    width: "13vw",
    height: "37vh",
    backgroundColor: theme.palette.primary.main,
    borderRadius: "25px",
    display: "flex",
    margin: "10px 10px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
      transform: "scale(1.02,1.02)",
      transition: "all 0.5s ease",
    },
  },
  cardSelected: {
    width: "13vw",
    height: "37vh",
    background: "linear-gradient(140deg, #00c9ff 0%, #92fe9d 100%)",
    borderRadius: "25px",
    display: "flex",
    margin: "10px 10px",
    "&:after": {
      cursor: "not-allowed",
    },
  },
  cardValue: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "6rem",
    fontWeight: "bold",
    textAlign: "center",
    color: "#ecf0f1",
    margin: "auto",
  },
  selected: {
    backgroundColor: theme.palette.secondary.main,
  },
}));

const VoteCard = ({ value }) => {
  const classes = useStyles();
  const [clicked, setClicked] = useState(false);

  const handleClick = (event) => {
    event.persist();
    console.log(event);
    setClicked(!clicked ? true : false);
  };
  return (
    <div
      className={clicked ? classes.cardSelected : classes.card}
      onClick={handleClick}
    >
      <div className={classes.cardValue}>{value}</div>
    </div>
  );
};

export default VoteCard;
