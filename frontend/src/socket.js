import { io } from "socket.io-client";

const socket = io(
  "https://contract-farminng.onrender.com",
  {
    transports: ["websocket"],
  }
);

socket.on("connect", () => {
  const userId = localStorage.getItem("userId");

  if (userId) {
    socket.emit("join", userId);
    console.log("Joined room:", userId);
  }

  console.log("Socket connected:", socket.id);
});

export default socket;