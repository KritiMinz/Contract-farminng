import { io } from "socket.io-client";

const socket = io("http://localhost:5000", {
  transports: ["websocket"],
});

// ✅ SEND USER ID AFTER CONNECT
socket.on("connect", () => {
  const userId = localStorage.getItem("userId"); // 🔥 IMPORTANT

  if (userId) {
    socket.emit("join", userId);
    console.log("Joined room:", userId);
  }

  console.log("Socket connected:", socket.id);
});

export default socket;