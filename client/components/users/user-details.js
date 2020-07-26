import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Fab, Divider, Avatar } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import theme from "../../pages/theme";

const useStyles = makeStyles({
  root: {
    width: "27%",
    marginLeft: "25px",
    backgroundColor: "#778899",
  },
  actionButton: {
    width: "42% !important",
    margin: "10px 10px",
  },
  deleteButton: {
    backgroundColor: "red",
  },
  editButton: {
    backgroundColor: theme.palette.secondary.main,
  },
  avatar: {
    width: "120px",
    height: "120px",
    margin: "10px auto auto auto",
  },
  avatarText: {
    fontWeight: "bold",
    fontSize: "50px",
  },
});

const UserDetailsComponent = ({ userDetails }) => {
  const classes = useStyles();

  const randomColor = `#${(((1 << 24) * Math.random()) | 0).toString(16)}`;
  return (
    <Paper className={classes.root} elevation={3}>
      <Fab
        variant="extended"
        size="small"
        className={[classes.actionButton, classes.deleteButton].join(" ")}
      >
        <DeleteIcon /> Delete
      </Fab>
      <Fab
        variant="extended"
        size="small"
        className={[classes.actionButton, classes.editButton].join(" ")}
      >
        <EditIcon /> Edit
      </Fab>
      <Divider />
      <Avatar
        className={classes.avatar}
        style={{ backgroundColor: randomColor }}
      >
        <span className={classes.avatarText}>PB</span>
      </Avatar>
      <p>{userDetails.firstname}</p>
    </Paper>
  );
};

export default UserDetailsComponent;
