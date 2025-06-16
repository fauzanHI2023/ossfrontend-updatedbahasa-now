"use client";

import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const NotificationPage: React.FC = () => {
    const searchParams = useSearchParams();
    const orderId = searchParams?.get('order_id') || ''; // Menggunakan fallback agar tidak null
    const [transactionDetails, setTransactionDetails] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (orderId) {
            const fetchTransactionDetails = async () => {
                try {
                    const response = await fetch(`https://adminx.human-initiative.org/donation/create-transaction-api/get-transaction-details?order_id=${orderId}`);
                    const data = await response.json();
                    if (data.status === 'success') {
                        setTransactionDetails(data.data);
                    } else {
                        setError(data.message);
                    }
                } catch (error) {
                    setError('Error fetching transaction details');
                } finally {
                    setLoading(false);
                }
            };

            fetchTransactionDetails();
        } else {
            setLoading(false); // Hentikan loading jika orderId tidak ada
            setError('Order ID is missing');
        }
    }, [orderId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24 dark:bg-background bg-slate-100">
            <div className="h-full dark:bg-slate-900 bg-white border h-96 w-2/5 py-4 px-6 shadow rounded-xl mt-12">
                {transactionDetails && (
                    <>  
                        <div className="flex flex-row justify-between mb-3">
                            <h1 className="text-xl font-bold dark:text-blue-100 text-blue-900">Transaction Details</h1>
                        </div>
                        <div className="flex flex-col gap-y-4 mb-6">
                            <div className="flex flex-row">
                              <span className="mr-2 w-40 font-base dark:text-white text-zinc-800">
                                Nama
                              </span>
                              <span>{transactionDetails.full_name}</span>
                            </div>
                            <div className="flex flex-row">
                              <span className="mr-2 w-40 font-base dark:text-white text-zinc-800">
                                Order ID
                              </span>
                              <span>{transactionDetails.order_id}</span>
                            </div>
                            <div className="flex flex-row">
                              <span className="mr-2 w-40 font-base dark:text-white text-zinc-800">
                                Status
                              </span>
                              <span>{transactionDetails.status}</span>
                            </div>
                            <div className="flex flex-row">
                              <span className="mr-2 w-40 font-base dark:text-white text-zinc-800">
                                Payment Method
                              </span>
                              <span>{transactionDetails.payment_type}</span>
                            </div>
                        </div>
                        <div className="flex flex-row justify-between mb-3">
                            <h1 className="text-xl font-bold dark:text-blue-100 text-blue-900">Produk</h1>
                        </div>
                        <ul>
                            {transactionDetails.items.map((item: any, index: number) => (
                                <div key={index} className="flex flex-col gap-y-4">
                                    <div className="flex flex-row justify-between">
                                        <span className="mr-2 w-60 font-base dark:text-white text-zinc-800">
                                            {item.campaign_name}
                                        </span>
                                        <span>{item.amount}</span>
                                    </div>
                                </div>
                            ))}
                            <div className="flex flex-row justify-between">
                                <span className="mr-2 w-40 font-base dark:text-white text-zinc-800">
                                    Total
                                </span>
                                <span>{transactionDetails.gross_amount}</span>
                            </div>
                        </ul>
                    </>
                )}
            </div>
        </main>
    );
};

export default NotificationPage;
