import axios from 'axios';

export const fetchPublicReports = async () => {
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/publikasi/public-report-api`;
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Authorization': process.env.NEXT_PUBLIC_API_KEY_PUBLIC_REPORT || ''
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching public reports:', error);
    return null;
  }
};
