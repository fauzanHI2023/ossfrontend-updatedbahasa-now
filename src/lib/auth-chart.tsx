export async function GenderChartApi() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/chart-api/get-gender-chart`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
    
        return data;
    } catch (error) {
        throw new Error('Data tidak ada');
    }
}

export async function AgeChartApi() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/chart-api/get-age-chart`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
    
        return data;
    } catch (error) {
        throw new Error('Data tidak ada');
    }
}
