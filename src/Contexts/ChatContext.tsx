import { createContext, useContext, useReducer } from "react";

interface ChatContextI {
  senderId: number;
  receiverId: number;
  chatId: string;
  fullName: string;
  messages: string[];
}

interface ChatAction {
  type: string;
  payload: ChatContextI;
}

const ChatContext = createContext<ChatContextI>({
  senderId: 0,
  receiverId: 0,
  chatId: "",
  fullName: "",
  messages: [],
});

const ChatDispatchContext = createContext<React.Dispatch<ChatAction>>(() => {});

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const chat: ChatContextI = {
    senderId: 0,
    receiverId: 0,
    chatId: "",
    fullName: "",
    messages: [],
  };
  const [chatResults, dispatch] = useReducer(ChatReducer, chat);

  return (
    <ChatContext.Provider value={chatResults}>
      <ChatDispatchContext.Provider value={dispatch}>
        {children}
      </ChatDispatchContext.Provider>
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}

export function useChatDispatch() {
  return useContext(ChatDispatchContext);
}

function ChatReducer(state: ChatContextI, action: ChatAction): ChatContextI {
  switch (action.type) {
    case "SET_CHAT":
      return {
        senderId: action.payload.senderId,
        receiverId: action.payload.receiverId,
        chatId: action.payload.chatId,
        fullName: action.payload.fullName,
        messages: [],
      };
    case "CLEAR_CHAT":
      return {
        senderId: 0,
        receiverId: 0,
        chatId: "",
        fullName: "",
        messages: [],
      };
    case "SET_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages],
      };
    default:
      return state;
  }
}
