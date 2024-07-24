import { useEffect, useState } from "react";
import "./chat-section.style.css";
import { getAllMessagesFromAChat, sendMessage } from "../../Endpoints/chatapi";

interface ChatSectionProps {
  fullName: string;
  userSenderId: number;
  userReceiverId: number;
  chatId: string;
}

interface MessageDTO {
  content: string;
  senderId: number;
  receiverId: number;
}

export function MessageSent(props: any): JSX.Element {
  return (
    <div className="message-sent">
      {/* <div className="message-prefix"></div> */}
      <div className="message-content">{props.content}</div>
    </div>
  );
}

export function MessageReceived(props: any): JSX.Element {
  return (
    <div className="message-received">
      {/* <div className="message-prefix"></div> */}
      <div className="message-content">{props.content}</div>
    </div>
  );
}

export default function ChatSection(props: ChatSectionProps): JSX.Element {
  const [message, setMessage] = useState<MessageDTO>({
    content: "",
    senderId: props.userSenderId,
    receiverId: props.userReceiverId,
  });
  const [messages, setMessages] = useState<MessageDTO[]>([]);
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    getAllMessagesFromAChat(props.chatId).then((response) => {
      if (response === false) {
        return;
      }

      const newMessages: MessageDTO[] = response?.messages.map(
        (message: any) => {
          return {
            content: message.content,
            senderId: message.sender,
            receiverId: message.receiver,
          };
        }
      );

      setMessages(newMessages);
    });

    setSocket(new WebSocket(`ws://localhost:8080?id=${props.userSenderId}`));
  }, [props]);

  if (!socket) {
    return <div>Error Socket...</div>;
  }

  socket.onopen = () => {
    console.log("Connected to the server");
  };

  socket.onmessage = (event) => {
    setMessages([
      ...messages,
      {
        content: event.data,
        senderId: props.userReceiverId,
        receiverId: props.userSenderId,
      },
    ]);
  };

  socket.onclose = () => {
    console.log("Disconnected from the server");
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      sendMessage({
        content: message.content,
        senderId: props.userSenderId,
        receiverId: props.userReceiverId,
        chatId: props.chatId,
      }).then((response) => {
        if (response === false) {
          return;
        }

        setMessages([...messages, message]);
      });

      socket.send(
        JSON.stringify({
          message: message.content,
          userReceiverId: props.userReceiverId,
          userSenderId: props.userSenderId,
        })
      );
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage({
      ...message,
      senderId: props.userSenderId,
      receiverId: props.userReceiverId,
      content: event.target.value,
    });
  };

  return (
    <div className="chat-main">
      <div className="chat-main-header">
        <div className="chat-main-header-c">
          <div className="user-info">
            <div className="user-info-card">{props.fullName}</div>
          </div>
          <div className="user-actions">Actions</div>
        </div>
      </div>
      <div className="chat-content">
        <div className="messages">
          {messages.map((message: MessageDTO, index: number) => {
            if (message.senderId === props.userSenderId) {
              return <MessageSent key={index} content={message.content} />;
            } else {
              return <MessageReceived key={index} content={message.content} />;
            }
          })}
        </div>
        <div className="chat-input">
          <div className="input-bar">
            <div className="input">
              <input
                type="text"
                placeholder="Type a message"
                value={message.content}
                onKeyDown={handleInputKeyDown}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
