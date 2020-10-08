import io from "socket.io-client";

let socket;
const buildSocket = () => {
  if (typeof window === "undefined") {
    socket = io(
      `http://ingress-nginx-controller.ingress-nginx.svc.cluster.local`
    );
  } else {
    socket = io("https://bapana.xyz");
  }
};

buildSocket();

export { buildSocket, socket };
