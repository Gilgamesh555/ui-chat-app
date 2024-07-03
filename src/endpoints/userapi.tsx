import { MessageStatus } from "../utils/messageStatusParser";

const apiUrl = "http://localhost:5224";
export default apiUrl;

export const login = async (userCredentials: string, password: string) => {
  const response = await fetch(`${apiUrl}/api/Auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userCredentials, password }),
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
    return false;
  }

  return response.json();
};

export const sendChatRequest = async (senderId: number, receiverId: number) => {
  const response = await fetch(`${apiUrl}/api/Contact`, {
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

export const getChatRequests = async (userId: number) => {
  const response = await fetch(`${apiUrl}/api/Contact/user/${userId}`);

  if (!response.ok) {
    return false;
  }

  return response.json();
};

export const updateContactStatus = async (
  contactId: number,
  status: number
) => {
  const response = await fetch(`${apiUrl}/api/Contact/${contactId}/status`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(status),
  });

  if (!response.ok) {
    return false;
  }

  return response.json();
};

export const getContactById = async (contactId: number) => {
  const response = await fetch(`${apiUrl}/api/Contact/${contactId}`);

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
