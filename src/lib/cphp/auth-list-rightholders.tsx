import axios from "axios";

interface Rightholder {
  id: string;
  form_name: string;
  form_description: string;
  link: string;
  end_datetime: string;
}

export const fetchRightholders = async (): Promise<Rightholder[]> => {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_BACKEND_TWO}/oss/cphp/form-list`;
  try {
    const response = await axios.get(apiUrl);
    return response.data.data;
  } catch (error) {
    console.log("Error fetching campaign", error);
    return [];
  }
};
