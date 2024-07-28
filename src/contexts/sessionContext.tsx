import React, { createContext, useContext, useReducer } from "react";
import type { Dispatch } from "react";

interface UserData {
  username: string;
  email: string;
  id: number;
  token: string;
}

const UserDataContext = createContext<UserData>({
  username: "",
  email: "",
  id: 0,
  token: "",
});
const UserDispatchContext = createContext<
  Dispatch<{ type: string; payload?: () => {} }>
>(() => {});

export function SessionProvider({ children }: { children: React.ReactNode }) {
  const session = localStorage.getItem("userSession");
  const userData: UserData = session ? JSON.parse(session) : {};

  const [userSession, dispatch] = useReducer(userSessionReducer, userData);

  return (
    <UserDataContext.Provider value={userSession}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserDataContext.Provider>
  );
}

export function useSession() {
  return useContext(UserDataContext);
}

export function useSessionDispatch() {
  return useContext(UserDispatchContext);
}

export function userSessionReducer(state: UserData, action: any): UserData {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        username: action.payload.username,
        email: action.payload.email,
        id: action.payload.id,
        token: action.payload.token,
      };
    case "CLEAR_USER":
      return {
        username: "",
        email: "",
        id: 0,
        token: "",
      };
    default:
      throw new Error("Invalid action type");
  }
}
