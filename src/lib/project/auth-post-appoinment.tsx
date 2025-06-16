import axios from "axios";

interface PostAppointment {
  user_id: string;
  proposal_id: string;
  tempat: string;
  date: string;
  notes: string;
  created_at: string;
}

export const postAppointment = async (data: PostAppointment): Promise<any> => {
  try {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_API_URL}/project/appoinment/appoinment-api/create`, formData, {
      headers: {
        Authorization: process.env.NEXT_PUBLIC_API_KEY_APPOINTMENT || "",
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error posting appointment", error);
    throw error;
  }
};
