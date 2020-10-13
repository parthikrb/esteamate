interface User {
  id: string;
  username: string;
  fullname: string;
  email: string;
  isAdmin: boolean;
  role: string;
  voted: boolean;
  vote?: number;
  iat?: number;
}

interface Users {
  id: string;
  user: User;
  room: string;
}

let users: Users[] = [];

const addUser = (id: string, user: User, room: string) => {
  user.voted = false;
  user.vote = 0;
  const username = user.username.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find(
    (u) => u.room === room && u.user.username === username
  );

  if (existingUser) return { error: "Username is taken." };

  const newUser = { id, user, room };

  users.push(newUser);

  return { newUser };
};

const removeUser = (id: string) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
};

const getUsersInRoom = (room: string) =>
  users.filter((user) => user.room === room);

export { addUser, removeUser, getUsersInRoom };
