import React from 'react'
import DashboardLayout from '@/components/ui/dashboard/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, Baby, HandHelping, School } from 'lucide-react';

const Page = () => {
  return (
    <DashboardLayout>
      <main className="flex min-h-screen flex-col px-16 py-12">
        <div className="box p-6 flex flex-col gap-y-5 border shadow rounded-xl dark:bg-slate-900 bg-white">
          <h5 className="text-xl font-bold">Donasi Individu</h5>
          <Tabs defaultValue="disaster" className="w-full">
            <TabsList className="w-full flex flex-wrap">
              <TabsTrigger value="disaster" className="w-1/4"><Home className="mr-2 h-4 w-4"/> Disaster</TabsTrigger>
              <TabsTrigger value="children" className="w-1/4"><Baby className="mr-2 h-4 w-4"/> Children</TabsTrigger>
              <TabsTrigger value="empowerment" className="w-1/4"><HandHelping className="mr-2 h-4 w-4"/> Empowerment</TabsTrigger>
              <TabsTrigger value="infrastruktur" className="w-1/4"><School className="mr-2 h-4 w-4"/> Infrastruktur</TabsTrigger>
            </TabsList>
            <TabsContent value="disaster">Make changes to your account here.</TabsContent>
            <TabsContent value="children">Change your password here.</TabsContent>
            <TabsContent value="empowerment">Make changes to your account here.</TabsContent>
            <TabsContent value="infrastruktur">Change your password here.</TabsContent>
          </Tabs>
        </div>
      </main>
    </DashboardLayout>
  )
}

export default Page