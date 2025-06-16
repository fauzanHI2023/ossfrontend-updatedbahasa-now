import axios from 'axios';

export const fetchSituationReports = async () => {
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/publikasi/situation-report-api`;
  console.log("API URL: ", apiUrl);
  console.log("API Key: ", process.env.NEXT_PUBLIC_API_KEY_SITUATION_REPORT);
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Authorization': process.env.NEXT_PUBLIC_API_KEY_SITUATION_REPORT || ''
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching public reports:', error);
    return null;
  }
};
