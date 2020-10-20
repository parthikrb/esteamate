import express from "express";
import http from "http";
import socketIO from "socket.io";
import "express-async-errors";
import cors from "cors";
import { json } from "body-parser";
// import cookie from "cookie";
import { addUser, removeUser, getUsersInRoom } from "./utils/user";

// Set Cookie
import cookieSession from "cookie-session";

// DB
import mongoose from "mongoose";

// Error Handlers
import {
  NotFoundError,
  errorHandler,
  DatabaseConnectionError,
  currentUser,
  natsWrapper,
} from "@parthikrb/common";

const app = express();

const server = http.createServer(app);
const io = socketIO(server);

io.on("connection", (socket) => {
  socket.on("join", ({ user, squad }, callback) => {
    console.log("User Joined");
    const { newUser } = addUser(socket.id, user, squad);

    socket.join(newUser.room!);

    socket.broadcast
      .to(newUser.room!)
      .emit("message", `${newUser.user.fullname} has Joined!`);

    io.to(newUser.room!).emit("roomData", getUsersInRoom(newUser.room!));

    callback();
  });

  socket.on("vote", ({ user, room, vote }) => {
    const users = getUsersInRoom(room);
    users.forEach((us) => {
      if (us.user.id === user.id) {
        us.user.vote = vote;
        us.user.voted = true;
      }
    });

    io.to(room).emit("roomData", users);
    // socket.broadcast.to(room).emit("message", { user, vote });
  });

  socket.on("poll", ({ squad, story }) => {
    const users = getUsersInRoom(squad);
    users.forEach((us) => {
      us.user.vote = 0;
      us.user.voted = false;
    });

    io.to(squad).emit("roomData", users);
    socket.broadcast.to(squad).emit("hostMessage", story);
  });

  socket.on("disconnect", () => {
    console.log("User Left");
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", `${user.user.fullname} has left`);
      io.to(user.room).emit("roomData", getUsersInRoom(user.room));
    }
  });
});

app.use(cors());

app.set("trust proxy", true); // trust first proxy

app.use(json());

// Set Cookie in response
app.use(
  cookieSession({
    name: "session",
    secure: true,
    signed: false,
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use(currentUser);

app.all("*", (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const startApp = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO URI should be defined");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("NATS_CLIENT_ID must be defined");
  }
  if (!process.env.NATS_URL) {
    throw new Error("NATS_URL must be defined");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("NATS_CLUSTER_ID must be defined");
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID!,
      process.env.NATS_CLIENT_ID!,
      process.env.NATS_URL!
    );
    natsWrapper.client.on("close", () => {
      console.log("NATS connection closed!");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    await mongoose
      .connect(process.env.MONGO_URI!, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      })
      .catch((err) => {
        console.error(err.message);
        throw new DatabaseConnectionError(err.message);
      });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error(err.message);
  }
  server.listen(3000, () => {
    console.log(`Listening on PORT 3000`);
  });
};

startApp();
