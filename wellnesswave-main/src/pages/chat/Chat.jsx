// // App.js

// import React, { useState, useEffect } from "react";
// import io from "socket.io-client";
// import { serverUrl } from "../ServerLink";

// const socket = io(`${serverUrl}`);

// function Chat() {
//   const [messages, setMessages] = useState([]);
//   const [newMessage, setNewMessage] = useState("");

//   useEffect(() => {
//     // Fetch initial messages
//     fetchMessages();

//     // Listen for new messages
//     socket.on("message", (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//     });

//     // Clean up on unmount
//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   const fetchMessages = async () => {
//     const response = await fetch(`${serverUrl}/messages`);
//     const data = await response.json();
//     setMessages(data);
//   };

//   const sendMessage = () => {
//     socket.emit("message", { text: newMessage, sender: "user" });
//     setNewMessage("");
//     console.log("msg sent");
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
//       <ul style={{ listStyleType: "none", padding: 0 }}>
//         {messages.map((message) => (
//           <li key={message._id} style={{ marginBottom: "8px" }}>
//             {message.sender}: {message.text}
//           </li>
//         ))}
//       </ul>
//       <input
//         type="text"
//         value={newMessage}
//         onChange={(e) => setNewMessage(e.target.value)}
//         style={{ marginBottom: "8px" }}
//       />
//       <button
//         onClick={sendMessage}
//         style={{
//           padding: "8px 16px",
//           backgroundColor: "#007BFF",
//           color: "white",
//           border: "none",
//           borderRadius: "4px",
//           cursor: "pointer",
//         }}
//       >
//         Send
//       </button>
//     </div>
//   );
// }

// export default Chat;
