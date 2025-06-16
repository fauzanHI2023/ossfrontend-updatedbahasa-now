// Import date-fns for date formatting and Intl for currency formatting
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";

export async function GetPendingTransaction(userId: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/csr-api/get-pending-transaction?id=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    // Format the data
    const formattedData = data.data.map((transactionData: any) => {
      const transaction = transactionData.transaction || {};
      const item = transactionData.items[0] || {}; // first item
      const product = item.product || {};

      return {
        product_img: product.campaign_img,
        name: product.campaign_name,
        status: transaction.status_id,
        transaction_time: format(new Date(transaction.transaction_date), "dd MMMM yyyy", { locale: localeId }),
        transaction_number: transaction.transaction_no,
        total_amount: new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(transaction.total_amount),
      };
    });

    return { success: data.success, transactions: formattedData };
  } catch (error) {
    throw new Error("Data tidak ada");
  }
}

export async function GetSuccessTransaction(userId: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/csr-api/get-success-transaction?id=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    // Format the data
    const formattedData = data.data.map((transactionData: any) => {
      const transaction = transactionData.transaction;
      const item = transactionData.items[0]; // first item
      const product = item.product;

      return {
        product_img: product.campaign_img,
        name: product.campaign_name,
        status: transaction.status_id,
        transaction_time: format(new Date(transaction.transaction_date), "dd MMMM yyyy", { locale: localeId }),
        transaction_number: transaction.transaction_no,
        total_amount: new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(transaction.total_amount),
      };
    });

    return { success: data.success, transactions: formattedData };
  } catch (error) {
    throw new Error("Data tidak ada");
  }
}

export async function GetCancelTransaction(userId: string) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/csr-api/get-cancel-transaction?id=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    // Format the data
    const formattedData = data.data.map((transactionData: any) => {
      const transaction = transactionData.transaction;
      const item = transactionData.items[0]; // first item
      const product = item.product;

      return {
        product_img: product.campaign_img,
        name: product.campaign_name,
        status: transaction.status_id === "6" ? "Belum Bayar" : "Berhasil",
        transaction_number: transaction.transaction_no,
        transaction_time: format(new Date(transaction.transaction_date), "dd MMMM yyyy", { locale: localeId }),
        total_amount: new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(transaction.total_amount),
      };
    });

    return { success: data.success, transactions: formattedData };
  } catch (error) {
    throw new Error("Data tidak ada");
  }
}
