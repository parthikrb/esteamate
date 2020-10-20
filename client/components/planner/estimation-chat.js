import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { socket } from "../../helpers/build-socket";
import UserChatTile from "./user-chat-tile";
import CheckIcon from "@material-ui/icons/Check";

const useStyles = makeStyles(() => ({
  grandTotal: {
    width: "100%",
    height: "6.8vh",
    backgroundColor: "#abe9cd",
    backgroundImage: "linear-gradient(315deg, #abe9cd 0%, #3eadcf 74%)",
    borderRadius: "2px",
    margin: "2px",
  },
  total: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "bold",
    margin: "auto 10px auto 10px",
  },
  description: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "x-small",
    margin: "auto 10px 0px 10px",
  },
}));

const EstimationChat = ({ currentUser, squad, flipped, handleTotal }) => {
  const classes = useStyles();

  const [users, setUsers] = useState(undefined);
  const [devTotal, setDevTotal] = useState(0);
  const [qaTotal, setQaTotal] = useState(0);
  const [baTotal, setBaTotal] = useState(0);

  useEffect(() => {
    socket.on("roomData", (data) => {
      let _users = [];
      console.log(data);
      data.map((users) => _users.push(users.user));
      setUsers(_users);
    });
  }, []);

  useEffect(() => {
    let dev = 0;
    let devCount = 0;
    let qa = 0;
    let qaCount = 0;
    let ba = 0;
    let baCount = 0;
    console.log(users);
    users &&
      users.map((user) => {
        if (!user.isAdmin) {
          switch (user.role) {
            case "Developer":
              dev += user.vote;
              devCount++;
              break;
            case "Quality Analyst":
              qa += user.vote;
              qaCount++;
              break;
            case "Business Analyst":
              ba += user.vote;
              baCount++;
              break;
          }
        }
      });

    setDevTotal(Math.ceil(dev / devCount) || 0);
    setQaTotal(Math.ceil(qa / qaCount) || 0);
    setBaTotal(Math.ceil(ba / baCount) || 0);
  }, [users]);

  useEffect(() => {
    const data = {
      dev: devTotal,
      qa: qaTotal,
      ba: baTotal,
    };
    handleTotal(data);
  }, [flipped]);

  return (
    <div>
      <div className={classes.grandTotal}>
        <div className={classes.total}>
          <span>{flipped ? devTotal : "?"}</span>
          <span>{flipped ? qaTotal : "?"}</span>
          <span>{flipped ? baTotal : "?"}</span>
        </div>
        <div className={classes.description}>
          <span>Dev</span>
          <span>QA</span>
          <span>BA</span>
        </div>
      </div>
      {users &&
        users.map((user, index) => {
          return (
            !user.isAdmin && (
              <UserChatTile
                key={index}
                user={user}
                vote={
                  !flipped && user.voted ? (
                    <CheckIcon />
                  ) : !flipped && !user.voted ? (
                    "?"
                  ) : (
                    user.vote
                  )
                }
              />
            )
          );
        })}
    </div>
  );
};

export default EstimationChat;
