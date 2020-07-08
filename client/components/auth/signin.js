import React, { Fragment, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Router from "next/router";
import { TextField, Button } from "@material-ui/core";
import { Fingerprint } from "@material-ui/icons";
import { useToasts } from "react-toast-notifications";
import theme from "../../pages/theme";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100vh",
    boxSizing: "border-box",
    margin: 0,
    padding: 0,
    display: 'flex',
  },
  leftBox: {
    marginLeft: 0,
    height: "100%",
    width: "300px",
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    position: 'relative',
    borderRadius: "0 12.5px 12.5px 0",
  },
  rightBox: {
    display: 'flex',
    height: "100%",
    position: 'relative',
    margin: 'auto',
    textAlign: 'center',
  },
  hexImage: {
    display: 'flex',
    position: 'absolute',
    color: 'white',
    marginLeft: "-20px",
    marginTop: "-20px",
    width: 'inherit',
    height: 'auto',
    filter:
      "invert(48%) sepia(13%) saturate(3207%) hue-rotate(130deg) brightness(95%) contrast(80%)",
  },
  title: {
    margin: 'auto',
    color: 'white',
    textAlign: 'center',
    zIndex: 10,
  },
  mainTitle: {
    marginBottom: 0,
  },
  subTitle: {
    marginTop: 0,
  },
  brandImage: {
    zIndex: 1,
    display: 'flex',
    position: 'absolute',
    bottom: "10px",
    left: "25%",
  },
  loginForm: {
    position: 'relative',
    margin: 'auto',
    width: "300px",
    "& > Button": {
      marginTop: "20px",
      width: 'inherit',
    },
  },
});

const SignInComponent = () => {
  const classes = useStyles();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { addToast } = useToasts();

  const loginHandler = async () => {
    await axios
      .post("/api/users/signin", {
        username,
        password,
      })
      .then((response) => {
        Router.push("/");
      })
      .catch((err) => {
        addToast("Invalid Credentials!", { appearance: "error" });
      });
  };

  return (
    <Fragment>
      <div className={classes.root}>
        <div className={classes.leftBox}>
          <img
            className={classes.hexImage}
            src={"/images/hex.png"}
            width="150"
            height="150"
          />
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
          <form className={classes.loginForm} autoComplete="off">
            <div>
              <h2>Welcome</h2>
            </div>
            <TextField
              label="Username"
              type="text"
              value={username}
              autoFocus
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
            />
            <Button
              variant="contained"
              color="primary"
              onClick={() => loginHandler()}
              disabled={!username || !password}
            >
              <Fingerprint />
              Login
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default SignInComponent;
