import { User } from "@/types/user";
import { ACCOUNT_ENDPOINTS } from "./endpoints";

export const getAccountByUserId = async (userId: string): Promise<User> => {
  try {
    const response = await fetch(ACCOUNT_ENDPOINTS.GET_BY_USER_ID(userId));
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch account: ${error.message}`);
    }
    throw new Error("Failed to fetch account");
  }
};