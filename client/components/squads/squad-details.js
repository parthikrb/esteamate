import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  Fab,
  Divider,
  Avatar,
  Typography,
  Chip,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import {
  styleDetailsCard,
  styleDetailsActionButton,
  styleDetailsAvatar,
  styleDetailsAvatarText,
} from "../../helpers/shared-styles";

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
  chip: {
    marginRight: 2,
  },
});

const SquadDetailsComponent = React.memo(({ squadDetails }) => {
  const classes = useStyles();

  const randomColor = `#${(((1 << 24) * Math.random()) | 0).toString(16)}`;

  return (
    <Paper style={styleDetailsCard} elevation={3}>
      <Fab variant="extended" size="small" style={styleDetailsActionButton}>
        <DeleteIcon /> Delete
      </Fab>
      <Fab variant="extended" size="small" style={styleDetailsActionButton}>
        <EditIcon /> Edit
      </Fab>
      <Divider />
      <Avatar
        // className={classes.avatar}
        style={{ ...styleDetailsAvatar, backgroundColor: randomColor }}
      >
        <span style={styleDetailsAvatarText}>
          {`${squadDetails.squad_name.charAt(0).toUpperCase()}`}
        </span>
      </Avatar>
      {Object.keys(squadDetails).map((key) => {
        return (
          key === "scrum_team" && (
            <div className={classes.contentRow} key={key}>
              <Typography
                variant="body2"
                color="secondary"
                className={classes.contentSubtitle}
              >
                {key.toLocaleUpperCase()}
              </Typography>
              <Typography
                noWrap
                variant="h6"
                color="primary"
                className={classes.contentTitle}
              >
                {typeof squadDetails[key] === "string"
                  ? squadDetails[key].toString()
                  : squadDetails[key].map((v) => {
                      return (
                        <Chip
                          className={classes.chip}
                          variant="outlined"
                          size="small"
                          key={v.id}
                          avatar={
                            <Avatar>
                              {`${v.firstname.charAt(0).toUpperCase()}`}
                            </Avatar>
                          }
                          label={`${v.firstname} ${v.lastname}`}
                          color="primary"
                        />
                      );
                    })}
              </Typography>
            </div>
          )
        );
      })}
    </Paper>
  );
});

export default SquadDetailsComponent;
