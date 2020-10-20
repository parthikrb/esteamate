import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Fab,
  Divider,
  Avatar,
  Typography,
  Tooltip,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import {
  styleDetailsCard,
  styleDetailsActionButton,
  styleDetailsAvatar,
  styleDetailsAvatarText,
} from "../../helpers/shared-styles";
import randomColor from "../../helpers/random-color";

const useStyles = makeStyles({
  contentRow: {
    margin: "5px 0px 0px 20px",
  },
  contentTitle: {
    marginBottom: "-7px",
  },
  contentSubtitle: {
    fontSize: ".6rem",
  },
});

const UserDetailsComponent = React.memo(({ userDetails }) => {
  const classes = useStyles();

  return (
    <Paper style={styleDetailsCard} elevation={3}>
      <Fab
        variant="extended"
        size="small"
        style={styleDetailsActionButton}
        // className={[classes.actionButton, classes.deleteButton].join(" ")}
      >
        <DeleteIcon /> Delete
      </Fab>
      <Fab
        variant="extended"
        size="small"
        style={styleDetailsActionButton}
        // className={[classes.actionButton, classes.editButton].join(" ")}
      >
        <EditIcon /> Edit
      </Fab>
      <Divider />
      <Avatar
        // className={classes.avatar}
        style={{ ...styleDetailsAvatar, backgroundColor: randomColor() }}
      >
        <span style={styleDetailsAvatarText}>
          {`${userDetails.firstname
            .charAt(0)
            .toUpperCase()}${userDetails.lastname.charAt(0).toUpperCase()}`}
        </span>
      </Avatar>
      {Object.keys(userDetails).map((key) => {
        return (
          key !== "id" && (
            <div className={classes.contentRow} key={key}>
              <Tooltip
                title={userDetails[key].toString()}
                arrow
                placement="left-start"
              >
                <Typography
                  noWrap
                  variant="h6"
                  color="primary"
                  className={classes.contentTitle}
                >
                  {userDetails[key].toString()}
                </Typography>
              </Tooltip>
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
});

export default UserDetailsComponent;
