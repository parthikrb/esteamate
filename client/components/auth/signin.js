import React, { Fragment, useState, useEffect, useRef } from "react";
import axios from "axios";
import Router from "next/router";

import classes from "./signin.module.css";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [hasError, setHasError] = useState(null);
  const usernameRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (
        (username === usernameRef.current.value && username !== "") ||
        (password === passwordRef.current?.value && password !== "")
      ) {
        await axios
          .post("/api/users/signin", {
            username,
            password,
          })
          .then((res) => {
            setHasError("false");
            if (password !== "") Router.push("/dashboard");
          })
          .catch((err) => {
            setHasError("true");
          });

        console.log(`Sending Request - ${hasError} - ${username}`);
      }
    }, 1300);
    return () => {
      clearTimeout(timer);
    };
  }, [username, usernameRef, password, passwordRef]);

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
          <div className={classes["text-content"]}>
            <h3>Hey! type in your username</h3>
            <input
              ref={usernameRef}
              type="text"
              autoFocus
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {hasError === "false" || password !== "" ? (
              <Fragment>
                <h3>we found your footprint. type in your password</h3>
                <input
                  ref={passwordRef}
                  type="password"
                  value={password}
                  autoComplete="off"
                  autoFocus
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Fragment>
            ) : hasError === "true" && password !== "" ? (
              <h3 className={classes.hasError}>please check password</h3>
            ) : hasError === "true" && username !== "" ? (
              <h3 className={classes.hasError}>
                Sorry, unable to find you. please check username
              </h3>
            ) : null}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SignIn;
