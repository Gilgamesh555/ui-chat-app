import React, { useEffect, useState } from "react";
import "./ChatPage.css";

interface ChatPageProps {
  isOpen: boolean;
  chat: {
    userSenderId: number;
    userReceiverId: number;
  };
}

interface ChatProps {
  isOpen: boolean;
  handleSendMessage: () => void;
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  chats: ChatMessage[];
}

interface ChatMessage {
  message: string;
  isSender: boolean;
}

const ChatPage: React.FC<ChatPageProps> = ({ isOpen, chat }) => {
  const [chats, setChats] = useState<ChatMessage[]>([]);
  const [message, setMessage] = useState("");
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080?id=${chat.userSenderId}`);

    setWebsocket(ws);

    console.log("rendered");
  }, [chat.userSenderId]);

  if (!websocket) {
    return null;
  }

  websocket.onopen = () => {
    console.log("Connected to the server");
  };

  websocket.onmessage = (event) => {
    setChats([...chats, { message: event.data, isSender: false }]);
  };

  websocket.onclose = () => {
    console.log("Disconnected from the server");
  };

  const handleSendMessage = () => {
    websocket.send(
      JSON.stringify({
        message: message,
        userReceiverId: chat.userReceiverId,
        userSenderId: chat.userSenderId,
      })
    );

    setChats([...chats, { message: message, isSender: true }]);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  return (
    <Chat
      isOpen={isOpen}
      handleSendMessage={handleSendMessage}
      handleInputChange={handleInputChange}
      chats={chats}
    />
  );
};

const Chat: React.FC<ChatProps> = ({
  isOpen,
  handleSendMessage,
  handleInputChange,
  chats,
}) => {
  return (
    <>
      {isOpen && (
        <div>
          <div className="chat-container">
            <div className="chat-header">
              <h1>Messenger</h1>
            </div>
            <div className="chat-messages">
              {chats.map((chat, index) => (
                <div
                  key={index}
                  className={`chat-message ${
                    chat.isSender ? "sender" : "receiver"
                  }`}
                >
                  {chat.message}
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                type="text"
                placeholder="Type a message"
                onChange={handleInputChange}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatPage;
