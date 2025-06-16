import axios from "axios";

export const fetchEvents = async () => {
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/publikasi/event-api`;
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_API_KEY_EVENTS || "",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching public reports:", error);
    return null;
  }
};
