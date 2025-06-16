export async function DonateIndividuDisaster() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/product/get-individu-disaster`, {
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

export async function DonateIndividuChildren() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/product/get-individu-children`, {
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

export async function DonateIndividuEmpowerment() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/product/get-individu-empowerment`, {
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

export async function DonateIndividuInfrastructure() {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/product/get-individu-infrastructure`, {
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

interface Product {
  product_id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  created_at: string;
  updated_at: string;
  image: string | null;
  donasi_type: string;
  category_program: string;
  product_img: string;
  slug: string;
}

interface ProductResponse {
  status: string;
  data: {
      product: Product;
      transactionCount: number;
      totalGrossAmount: number;
  };
}

export async function getProductBySlug(slug: string): Promise<ProductResponse> {
  try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/product/get-product-by-slug?slug=${slug}`, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
          },
      });
      const data = await response.json();

      if (response.ok) {
          return data;
      } else {
          throw new Error(data.message || 'Failed to fetch product data');
      }
  } catch (error) {
      throw new Error('Data tidak ada');
  }
}

export type { Product, ProductResponse }; // Exporting types for use in other files





