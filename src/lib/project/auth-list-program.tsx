import axios from "axios";

interface ProjectList {
  id: string;
  title: string;
  program_name: string;
  project_description: string;
  project_goal: string;
  project_scope: string;
  currency: string;
  amount: number;
  quantity: number;
}

export const fetchListProject = async (): Promise<ProjectList[]> => {
  const apiUrl = `${process.env.NEXT_PUBLIC_API_BACKEND_TWO}/oss/proposal/list`;
  try {
    const response = await axios.get(apiUrl);
    return response.data.data;
  } catch (error) {
    console.log("Error data Project", error);
    return [];
  }
};
