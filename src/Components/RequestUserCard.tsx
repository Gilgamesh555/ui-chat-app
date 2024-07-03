import React, { useEffect, useState } from "react";
import "./RequestUserCard.css";
import { MessageStatus } from "../utils/messageStatusParser";
import { getContactById, updateContactStatus } from "../endpoints/userapi";

interface RequestUserCardProps {
  name: string;
  contactId: number;
}

const RequestUserCard: React.FC<RequestUserCardProps> = ({
  name,
  contactId,
}) => {
  const [requestContent, setRequestContent] = useState<JSX.Element | null>(
    <>
      <button onClick={() => handleAcceptRequest(contactId)}>Accept</button>
      <button onClick={() => handleRejectRequest(contactId)}>Reject</button>
    </>
  );

  useEffect(() => {
    // Get contact status from the server
    getContactById(contactId).then((response) => {
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
  }, [contactId]);

  const handleAcceptRequest = (contactId: number) => {
    // Accept request logic here
    updateContactStatus(contactId, MessageStatus.Accepted).then((response) => {
      if (response === false) {
        return;
      }

      // Update UI
      setRequestContent(<span>Request Accepted</span>);
    });
  };

  const handleRejectRequest = (contactId: number) => {
    // Reject request logic here
    updateContactStatus(contactId, MessageStatus.Rejected).then((response) => {
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
