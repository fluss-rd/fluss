import axios from "./axiosInstance";

export interface PlaceholderResponse {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export async function getTodo(userId: number): Promise<PlaceholderResponse> {
  const response = await axios.get<PlaceholderResponse>(`todos/${userId}`);
  return response.data;
}
