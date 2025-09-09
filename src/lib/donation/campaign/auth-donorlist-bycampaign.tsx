import axios from 'axios';

const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/donation/donor-api/get-donor-by-campaign`;
const apiUrlTop = `${process.env.NEXT_PUBLIC_BASE_API_URL}/donation/donor-api/get-donor-by-campaign-top-nominal`;
const apiKey = process.env.NEXT_PUBLIC_API_KEEY_DONORLIST || '';

export const fetchdonorList = async (idCampaign: number) => {
  try {
    const response = await axios.get(`${apiUrl}?campaign_id=${idCampaign}`, {
      headers: {
        Authorization: apiKey
      }
    });

    // Pastikan response sesuai format API
    if (response.data?.success && Array.isArray(response.data.transactions)) {
      return response.data.transactions; // langsung return array transaksi
    } else {
      console.warn(
        `Invalid API response for campaign_id ${idCampaign}`,
        response.data
      );
      return [];
    }
  } catch (error) {
    console.error(`Error fetching donor list for ${idCampaign}:`, error);
    return [];
  }
};

export const fetchdonorListTopNominal = async (idCampaign: number) => {
  try {
    const response = await axios.get(`${apiUrlTop}?campaign_id=${idCampaign}`, {
      headers: {
        Authorization: apiKey
      }
    });

    // Pastikan response sesuai format API
    if (response.data?.success && Array.isArray(response.data.transactions)) {
      return response.data.transactions; // langsung return array transaksi
    } else {
      console.warn(
        `Invalid API response for campaign_id ${idCampaign}`,
        response.data
      );
      return [];
    }
  } catch (error) {
    console.error(`Error fetching donor list for ${idCampaign}:`, error);
    return [];
  }
};
