import { useEffect, useState } from "react";
import {
  checkIfUserIsAlreadyRequested,
  sendChatRequest,
} from "../../Endpoints/userapi";
import Button from "../button/button";
import "./search-user-card.style.css";

interface SearchUserCardProps {
  name: string;
  userSenderId: number;
  userReceiverId: number;
}

export default function SearchUserCard(
  props: SearchUserCardProps
): JSX.Element {
  const [isFriendRequested, setIsFriendRequested] = useState<boolean>(true);

  const addFriendHandler = () => {
    sendChatRequest(props.userSenderId, props.userReceiverId).then(
      (response) => {
        if (response === false) {
          return;
        }

        setIsFriendRequested(true);
      }
    );
  };

  useEffect(() => {
    checkIfUserIsAlreadyRequested(
      props.userSenderId,
      props.userReceiverId
    ).then((response) => {
      if (response === false) {
        setIsFriendRequested(false);
        return;
      }

      setIsFriendRequested(true);
    });
  }, [props.userSenderId, props.userReceiverId]);

  return (
    <div className="search-user-card">
      <div className="search-user-card-c">
        <h3 className="name">{props.name}</h3>
        <div className="buttons">
          {!isFriendRequested && (
            <Button type="primary" onClick={() => addFriendHandler()}>
              Add Friend
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
