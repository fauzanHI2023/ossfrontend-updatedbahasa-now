'use client';
import React, {useEffect, useState, useCallback} from 'react';
import DashboardLayout from '@/components/ui/dashboard/DashboardLayout';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs-fe';
import {BookCheck, ListChecks, BookmarkX} from 'lucide-react';
import {
  GetPendingTransaction,
  GetSuccessTransaction,
  GetCancelTransaction
} from '@/lib/auth-csr';
import {useSession} from 'next-auth/react';
import Image from 'next/image';
import {useTranslations} from 'next-intl';

interface Transaction {
  product_img: string;
  name: string;
  category_program: string;
  status_id: string;
  status: string;
  transaction_time: string;
  transaction_number: string;
  total_amount: string;
}

const RiwayatDonasi: React.FC = () => {
  const t = useTranslations();
  const session: any = useSession();
  const user: {
    id?: string;
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
    phpDonorData?: any[];
  } = session?.data?.user || {};
  const phpDonorId = user?.phpDonorData?.[0]?.id;
  const phpDonorGuid = user?.phpDonorData?.[0]?.guid;

  const [pendingTransactions, setPendingTransactions] = useState<Transaction[]>(
    []
  );
  const [successTransactions, setSuccessTransactions] = useState<Transaction[]>(
    []
  );
  const [cancelTransactions, setCancelTransactions] = useState<Transaction[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);

  const fetchTransactions = useCallback(
    async (
      fetchFunction: () => Promise<{
        success: boolean;
        transactions: Transaction[];
      }>,
      setFunction: React.Dispatch<React.SetStateAction<Transaction[]>>
    ) => {
      try {
        const response = await fetchFunction();
        if (response && response.transactions) {
          if (
            JSON.stringify(response.transactions) !==
            JSON.stringify(pendingTransactions)
          ) {
            setFunction(response.transactions);
          } else {
            console.log('No changes in transactions, skipping state update.');
          }
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (phpDonorId) {
      fetchTransactions(
        () => GetPendingTransaction(phpDonorId),
        setPendingTransactions
      );
      fetchTransactions(
        () => GetSuccessTransaction(phpDonorId),
        setSuccessTransactions
      );
      fetchTransactions(
        () => GetCancelTransaction(phpDonorId),
        setCancelTransactions
      );
    }
  }, [phpDonorId, fetchTransactions]);

  return (
    <DashboardLayout>
      <main className="flex min-h-screen flex-col px-16 py-12">
        <div className="box p-6 flex flex-col gap-y-5 rounded-3xl dark:bg-slate-900 bg-white">
          <h5 className="text-xl font-bold">History Donasi</h5>
          <Tabs defaultValue="pending" className="w-full">
            <TabsList className="w-full flex flex-row">
              <TabsTrigger value="pending" className="w-1/3">
                <BookCheck className="mr-2 h-4 w-4" /> Pending
              </TabsTrigger>
              <TabsTrigger value="confirmed" className="w-1/3">
                <ListChecks className="mr-2 h-4 w-4" /> Confirmed
              </TabsTrigger>
              <TabsTrigger value="expired" className="w-1/3">
                <BookmarkX className="mr-2 h-4 w-4" /> Expired
              </TabsTrigger>
            </TabsList>
            <TabsContent value="pending" className="mt-3">
              {loading ? (
                <p>Loading...</p>
              ) : pendingTransactions.length > 0 ? (
                <div className="flex flex-col gap-y-10 mt-6">
                  {pendingTransactions.map((transaction, index) => (
                    <div
                      key={index}
                      className="flex flex-row w-full gap-x-8 transaction-item"
                    >
                      <div className="flex w-1/12">
                        <Image
                          src={`https://cdnx.human-initiative.org/image/${transaction.product_img}`}
                          alt={transaction.name}
                          width={80}
                          height={80}
                          className="object-cover w-[80px] h-[80px] rounded-xl"
                        />
                      </div>
                      <div className="flex flex-col justify-center w-11/12 gap-y-4">
                        <div className="flex flex-row justify-between items-center">
                          <p className="w-3/5 font-semibold text-base text-gray-700 dark:text-white overflow-hidden h-auto">
                            {transaction.name}
                          </p>
                          <p className="text-sm px-4 py-2 text-sm rounded-3xl text-center dark:bg-slate-800 text-sky-500 font-bold">
                            pending
                          </p>
                        </div>
                        <div className="flex flex-row justify-between items-center w-full">
                          <p className="text-blue-500 capitalize">
                            {transaction.transaction_number}
                          </p>
                          <p className="text-stone-400">
                            {transaction.transaction_time}
                          </p>
                          <p className="text-stone-600 dark:text-slate-300">
                            {transaction.total_amount}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No pending transactions</p>
              )}
            </TabsContent>
            <TabsContent value="confirmed" className="mt-3">
              {loading ? (
                <p>Loading...</p>
              ) : successTransactions.length > 0 ? (
                <div className="flex flex-col gap-y-10 mt-6">
                  {successTransactions.map((transaction, index) => (
                    <div
                      key={index}
                      className="flex flex-row w-full gap-x-8 transaction-item"
                    >
                      <div className="flex w-1/12">
                        <Image
                          src={`https://cdnx.human-initiative.org/image/${transaction.product_img}`}
                          alt={transaction.name}
                          width={80}
                          height={80}
                          className="object-cover w-[80px] h-[80px] rounded-xl"
                        />
                      </div>
                      <div className="flex flex-col justify-center w-11/12 gap-y-4">
                        <div className="flex flex-row justify-between items-center">
                          <p className="w-3/5 font-semibold text-base text-gray-700 dark:text-white overflow-hidden h-auto">
                            {transaction.name}
                          </p>
                          <p className="text-sm px-4 py-2 text-sm rounded-3xl text-center dark:bg-slate-800 text-sky-500 font-bold">
                            success
                          </p>
                        </div>
                        <div className="flex flex-row justify-between items-center w-full">
                          <p className="text-blue-500 capitalize">
                            {transaction.transaction_number}
                          </p>
                          <p className="text-stone-400">
                            {transaction.transaction_time}
                          </p>
                          <p className="text-stone-600 dark:text-slate-300">
                            {transaction.total_amount}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No successful transactions</p>
              )}
            </TabsContent>
            <TabsContent value="expired">
              {loading ? (
                <p>Loading...</p>
              ) : cancelTransactions.length > 0 ? (
                <div className="flex flex-col gap-y-10 mt-6">
                  {cancelTransactions.map((transaction, index) => (
                    <div
                      key={index}
                      className="flex flex-row w-full gap-x-8 transaction-item"
                    >
                      <div className="flex w-1/12">
                        <Image
                          src={`https://cdnx.human-initiative.org/image/${transaction.product_img}`}
                          alt={transaction.name}
                          width={80}
                          height={80}
                          className="object-cover w-[80px] h-[80px] rounded-xl"
                        />
                      </div>
                      <div className="flex flex-col justify-center w-11/12 gap-y-4">
                        <div className="flex flex-row justify-between items-center">
                          <p className="w-3/5 font-semibold text-base text-gray-700 dark:text-white overflow-hidden">
                            {transaction.name}
                          </p>
                          <p className="text-sm px-4 py-2 text-sm rounded-3xl text-center dark:bg-slate-800 text-sky-500 font-bold">
                            cancel
                          </p>
                        </div>
                        <div className="flex flex-row justify-between items-center w-full">
                          <p className="text-blue-500 capitalize">
                            {transaction.transaction_number}
                          </p>
                          <p className="text-stone-400">
                            {transaction.transaction_time}
                          </p>
                          <p className="text-stone-600 dark:text-slate-300">
                            {transaction.total_amount}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No successful transactions</p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </DashboardLayout>
  );
};

export default RiwayatDonasi;
