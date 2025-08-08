import axios from 'axios';

const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/project/programfollowed/program-followed-api/get-by-donor-guid`;
const apiKey = process.env.NEXT_PUBLIC_KEY_PROGRAMFOLLOWED || '';

export const fetchProgramFollowedByGuid = async (donorGuid: string) => {
  try {
    const response = await axios.get(`${apiUrl}?donor_id=${donorGuid}`, {
      headers: {
        Authorization: apiKey
      }
    });
    return response.data.data ?? [];
  } catch (error) {
    console.error(`Error fetching program followed for ${donorGuid}:`, error);
    return null;
  }
};
