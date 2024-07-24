const apiUrl = "http://localhost:3100";
export default apiUrl;

export const getAllMessagesFromAChat = async (chatId: string) => {
  if (!chatId) {
    return false;
  }

  const response = await fetch(`${apiUrl}/api/chat/${chatId}/messages`);

  if (!response.ok) {
    return false;
  }

  return response.json();
};

interface MessageDTO {
  content: string;
  senderId: number;
  receiverId: number;
  chatId: string;
}

export const sendMessage = async (message: MessageDTO) => {
  const response = await fetch(`${apiUrl}/api/message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  if (!response.ok) {
    return false;
  }

  return response.json();
};
