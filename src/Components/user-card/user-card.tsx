import React from "react";
import "./user-card.css";
import Button from "../button/button";

interface UserCardProps {
  name: string;
  handleOpenChat: () => void;
}

const UserCard: React.FC<UserCardProps> = ({ name, handleOpenChat }) => {
  return (
    <div className="user-card">
      <div className="user-card-c">
        <h2 className="name">{name}</h2>
        <div className="buttons">
          <Button onClick={() => handleOpenChat()} type="secondary">
            Chat
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
