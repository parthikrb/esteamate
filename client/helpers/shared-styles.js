import theme from "../pages/theme";

const styleRoot = {
  display: "flex",
  height: "100%",
  position: "relative",
};

const styleSearchControls = {
  margin: "10px",
  width: "47%",
};

const styleAddControls = {
  margin: "5px 10px",
  width: "-webkit-fill-available",
};

const styleAppBar = {
  backgroundColor: theme.palette.primary.main,
};

const styleAppBarTitle = {
  flexGrow: 1,
};

const styleCancelButton = {
  color: theme.palette.error.main,
  marginRight: "20px",
};

const styleAddFAB = {
  position: "absolute",
  bottom: 2,
  right: 4,
};

const styleDetailsCard = {
  width: "27%",
  marginLeft: "25px",
  backgroundColor: "#EDF5F5",
};

const styleDetailsActionButton = {
  width: "42% !important",
  margin: "10px 10px",
};

const styleDetailsAvatar = {
  width: "120px",
  height: "120px",
  margin: "10px auto auto auto",
  boxShadow:
    "inset 0 1px 0 rgba(255,255,255,0.5), 0 2px 2px rgba(0, 0, 0, 0.19)",
};

const styleDetailsAvatarText = {
  fontWeight: "bold",
  fontSize: "3rem",
};

export {
  styleRoot,
  styleSearchControls,
  styleAddControls,
  styleAppBar,
  styleAppBarTitle,
  styleCancelButton,
  styleAddFAB,
  styleDetailsCard,
  styleDetailsActionButton,
  styleDetailsAvatar,
  styleDetailsAvatarText,
};
