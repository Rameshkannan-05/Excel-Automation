import React, { useState, useRef, useEffect } from "react";
import Layout from "../Components/Layouts";

export default function ChatPage() {
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: "bot", text: "Hello! How can I assist you today? Try querying like 'weld point: 3' or 'description: L61030-100'." },
  ]);
  const [userInput, setUserInput] = useState("");  // Fixed from previous
  const [sessionId, setSessionId] = useState("default"); // use same session as uploaded file
  const bottomOfChat = useRef(null);

  useEffect(() => {
    bottomOfChat.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  const sendMessage = async () => {
    const trimmedInput = userInput.trim();
    if (!trimmedInput) return;

    const newUserMessage = {  // Fixed from previous
      id: Date.now(),
      sender: "user",
      text: trimmedInput,
    };
    setChatMessages((prev) => [...prev, newUserMessage]);
    setUserInput("");  // Fixed from previous

    // Extract query params
    const weldPointMatch = trimmedInput.match(/weld point:\s*(.*)/i);
    const descriptionMatch = trimmedInput.match(/description:\s*(.*)/i);
    const requestBody = {
      session_id: sessionId,
      weld_point: weldPointMatch ? weldPointMatch[1].trim() : null,
      description: descriptionMatch ? descriptionMatch[1].trim() : null,
    };
    console.log("Sending request:", requestBody);  // Debug: Check in console

    try {
      const res = await fetch("http://127.0.0.1:8001/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      console.log("Response status:", res.status);  // Debug: Check status

      if (!res.ok) {
        // Improved: Parse error response for 422 (validation) or other errors
        let errorData = {};
        try {
          errorData = await res.json();
          console.log("Error response body:", errorData);  // Debug: Full error details
        } catch (parseErr) {
          console.error("Failed to parse error JSON:", parseErr);
        }

        // Handle specific errors
        if (res.status === 422) {
          const validationErrors = errorData.detail || [];
          const errorMsgs = validationErrors.map(err => `${err.loc.join('.')}: ${err.msg}`).join('; ');
          throw new Error(`Validation error: ${errorMsgs || 'Invalid request format'}`);
        } else if (res.status === 404) {
          throw new Error("Endpoint not found. Check server URL.");
        } else {
          throw new Error(`Backend error: ${res.status} - ${errorData.detail || 'Unknown error'}`);
        }
      }

      const data = await res.json();
      console.log("Response data:", data);  // Debug: Check data

      const botMessage = {
        id: Date.now() + 1,
        sender: "bot",
        text:
          data.rows && data.rows.length > 0
            ? `Found ${data.count} result(s):\n\n` + data.rows
                .map((row, index) => {
                  return `Result ${index + 1}:\n${Object.entries(row)
                    .filter(([key]) => key && key !== 'nan' && key !== '')  // Skip invalid keys
                    .map(([key, value]) => `${key}: ${value || 'N/A'}`)
                    .join("\n")}`;
                })
                .join("\n\n---\n\n")
            : "No results found. Make sure to upload a file and try a valid query (e.g., exact weld point value from the file).",
      };
      setChatMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error("Fetch error:", err);  // Debug: Log full error
      let errorMsg = "Error connecting to backend.";
      if (err.message.includes("Failed to fetch")) {
        errorMsg += " Check if the server is running on http://127.0.0.1:8001.";
      } else if (err.message.includes("No data for this session")) {
        errorMsg += " No data uploaded for this session. Upload a file first.";
      } else if (err.message.includes("Validation error")) {
        errorMsg += ` ${err.message}`;
      } else {
        errorMsg += ` ${err.message}`;
      }
      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          sender: "bot",
          text: errorMsg,
        },
      ]);
    }
  };

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
              <pre className="whitespace-pre-wrap">{msg.text}</pre>  {/* Use <pre> for better formatting of multi-line responses */}
            </div>
          ))}
          <div ref={bottomOfChat} />
        </div>

        {/* Input area */}
        <div className="border-t flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 bg-gray-400 rounded-b-xl p-4">
          <textarea
            rows={1}
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}  // Fixed from previous
            onKeyDown={handleKeyPress}
            placeholder="Type your message... (e.g., 'weld point: 3')"
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