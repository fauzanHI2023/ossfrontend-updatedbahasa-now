import axios from "axios";

export const fetchMediaRelease = async () => {
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/publikasi/media-release-api`;
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_API_KEY_MEDIARELEASE || "",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching public reports:", error);
    return null;
  }
};
