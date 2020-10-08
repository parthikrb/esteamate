import React, { useState, useEffect } from "react";
import { socket } from "../../helpers/build-socket";

const EstimationChat = ({ currentUser, squads }) => {
  const [users, setUsers] = useState(undefined);

  useEffect(() => {
    console.log(`object`)
    squads.map((squad) => {
      socket.emit("getRoomUsers", squad.id);
    });

    socket.on("roomUsers", (roomUsers) => {
      console.log(`Room Users ${JSON.stringify(roomUsers)}`);
      setUsers(roomUsers);
    });
  }, []);

  return (
    <div>
      Estimation Chat - {users && users.map((user) => <p>{user.id}</p>)}
    </div>
  );
};

export default EstimationChat;
