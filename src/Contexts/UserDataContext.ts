import { createContext } from "react";

interface UserData {
  username: string;
  email: string;
  id: number;
}

export const UserDataContext = createContext({} as UserData);
