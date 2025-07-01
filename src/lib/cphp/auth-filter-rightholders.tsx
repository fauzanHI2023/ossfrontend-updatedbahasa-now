import axios from 'axios';

interface FilterRightholder {
  program_name: string;
  form_name: string;
  applicant_no: string;
  applicant_name: string;
  applicant_email: string;
  applicant_hp_no: string;
  status: string;
  created_at: string;
}

const statusMapping: Record<number, string> = {
  9: 'New',
  10: 'Verified',
  11: 'Revision',
  12: 'Rejected',
  13: 'Proposed',
  14: 'Donated'
};

export const fetchFilterRightholders = async (
  status: number,
  userId: string
): Promise<FilterRightholder[]> => {
  if (!statusMapping[status]) {
    console.error('Invalid status provided');
    return [];
  }

  const apiUrl = `${process.env.NEXT_PUBLIC_API_BACKEND_TWO}/api/cphp/application-list?status=${status}&user_id=${userId}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data.success ? response.data.data : [];
  } catch (error) {
    console.error('Error fetching campaign', error);
    return [];
  }
};
