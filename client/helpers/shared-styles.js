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

export {
  styleRoot,
  styleSearchControls,
  styleAddControls,
  styleAppBar,
  styleAppBarTitle,
  styleCancelButton,
  styleAddFAB,
};
