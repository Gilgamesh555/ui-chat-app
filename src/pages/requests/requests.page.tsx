import { useEffect, useState } from "react";
import RequestUserCard from "../../components/request-user-card/request-user-card";
import { useSession } from "../../contexts/sessionContext";
import "./requests.style.css";
import { getChatRequests } from "../../endpoints/userapi";

export interface UserRequest {
  id: number;
  fullName: string;
}

export default function RequestPage(): JSX.Element {
  const [requests, setRequests] = useState<UserRequest[]>([]);
  const user = useSession();

  useEffect(() => {
    getChatRequests(user.id).then((response) => {
      if (response === false) {
        return;
      }

      const userRequest: UserRequest[] = response.map((request: any) => {
        return {
          id: request.id,
          fullName: request.firstName + " " + request.lastName,
        };
      });

      setRequests(userRequest);
    });
  }, [user]);

  return (
    <div className="request-page">
      <div className="request-results-c">
        <ul>
          {requests.map((request) => (
            <li key={request.id}>
              <RequestUserCard
                name={request.fullName}
                userSenderId={request.id}
                userReceiverId={user.id}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
