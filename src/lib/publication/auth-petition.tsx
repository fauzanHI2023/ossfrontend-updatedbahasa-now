import axios from "axios";

export const fetchPetition = async () => {
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/publikasi/petition-api`;
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_API_KEY_PETITION || "",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching petition reports:", error);
    return null;
  }
};
