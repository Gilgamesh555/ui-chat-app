import React from "react";
import "./UserCard.css";
import messageStatusParser from "../utils/messageStatusParser";

interface UserCardProps {
  name: string;
  email: string;
  status?: number;
  handleSentChatRequest?: () => void;
  handleOpenChat?: () => void;
  isContact?: boolean;
}

const UserCard: React.FC<UserCardProps> = ({
  name,
  email,
  status,
  handleSentChatRequest,
  handleOpenChat,
  isContact,
}) => {
  const newStatus = messageStatusParser(status ?? 1);

  return (
    <div className="user-card">
      <h2>{name}</h2>
      <p>{email}</p>
      {status === 4 ? (
        <button onClick={handleSentChatRequest}>Sent Chat Request</button>
      ) : (
        <span className={newStatus.toLowerCase()}>{newStatus}</span>
      )}
      {isContact && (
        <>
          <span>Friend</span>
          <button onClick={() => handleOpenChat && handleOpenChat()}>
            Chat
          </button>
        </>
      )}
    </div>
  );
};

export default UserCard;
