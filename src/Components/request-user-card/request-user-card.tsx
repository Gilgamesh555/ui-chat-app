import React, { useEffect, useState } from "react";
import "./request-user-card.style.css";
import { MessageStatus } from "../../utils/messageStatusParser";
import {
  createContacts,
  getContactById,
  updateContactStatus,
} from "../../endpoints/userapi";
import Button from "../button/button";

interface RequestUserCardProps {
  name: string;
  userSenderId: number;
  userReceiverId: number;
}

const RequestUserCard: React.FC<RequestUserCardProps> = (
  props: RequestUserCardProps
) => {
  const [requestContent, setRequestContent] = useState<JSX.Element | null>(
    <>
      <Button
        onClick={() =>
          handleAcceptRequest(props.userSenderId, props.userReceiverId)
        }
        type="primary"
      >
        Accept
      </Button>
      <Button
        onClick={() =>
          handleRejectRequest(props.userSenderId, props.userReceiverId)
        }
        type="danger"
      >
        Reject
      </Button>
    </>
  );

  useEffect(() => {
    // Get contact status from the server
    getContactById(props.userSenderId, props.userReceiverId).then(
      (response) => {
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
      }
    );
  }, [props.userSenderId, props.userReceiverId]);

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
      <div className="request-user-card-c">
        {/* <div className="avatar"></div> */}
        <h3 className="name">{props.name}</h3>
        <div className="buttons">{requestContent}</div>
      </div>
    </div>
  );
};

export default RequestUserCard;
