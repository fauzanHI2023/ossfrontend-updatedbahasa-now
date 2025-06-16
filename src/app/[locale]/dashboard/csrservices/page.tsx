"use client"
import React, { useState } from 'react';
import DashboardLayout from '@/components/ui/dashboard/DashboardLayout';
import { useSession } from 'next-auth/react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs-fe';
import { BookCheck, ListChecks, BookmarkX } from 'lucide-react';


const CsrServices: React.FC = () => {
  const [error, setError] = useState("");
  const { data: session, status, update }: any = useSession();
  const csrStatus = session?.user?.csr_status;

  const handleActivateCSR = async () => {
    setError(""); // Clear previous errors

    try {
      // Update backend
      const response = await fetch(
        `https://adminx.human-initiative.org/account-api/update/${session?.user?.phpDonorData[0].id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            csr_status: 1,
          }),
        }
      );

      const data = await response.json();
      // console.log("Response status:", response.status);
      // console.log("Response data:", data);

      if (!response.ok) {
        setError("Failed to update user data");
        return;
      }

      // Update session
      await update({
        csr_status: 1,
      });

    } catch (error) {
      setError("An error occurred while updating data");
    }
  };

  return (
    <DashboardLayout>
      <main className="flex min-h-screen flex-col px-16 py-12">
        <div className="box p-6 flex flex-col gap-y-5 border shadow rounded-xl dark:bg-slate-900 bg-white">
          {csrStatus === 0 || csrStatus === null ? (
            <div className="status-denied">
              <button onClick={handleActivateCSR}>
                Apakah anda ingin mengaktifkan fitur CSR?
              </button>
              {error && <p className="text-red-500">{error}</p>}
            </div>
          ) : (
            <div className="status-open">
              <p>Selamat Datang di CSR Services</p>
              <Tabs defaultValue="pending" className="w-full">
                <TabsList className="w-full flex flex-row">
                  <TabsTrigger value="pending" className="w-1/3">
                    <BookCheck className="mr-2 h-4 w-4" /> 
                  </TabsTrigger>
                  <TabsTrigger value="paid" className="w-1/3">
                    <ListChecks className="mr-2 h-4 w-4" /> Selesai
                  </TabsTrigger>
                  <TabsTrigger value="cancel" className="w-1/3">
                    <BookmarkX className="mr-2 h-4 w-4" /> Dibatalkan
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="pending" className="mt-3"></TabsContent>
                <TabsContent value="paid" className="mt-3"></TabsContent>
                <TabsContent value="pending" className="mt-3"></TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </main>
    </DashboardLayout>
  );
};

export default CsrServices;
