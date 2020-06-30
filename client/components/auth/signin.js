import React, { Fragment, useState } from "react";
import axios from "axios";
import Router from "next/router";
import { TextField, Button } from "@material-ui/core";
import { Fingerprint } from "@material-ui/icons";
import classes from "./signin.module.css";
import { toast } from "react-toastify";

const SignInComponent = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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
        toast.error("Invalid Credentials!");
      });
  };

  return (
    <Fragment>
      <div className={classes.container}>
        <div className={classes["left-box"]}>
          <img
            className={classes["hex-image"]}
            src={"/images/hex.png"}
            width="150"
            height="150"
          />
          <div className={classes.title}>
            <h1 className={classes["main-title"]}>ESTEAMATE</h1>
            <h6 className={classes["sub-title"]}>
              A collaborative app for AGILE management
            </h6>
          </div>
          <img
            className={classes["brand-image"]}
            src={"/images/master.png"}
            width="150"
            height="150"
          />
        </div>
        <div className={classes["right-box"]}>
          <form className={classes["login-form"]} autoComplete="off">
            <div className={classes["login-title"]}>
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
              autoFocus
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
