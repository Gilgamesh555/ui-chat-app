import React from "react";
import "./home.style.css";
import NavBar from "../../Components/nav-bar/navbar";
import FriendsHeader from "../../Components/friends-header/friends-header";
import ChatSection from "../chat-section/chat-section";
import { useChat } from "../../Contexts/ChatContext";

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
