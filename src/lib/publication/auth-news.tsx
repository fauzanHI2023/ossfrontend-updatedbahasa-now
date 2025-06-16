import axios from 'axios';

export const fetchNews = async () => {
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/publikasi/posts-api`;
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_API_KEY_NEWS || ''
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching news posts:', error);
    return null;
  }
};

export const fetchNewsByHashtagProgram = async (hashtagProgram: string) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/publikasi/posts-api/get-post-by-program?hashtag_program=${hashtagProgram}`,
      {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_API_KEY_NEWS || ''
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching campaign for ${hashtagProgram}:`, error);
    return null;
  }
};

export const fetchChildrenNews = async () =>
  fetchNewsByHashtagProgram('children');
export const fetchDisasterNews = async () =>
  fetchNewsByHashtagProgram('disaster');
export const fetchEmpowermentNews = async () =>
  fetchNewsByHashtagProgram('empowerment');
export const fetchInfrastructureNews = async () =>
  fetchNewsByHashtagProgram('infrastructure');
