import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import DoneIcon from "@material-ui/icons/Done";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles((theme) => ({
  root: {
    transform: "translateZ(0px)",
    transform: "translateY(-8px)",
    flexGrow: 1,
  },

  radioGroup: {
    margin: theme.spacing(1, 0),
  },
  speedDial: {
    position: "absolute",
    color: "red",
    "&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft": {
      right: 0,
    },
    "&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight": {
      left: 0,
    },
  },
}));

const adminActions = [
  { icon: <EditIcon />, name: "Edit", operation: "edit" },
  { icon: <DeleteIcon />, name: "Delete", operation: "delete" },
  { icon: <DoneIcon />, name: "Resolve", operation: "resolve" },
];

const userActions = [
  { icon: <EditIcon />, name: "Edit", operation: "edit" },
  { icon: <DeleteIcon />, name: "Delete", operation: "delete" },
];

const RetroActions = ({ item, currentUser, takeAction }) => {
  const type = item.classification;
  const { id, created_by } = item;
  const classes = useStyles();
  const [direction] = React.useState("left");
  const [open, setOpen] = React.useState(false);

  const handleClick = (event, operation, id) => {
    event.preventDefault();
    setOpen(false);
    if (id) {
      takeAction(operation, id);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div className={classes.root}>
      <SpeedDial
        ariaLabel="SpeedDial example"
        className={classes.speedDial}
        icon={<SpeedDialIcon fontSize="small" />}
        onClose={handleClick}
        onOpen={handleOpen}
        open={open}
        direction={direction}
        FabProps={{ size: "small" }}
      >
        {type === "action" && currentUser && currentUser.isAdmin
          ? adminActions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                id={action.name}
                tooltipTitle={action.name}
                onClick={(e) => handleClick(e, action.operation, id)}
              />
            ))
          : type !== "action" &&
            currentUser &&
            (currentUser.isAdmin || created_by === currentUser.id)
          ? userActions.map((action) => (
              <SpeedDialAction
                key={action.name}
                id={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={(e) => handleClick(e, action.operation, id)}
              />
            ))
          : type === "action" &&
            currentUser &&
            !currentUser.admin &&
            created_by === currentUser.id
          ? userActions.map((action) => (
              <SpeedDialAction
                key={action.name}
                id={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                onClick={(e) => handleClick(e, action.operation, id)}
              />
            ))
          : null}
      </SpeedDial>
    </div>
  );
};

export default RetroActions;
