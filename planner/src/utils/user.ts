interface Users {
  id: String;
  username: String;
  room: String;
}

let users: Users[] = [];

const addUser = (id: String, username: String, room: String) => {
  users.push({ id, username, room });
  return users;
};

const removeUser = (id: String) => {
  const userIndex = users.findIndex((user) => user.id === id);
  return users.splice(userIndex, 1);
};

const getRoomUsers = (room: String) => {
  return users.filter((user) => user.room === room);
};

export { addUser, removeUser, getRoomUsers };
