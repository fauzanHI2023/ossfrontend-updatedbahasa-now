import axios from 'axios';

const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/donation/campaign-api/get-program`;
const apiKey = process.env.NEXT_PUBLIC_API_KEY_CAMPAIGN || '';

export const fetchCampaign = async () => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/donation/campaign-api`,
      {
        headers: {
          Authorization: apiKey
        }
      }
    );
    const data = response.data;

    // Sort data by id descending (dari terbesar)
    if (Array.isArray(data)) {
      data.sort((a, b) => b.id - a.id);
    }

    return data;
  } catch (error) {
    console.error('Error fetching campaign', error);
    return null;
  }
};

export const fetchCampaignByCoreProgram = async (coreProgram: string) => {
  try {
    const response = await axios.get(`${apiUrl}?core_program=${coreProgram}`, {
      headers: {
        Authorization: apiKey
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching campaign for ${coreProgram}:`, error);
    return null;
  }
};

export const fetchChildrenCampaigns = async () =>
  fetchCampaignByCoreProgram('children');
export const fetchDisasterCampaigns = async () =>
  fetchCampaignByCoreProgram('disaster');
export const fetchEmpowermentCampaigns = async () =>
  fetchCampaignByCoreProgram('empowerment');
export const fetchInfrastructureCampaigns = async () =>
  fetchCampaignByCoreProgram('infrastructure');
