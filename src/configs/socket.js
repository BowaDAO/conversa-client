import { io } from "socket.io-client";

const socketConnection = (user) =>
  io(import.meta.env.VITE_SERVER_URL, {
    autoConnect: false,
    withCredentials: true,
    auth: {
      token: user.token,
    },
  });

export default socketConnection;
