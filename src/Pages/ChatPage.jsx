import React, { useState, useRef, useEffect } from "react";
import Layout from "../Components/Layouts";

export default function ChatPage() {
  // Store all chat messages
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "bot", text: "Hello! How can I assist you today?" },
  ]);

  // Store the current input from the user
  const [userInput, setUserInput] = useState("");

  // Reference to scroll to the bottom of the chat
  const bottomOfChat = useRef(null);

  // Scroll to the latest message whenever chatMessages change
  useEffect(() => {
    bottomOfChat.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  // Handle sending a message
  const sendMessage = () => {
    const trimmedInput = userInput.trim();
    if (!trimmedInput) return;

    // Add user's message
    const newUserMessage = {
      id: chatMessages.length + 1,
      sender: "user",
      text: trimmedInput,
    };

    setChatMessages((prevMessages) => [...prevMessages, newUserMessage]);
    setUserInput("");

    // Simulate bot response after 1.5 seconds
    setTimeout(() => {
      const botReply = {
        id: chatMessages.length + 2,
        sender: "bot",
        text: `You said: "${trimmedInput}" (This is a placeholder response.)`,
      };
      setChatMessages((prevMessages) => [...prevMessages, botReply]);
    }, 1500);
  };

  // Allow pressing Enter to send message (Shift+Enter for newline)
  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <Layout>
      <div
        className="flex flex-col h-[70vh] max-w-3xl mx-auto border rounded-xl shadow-lg bg-gray-400
                      sm:h-[75vh] md:h-[80vh] px-4 sm:px-6 py-4"
      >
        {/* Chat messages */}
        <div className="flex-grow overflow-y-auto p-4 sm:p-6 space-y-4">
          {chatMessages.map((msg) => (
            <div
              key={msg.id}
              className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-md break-words ${
                msg.sender === "user"
                  ? "bg-gray-500 text-white self-end rounded-br-none"
                  : "bg-gray-50 text-blue-900 self-start rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={bottomOfChat} />
        </div>

        {/* Input area */}
        <div className="border-t flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 bg-gray-400 rounded-b-xl p-4">
          <textarea
            rows={1}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="flex-grow resize-none rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-900"
          />
          <button
            onClick={sendMessage}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-gray-700 w-full sm:w-auto"
          >
            Send
          </button>
        </div>
      </div>
    </Layout>
  );
}