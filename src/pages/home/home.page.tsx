import React from "react";
import "./home.style.css";
import NavBar from "../../components/nav-bar/navbar";
import FriendsHeader from "../../components/friends-header/friends-header";
import ChatSection from "../chat-section/chat-section";
import { useChat } from "../../contexts/chatContext";

const HomePage: React.FC = () => {
  const chat = useChat();

  return (
    <div className="home-page">
      <NavBar />
      <div className="app-c">
        <div className="app-c2">
          <FriendsHeader />
          <ChatSection
            fullName={chat.fullName}
            userSenderId={chat.senderId}
            userReceiverId={chat.receiverId}
            chatId={chat.chatId}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
