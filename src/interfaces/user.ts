export interface UserForm {
  username: string;
  password: string;
}

export interface UserLoginContract {
  userCredentials: string;
  password: string;
}

export interface UserDataPayload {
  username: string;
  email: string;
  id: number;
  token: string;
}

export interface ContactFriend {
  id: number;
  fullName: string;
  chatId: string;
}
