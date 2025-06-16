import axios from "axios";

interface DeleteCartResponse {
  status: string;
  message: string;
}

export const fetchDeleteCart = async (cookies_id: string): Promise<DeleteCartResponse> => {
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/donation/delete-transaction-cart`;

  try {
    const response = await axios.post(apiUrl, { cookies_id });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Unexpected response status: ${response.status}`);
    }
  } catch (error: any) {
    console.error("Error deleting transaction cart:", error?.response?.data || error.message);
    throw new Error(error?.response?.data?.message || "Failed to delete transaction cart.");
  }
};
