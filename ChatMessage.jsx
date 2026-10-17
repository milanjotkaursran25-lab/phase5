function ChatMessage({ message }) {
  return (
    <div className={`message ${message.role}`}>
      <strong>
        {message.role === "user" ? "You" : "Gemini AI"}
      </strong>

      <p>{message.text}</p>
    </div>
  );
}

export default ChatMessage;
