export async function productDonate() {
    try {
        const response = await fetch('https://adminx.human-initiative.org/product/list', {
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