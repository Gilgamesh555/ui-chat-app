import { useEffect, useState } from "react";
import { useSession } from "../../contexts/SessionContext";
import { ContactFriend } from "../../interfaces/User";
import { getAllWithAcceptedStatus } from "../../endpoints/userapi";
import UserCard from "../../components/user-card/user-card";
import "./friends.style.css";
import { useChatDispatch } from "../../contexts/ChatContext";

export default function FriendsPage(): JSX.Element {
  const user = useSession();
  const chatDispatch = useChatDispatch();
  const [friends, setFriends] = useState<ContactFriend[]>([]);

  useEffect(() => {
    getAllWithAcceptedStatus(user.id).then((response) => {
      if (response === false) {
        return;
      }

      const newFriends: ContactFriend[] = response.map((friend: any) => {
        return {
          id: friend.id,
          fullName: friend.firstName + " " + friend.lastName,
          chatId: friend.chatId,
        };
      });
      setFriends(newFriends);
    });
  }, [user]);

  return (
    <div className="friends-page">
      <div className="friends-results-c">
        <ul>
          {friends.map((friend) => (
            <li key={friend.id}>
              <UserCard
                name={friend.fullName}
                handleOpenChat={() => {
                  chatDispatch({
                    type: "SET_CHAT",
                    payload: {
                      senderId: user.id,
                      receiverId: friend.id,
                      chatId: friend.chatId,
                      fullName: friend.fullName,
                      messages: [],
                    },
                  });
                }}
                // userSenderId={user.id}
                // userReceiverId={friend.id}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
