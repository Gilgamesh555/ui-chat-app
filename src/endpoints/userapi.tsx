import { UserForm, UserLoginContract } from "../interfaces/User";
import { MessageStatus } from "../utils/messageStatusParser";

const apiUrl = "http://localhost:5224";
export default apiUrl;

// Promise<boolean | Record<string, unknown>>

export const login = async (user: UserForm) => {
  const response = await fetch(`${apiUrl}/api/Auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userCredentials: user.username,
      password: user.password,
    } as UserLoginContract),
  });

  if (!response.ok) {
    return false;
  }

  return response.json();
};

export const validateToken = async (token: string) => {
  const response = await fetch(`${apiUrl}/api/Auth/validate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    return false;
  }

  return response.json();
};

export const searchByUsernameOrEmail = async (
  query: string,
  userId: number
) => {
  const response = await fetch(
    `${apiUrl}/api/User/search?query=${query}&userId=${userId}`
  );

  if (!response.ok) {
    return new Promise((resolve) => resolve(false));
  }

  return response.json();
};

export const sendChatRequest = async (senderId: number, receiverId: number) => {
  const response = await fetch(`${apiUrl}/api/ContactRequest/create/contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userSenderId: senderId,
      userReceiverId: receiverId,
      status: MessageStatus.Pending,
    }),
  });

  if (!response.ok) {
    return false;
  }

  return response.json();
};

export const checkIfUserIsAlreadyRequested = async (
  senderId: number,
  receiverId: number
) => {
  const response = await fetch(
    `${apiUrl}/api/contact/check-request/${senderId}/${receiverId}`
  );

  if (!response.ok) {
    return new Promise((resolve) => resolve(false));
  }

  return response.json();
};

export const getChatRequests = async (userId: number) => {
  const response = await fetch(`${apiUrl}/api/Contact/user/${userId}`);

  if (!response.ok) {
    return false;
  }

  return response.json();
};

export const updateContactStatus = async (
  userSenderId: number,
  userReceiverId: number,
  status: number
) => {
  const response = await fetch(
    `${apiUrl}/api/ContactRequest/${userSenderId}/${userReceiverId}/status`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(status),
    }
  );

  if (!response.ok) {
    return false;
  }

  return response.json();
};

export const getContactById = async (
  userSenderId: number,
  userReceiverId: number
) => {
  const response = await fetch(
    `${apiUrl}/api/ContactRequest/${userSenderId}/${userReceiverId}`
  );

  if (!response.ok) {
    return false;
  }

  return response.json();
};

export const getAllWithAcceptedStatus = async (userId: number) => {
  const response = await fetch(
    `${apiUrl}/api/user/${userId}/accepted-contacts`
  );

  if (!response.ok) {
    return false;
  }

  return response.json();
};

export const createContacts = async (
  userSenderId: number,
  userReceiverId: number
) => {
  const response = await fetch(`${apiUrl}/api/Contact`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userSenderId,
      userReceiverId,
    }),
  });

  if (!response.ok) {
    return false;
  }

  return response.json();
};
