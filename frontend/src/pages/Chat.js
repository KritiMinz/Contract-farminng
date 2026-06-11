import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";
import socket from "../socket";

function Chat() {

  const { id } = useParams();

  const myId = localStorage.getItem("userId");
  console.log("MY ID:", myId);
console.log("CHAT ID:", id);

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {

    fetchMessages();

    socket.on("newMessage", (message) => {

  console.log("NEW MESSAGE RECEIVED:", message);

  setMessages((prev) => [...prev, message]);

});

    return () => {
      socket.off("newMessage");
    };

  }, []);

  useEffect(() => {

  bottomRef.current?.scrollIntoView({
    behavior: "smooth",
  });

}, [messages]);

  const fetchMessages = async () => {

    try {

      const res = await API.get(`/chat/${id}`);

      setMessages(res.data);

    } catch (err) {

      console.error(err);

    }
  };

  const sendMessage = () => {

  if (!text.trim()) return;

  const newMessage = {
    senderId: myId,
    receiverId: id,
    text,
  };

  socket.emit("sendMessage", newMessage);

  // Show immediately
  setMessages((prev) => [...prev, newMessage]);

  setText("");
};

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h2 className="text-3xl font-bold mb-6">
        Chat
      </h2>

      <div className="bg-white rounded shadow p-4 h-96 overflow-y-auto">

        {messages.map((msg) => (

          <div
            key={msg._id}
            className={`mb-3 ${
              String(msg.senderId) === String(myId)
                ? "text-right"
                : "text-left"
            }`}
          >
            <span className="bg-green-100 px-3 py-2 rounded inline-block">
              {msg.text}
            </span>
          </div>

        ))}

        <div ref={bottomRef}></div>

      </div>

      <div className="flex gap-2 mt-4">

        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
          className="flex-1 border p-2 rounded"
        />

        <button
          onClick={sendMessage}
          className="bg-green-500 text-white px-4 rounded"
        >
          Send
        </button>

      </div>

    </div>
  );
}

export default Chat;