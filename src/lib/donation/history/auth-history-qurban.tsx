import axios from 'axios';

const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/donation/history-donation-qurban-api/get-by-donor-guid`;
const apiKey = process.env.NEXT_PUBLIC_API_KEY_DONATION || '';

export const fetchQurbanHistoryByGuid = async (donorGuid: string) => {
  try {
    const response = await axios.get(`${apiUrl}?donor_guid=${donorGuid}`, {
      headers: {
        Authorization: apiKey
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching campaign for ${donorGuid}:`, error);
    return null;
  }
};
