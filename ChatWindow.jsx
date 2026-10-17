import ChatMessage from "./ChatMessage";

function ChatWindow({ messages }) {
  return (
    <div className="chat-window">
      {messages.length === 0 ? (
        <div className="welcome-message">
          <h2>How can I help you today?</h2>
          <p>Ask Gemini anything.</p>
        </div>
      ) : (
        messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
          />
        ))
      )}
    </div>
  );
}

export default ChatWindow;