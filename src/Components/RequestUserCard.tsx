import React, { useEffect, useState } from "react";
import "./RequestUserCard.css";
import { MessageStatus } from "../utils/messageStatusParser";
import {
  createContacts,
  getContactById,
  updateContactStatus,
} from "../endpoints/userapi";

interface RequestUserCardProps {
  name: string;
  userSenderId: number;
  userReceiverId: number;
}

const RequestUserCard: React.FC<RequestUserCardProps> = ({
  name,
  userSenderId,
  userReceiverId,
}) => {
  const [requestContent, setRequestContent] = useState<JSX.Element | null>(
    <>
      <button onClick={() => handleAcceptRequest(userSenderId, userReceiverId)}>
        Accept
      </button>
      <button onClick={() => handleRejectRequest(userSenderId, userReceiverId)}>
        Reject
      </button>
    </>
  );

  useEffect(() => {
    // Get contact status from the server
    getContactById(userSenderId, userReceiverId).then((response) => {
      if (response === false) {
        return;
      }

      if (response.status === MessageStatus.Accepted) {
        setRequestContent(<span>Request Accepted</span>);
      } else if (response.status === MessageStatus.Rejected) {
        setRequestContent(<span>Request Rejected</span>);
      } else if (response.status === MessageStatus.Blocked) {
        setRequestContent(<span>Request Blocked</span>);
      }
    });
  }, [userSenderId, userReceiverId]);

  const handleAcceptRequest = (
    userSenderId: number,
    userReceiverId: number
  ) => {
    // Accept request logic here
    updateContactStatus(
      userSenderId,
      userReceiverId,
      MessageStatus.Accepted
    ).then((response) => {
      if (response === false) {
        return;
      }

      createContacts(userSenderId, userReceiverId).then((response) => {
        if (response === false) {
          return;
        }
      });

      // Update UI
      setRequestContent(<span>Request Accepted</span>);
    });
  };

  const handleRejectRequest = (
    userSenderId: number,
    userReceiverId: number
  ) => {
    // Reject request logic here
    updateContactStatus(
      userSenderId,
      userReceiverId,
      MessageStatus.Rejected
    ).then((response) => {
      if (response === false) {
        return;
      }

      // Update UI
      setRequestContent(<span>Request Rejected</span>);
    });
  };

  return (
    <div className="request-user-card">
      <h3 className="name">{name}</h3>
      <div className="buttons">{requestContent}</div>
    </div>
  );
};

export default RequestUserCard;
