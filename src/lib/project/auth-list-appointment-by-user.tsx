import axios from 'axios';

interface ListAppointment {
  id: number;
  proposal_id: number;
  date: string;
  tempat: string;
  notes: string;
  created_at: string;
  user_id: string;
  end_date: string;
  status_id: number;
  status: string;
  program_name: string;
}

export const fetchListAppointmentbyUser = async (
  userId: string
): Promise<ListAppointment[]> => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/project/appoinment/appoinment-api/get-appointment-by-user?user_id=${userId}`,
      {
        headers: {
          Authorization: process.env.NEXT_PUBLIC_API_KEY_APPOINTMENT || ''
        }
      }
    );
    return response.data.data; // ⬅️ ambil array-nya langsung
  } catch (error) {
    console.log('Error data Appointment', error);
    return [];
  }
};
