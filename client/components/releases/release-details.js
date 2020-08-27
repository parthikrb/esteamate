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
import theme from "../../pages/theme";
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

const ReleaseDetailsComponent = React.memo(({ releaseDetails }) => {
  const classes = useStyles();

  return (
    <Paper style={styleDetailsCard} elevation={3}>
      <Fab variant="extended" size="small" style={styleDetailsActionButton}>
        <DeleteIcon /> Delete
      </Fab>
      <Fab variant="extended" size="small" style={styleDetailsActionButton}>
        <EditIcon /> Edit
      </Fab>
      <Divider />
      <Avatar style={{ ...styleDetailsAvatar, backgroundColor: randomColor() }}>
        <span style={styleDetailsAvatarText}>
          {`${releaseDetails.release_name.charAt(0).toUpperCase()}`}
        </span>
      </Avatar>
      {Object.keys(releaseDetails).map((key) => {
        return (
          key !== "id" &&
          key !== "squad" && (
            <div className={classes.contentRow} key={key}>
              <Tooltip
                title={releaseDetails[key].toString()}
                arrow
                placement="left-start"
              >
                <Typography
                  noWrap
                  variant="h6"
                  color="primary"
                  className={classes.contentTitle}
                >
                  {releaseDetails[key].toString()}
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

export default ReleaseDetailsComponent;
