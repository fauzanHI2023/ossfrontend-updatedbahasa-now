import axios from "axios";

export const fetchVacancy = async () => {
    const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/vacancies/vacancy-apis`;
    try {
        const response = await axios.get(apiUrl, {
            headers: {
                Authorization: process.env.NEXT_PUBLIC_API_KEY_VACANCY || "",
            },
        });
        return response.data;
    } catch (error) {
        console.log("Error fetching vacancy:", error);
        return null;
    }
}