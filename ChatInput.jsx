import { useState } from "react";

function ChatInput({ onSend, loading }) {
  const [question, setQuestion] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!question.trim() || loading) return;

    onSend(question);
    setQuestion("");
  };

  return (
    <form className="chat-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Ask anything..."
        value={question}
        onChange={(event) => setQuestion(event.target.value)}
        disabled={loading}
      />

      <button
        type="submit"
        disabled={loading || !question.trim()}
      >
        {loading ? "Thinking..." : "Send"}
      </button>
    </form>
  );
}

export default ChatInput;
