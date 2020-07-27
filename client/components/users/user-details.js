import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Fab, Divider, Avatar, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import theme from "../../pages/theme";

const useStyles = makeStyles({
  root: {
    width: "27%",
    marginLeft: "25px",
    backgroundColor: "#EDF5F5",
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
    boxShadow:
      "inset 0 1px 0 rgba(255,255,255,0.5), 0 2px 2px rgba(0, 0, 0, 0.19)",
  },
  avatarText: {
    fontWeight: "bold",
    fontSize: "50px",
  },
  contentRow: {
    margin: "0px 0px 0px 20px",
  },
  contentTitle: {
    marginBottom: "-7px",
  },
  contentSubtitle: {
    fontSize: ".6rem",
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
        <span className={classes.avatarText}>
          {`${userDetails.firstname
            .charAt(0)
            .toUpperCase()}${userDetails.lastname.charAt(0).toUpperCase()}`}
        </span>
      </Avatar>
      {Object.keys(userDetails).map((key) => {
        return (
          key !== "id" && (
            <div className={classes.contentRow}>
              <Typography
                noWrap
                variant="h6"
                color="primary"
                className={classes.contentTitle}
              >
                {userDetails[key].toString()}
              </Typography>
              <Typography
                variant="body2"
                color="secondary"
                className={classes.contentSubtitle}
              >
                {key.toLocaleUpperCase()}
              </Typography>
            </div>
          )
        );
      })}
    </Paper>
  );
};

export default UserDetailsComponent;
