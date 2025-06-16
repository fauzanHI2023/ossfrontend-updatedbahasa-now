import axios from "axios";

export const fetchLibrary = async () => {
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/publikasi/library-api`;
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_API_KEY_LIBRARY || "",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching library:", error);
    return null;
  }
};
