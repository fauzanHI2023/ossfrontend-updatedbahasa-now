import axios from 'axios';

export interface PostContact {
  nama: string;
  email: string;
  feature: string;
  descriptions: string;
}

export const postContact = async (data: PostContact): Promise<any> => {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/contactus/form-contact-api/create`,
      formData,
      {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_API_KEY_CONTACTUS || '',
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error posting appointment', error);
    throw error;
  }
};
