import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { updateRetro } from "../../store/actions/retro";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  textArea: {
    width: "100%",
  },
  button: {
    float: "right",
    color: "green",
  },
}));

const EditPoint = ({
  shouldOpen,
  shouldCloseView,
  point,
  onUpdate,
  currentUser,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [updatedPoint, setUpdatedPoint] = useState({});

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    shouldCloseView();
  };

  useEffect(() => {
    setOpen(shouldOpen);
  }, [shouldOpen]);

  useEffect(() => {
    const updateSprint = point && { ...point.sprint };
    const _updatePoint = point && { ...point, sprint: updateSprint };
    setUpdatedPoint(_updatePoint);
    console.log(_updatePoint);
  }, [point]);

  const handleValueChange = (event) => {
    const updated = { ...updatedPoint };
    console.log(updated);
    updated.description = event.target.value;
    updated.updated_by = currentUser.id;
    updated.sprint = updatedPoint.sprint.id
      ? updatedPoint.sprint.id
      : updatedPoint.sprint;
    setUpdatedPoint(updated);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    onUpdate(updatedPoint.id, updatedPoint);
    handleClose();
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className={classes.paper}>
          <h2 id="edit-retro-point">Edit Point</h2>
          <TextareaAutosize
            autoFocus
            className={classes.textArea}
            rowsMax={4}
            rowsMin={3}
            aria-label="maximum height"
            placeholder="Maximum 4 rows"
            value={updatedPoint && updatedPoint.description}
            onChange={handleValueChange}
            // defaultValue={updatedPoint.description}
          />
          <Button
            className={classes.button}
            size="small"
            variant="outlined"
            color="primary"
            onClick={handleUpdate}
          >
            Update
          </Button>
        </div>
      </Fade>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.current_user.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onUpdate: (id, data) => dispatch(updateRetro(id, data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPoint);
