import axios from "axios";

// Menambahkan parameter amount pada fungsi inputCart
export const inputCart = async (
  cookies_id: string,
  campaign_id: number,
  quantity: number,
  amount: number // Menambahkan parameter amount
) => {
  const apiUrl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/donation/transaction-cart`;

  // Membuat instance FormData untuk mengirim data
  const formData = new FormData();
  formData.append("cookies_id", cookies_id);
  formData.append("campaign_id", campaign_id.toString()); // Ensure it's a string
  formData.append("quantity", quantity.toString()); // Ensure it's a string
  formData.append("amount", amount.toString()); // Ensure it's a string

  try {
    const response = await axios.post(apiUrl, formData, {
      headers: {
        "Authorization": `${process.env.NEXT_PUBLIC_API_KEY_CART || ""}`,
        "Content-Type": "multipart/form-data", // Content-Type untuk form data
      },
    });

    // Cek apakah request berhasil dan tangani responsenya
    if (response.status === 200) {
      console.log("Data successfully sent to the API");
      return response.data;  // Menampilkan data hasil respons API
    } else {
      console.error("Failed to send data", response);
      return null;
    }
  } catch (error) {
    console.error("Error while sending request to API", error);
    return null;
  }
};
