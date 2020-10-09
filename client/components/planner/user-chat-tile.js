import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    margin: "2px",
    display: "flex",
    width: "100%",
    height: "6.2vh",
    backgroundColor: "#2a2a72",
    backgroundImage: "linear-gradient(315deg, #2a2a72 0%, #009ffd 74%)",
    borderRadius: "2px",
  },
  fullname: {
    display: "flex",
    fontWeight: "bold",
    float: "left",
    flexGrow: 1,
    marginLeft: "3px",
    marginTop: "4px",
  },
  role: {
    display: "flex",
    position: "absolute",
    marginTop: "3.5vh",
    float: "left",
    marginLeft: "3px",
    color: "#f1f2f6",
    fontSize: "x-small",
  },
  vote: {
    display: "flex",
    float: "right",
    fontSize: "1.6rem",
    color: "wheat",
    marginRight: "5px",
  },
}));

const UserChatTile = ({ user, vote }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.fullname}> {user.fullname}</div>
      {/* <div className={classes.username}>{user.username}</div> */}
      <div className={classes.role}>{user.role}</div>
      <div className={classes.vote}>{vote} </div>
    </div>
  );
};

export default UserChatTile;
