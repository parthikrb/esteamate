import { Fragment } from "react";
import TextField from "@material-ui/core/TextField";

import classes from "./signin.module.css";

const SignIn = () => {
  return (
    <Fragment>
      <div className={classes.container}>
        <div className={classes.leftBox}>
          <div className={classes.title}>
            <h1 className={classes.mainTitle}>ESTEAMATE</h1>
            <h6 className={classes.subTitle}>
              A collaborative app for AGILE management
            </h6>
          </div>
          <img
            className={classes.brandImage}
            src={"/images/master.png"}
            width="150"
            height="150"
          />
        </div>
        <div className={classes.rightBox}>
          <h3>Your username to access the application please</h3>
          <TextField
            error
            id="username"
            label="Error"
            defaultValue=""
            helperText="Incorrect username"
          />
        </div>
      </div>
    </Fragment>
  );
};

export default SignIn;
