import { API_URL, authToken } from "./config";

export const listTweets = async () => {
  const response = await fetch(`${API_URL}/tweet`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  if (response.status === 401) {
    throw new Error("Not authorized. Please sign in");
  }
  if (response.status !== 200) {
    throw new Error("Error fetching tweets");
  }
  const data = await response.json();
  return data;
};

export const getTweet = async (id: string) => {
  const response = await fetch(`${API_URL}/tweet/${id}`, {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  if (response.status === 401) {
    throw new Error("Not authorized. Please sign in");
  }
  if (response.status !== 200) {
    throw new Error("Error fetching tweets");
  }
  return await response.json();
};

export const createTweet = async (data: { content: string }) => {
  const response = await fetch(`${API_URL}/tweet`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.status === 401) {
    throw new Error("Not authorized. Please sign in");
  }
  if (response.status !== 201) {
    throw new Error("Error creating tweets");
  }
  return await response.json();
};
