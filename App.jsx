import { useEffect, useState } from "react";
import ChatWindow from "./components/ChatWindow";
import ChatInput from "./components/ChatInput";
import "./App.css";

function App() {
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("geminiChatHistory");

    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  useEffect(() => {
    localStorage.setItem(
      "geminiChatHistory",
      JSON.stringify(messages)
    );
  }, [messages]);

  const askGemini = async (question) => {
    setLoading(true);
    setError("");

    const userMessage = {
      id: Date.now(),
      role: "user",
      text: question,
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      userMessage,
    ]);

    try {
      const response = await fetch(
        "/api/chat/ask",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            question,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Request failed");
      }

      const aiMessage = {
        id: Date.now() + 1,
        role: "ai",
        text: data.answer,
      };

      setMessages((previousMessages) => [
        ...previousMessages,
        aiMessage,
      ]);
    } catch (error) {
      console.error(error);
      setError(
        "Unable to connect to Gemini. Check that the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError("");

    localStorage.removeItem("geminiChatHistory");
  };

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Ask Gemini</h1>
          <p>Your AI-powered assistant</p>
        </div>

        <button onClick={clearChat}>
          Clear Chat
        </button>
      </header>

      <main className="main-container">
        <ChatWindow messages={messages} />

        {loading && (
          <div className="loading">
            Gemini is thinking...
          </div>
        )}

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        <ChatInput
          onSend={askGemini}
          loading={loading}
        />
      </main>
    </div>
  );
}

export default App;