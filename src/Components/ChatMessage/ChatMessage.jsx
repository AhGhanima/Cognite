function ChatMessage({ message, isRight }) {
  return (
    <>
      {!isRight && (
        <p className="card-text">
          {message}
        </p>
      )}
      {isRight && (
        <p className="card-text text-right">
          {message}
        </p>
      )}
    </>
  );
}

export default ChatMessage;
