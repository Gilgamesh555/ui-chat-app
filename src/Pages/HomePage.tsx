import React, { useContext, useEffect, useState } from "react";
import LoginPage from "./LoginPage";
import {
  getAllWithAcceptedStatus,
  getChatRequests,
  searchByUsernameOrEmail,
  sendChatRequest,
} from "../endpoints/userapi";
import "./HomePage.css";
import UserCard from "../Components/UserCard";
import { UserDataContext } from "../Contexts/UserDataContext";
import RequestUserCard from "../Components/RequestUserCard";
import ChatPage from "./ChatPage";

const HomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [logOut, setLogOut] = useState(false);
  const [searchResults, setSearchResults] = useState([] as any[]);
  const [requests, setRequests] = useState([] as any[]);
  const [contacts, setContacts] = useState([] as any[]);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentChat, setCurrentChat] = useState({} as any);
  const userData = useContext(UserDataContext);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const getRequests = () => {
      // Get requests from the server
      getChatRequests(userData.id).then((response) => {
        if (response === false) {
          return;
        }

        setRequests(response);
      });
    };

    const getAllContacts = () => {
      getAllWithAcceptedStatus(userData.id).then((response) => {
        if (response === false) {
          return;
        }

        setContacts(response);
      });
    };

    getRequests();
    getAllContacts();
  }, [userData]);

  const searchByInput = () => {
    searchByUsernameOrEmail(searchQuery, userData.id).then((response) => {
      if (response === false) {
        return;
      }

      console.log(response);

      setSearchResults(response);
    });
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    searchByInput();
  };

  const handleSentChatRequest = (id: number) => {
    sendChatRequest(userData.id, id).then((response) => {
      if (response === false) {
        return;
      }

      searchByInput();
    });
  };

  const handleLogOutClick = () => {
    // Perform log out logic here
    setLogOut(true);
  };

  const handleOpenChat = (senderId: number, receiverId: number) => {
    // Open chat logic here
    console.log("Opening chat with", senderId, receiverId);
    setIsChatOpen(!isChatOpen);
    setCurrentChat({
      userSenderId: receiverId,
      userReceiverId: senderId,
    });
  };

  if (logOut) {
    return <LoginPage />;
  }

  return (
    <div className="home-page">
      <button onClick={handleLogOutClick} className="logout-button">
        Log Out
      </button>
      <h1 className="app-title">Chat App</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for people to chat with"
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button className="search-button">Search</button>
      </form>

      <span className="search-results-title">Search Results:</span>
      {searchResults.length === 0 ? (
        <span className="no-results">No results found</span>
      ) : (
        searchResults.map((result) => {
          return (
            <UserCard
              key={result.id}
              name={result.firstName + result.lastName}
              email={result.email}
              status={result.status}
              handleSentChatRequest={() => handleSentChatRequest(result.id)}
            />
          );
        })
      )}

      <span>Requests:</span>
      {requests.length === 0 ? (
        <span className="no-results">No requests found</span>
      ) : (
        requests.map((request) => {
          return (
            <RequestUserCard
              key={request.id}
              name={request.firstName + " " + request.lastName}
              contactId={request.contactId}
            />
          );
        })
      )}

      <span>Friends:</span>
      {contacts.length === 0 ? (
        <span className="no-results">No friends found</span>
      ) : (
        contacts.map((contact) => {
          return (
            <UserCard
              key={contact.id}
              name={contact.firstName + " " + contact.lastName}
              email={contact.email}
              isContact={true}
              handleOpenChat={() => {
                return handleOpenChat(
                  contact.userSenderId,
                  contact.userReceiverId
                );
              }}
            />
          );
        })
      )}

      {isChatOpen && <ChatPage isOpen={isChatOpen} chat={currentChat} />}
    </div>
  );
};

export default HomePage;
