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
  },
  total: {
    // marginLeft: "15px",
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "bold",
    margin: "auto 10px auto 10px",
  },
  description: {
    // marginLeft: "20px",
    display: "flex",
    justifyContent: "space-between",
    fontSize: "x-small",
    margin: "auto 10px 0px 13px",
  },
}));

const EstimationChat = ({ currentUser, squad, flipped }) => {
  const classes = useStyles();

  const [users, setUsers] = useState(undefined);
  // const [flip, setFlip] = useState(false);

  useEffect(() => {
    socket.on("roomData", (data) => {
      let _users = [];
      console.log(data);
      data.map((users) => _users.push(users.user));
      setUsers(_users);
    });
  }, []);

  return (
    <div>
      <div className={classes.grandTotal}>
        <div className={classes.total}>
          <span>200</span>
          <span>120</span>
          <span>0</span>
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
