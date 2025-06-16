import axios from "axios";

export const fetchConfirmStatus = async (order_id: string) => {
    // Menggunakan query parameter untuk mengirim order_id
    const apiUrl = `https://adminx.human-initiative.org/donation/confirmation-payment-apis/confirm-status?order_id=${order_id}`;

    try {
        const response = await axios.post(apiUrl, {}, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        return {
            success: true,
            data: response.data,
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                success: false,
                message: error.response?.data?.message || "Terjadi kesalahan saat menghubungi API",
                error: error.toJSON(),
            };
        }
        return {
            success: false,
            message: "Unexpected error occurred",
            error: error,
        };
    }
};
