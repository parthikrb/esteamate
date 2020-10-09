import React, { useState, useEffect } from "react";
import { socket } from "../../helpers/build-socket";
import UserChatTile from "./user-chat-tile";

const EstimationChat = ({ currentUser, squad }) => {
  const [users, setUsers] = useState(undefined);

  useEffect(() => {
    socket.on("roomData", (data) => {
      let _users = [];
      console.log(data);
      data.map((users) => _users.push(users.user));
      setUsers(_users);
    });

    socket.on("message", (message) => {
      console.log(message);
    });
  }, []);

  return (
    <div>
      {users &&
        users.map((user, index) => {
          return (
            !user.isAdmin && <UserChatTile key={index} user={user} vote="0" />
          );
        })}
    </div>
  );
};

export default EstimationChat;
