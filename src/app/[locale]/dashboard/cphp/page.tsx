import React from 'react';
import DashboardLayout from '@/components/ui/dashboard/DashboardLayout'
import { 
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs-fe";
import { BookCheck, ListChecks, BookmarkX } from "lucide-react";

const CPHP: React.FC = () => {
    return (
        <DashboardLayout>
            <main className="flex min-h-screen flex-col px-16 py-12">
                <div className="box p-6 flex flex-col gap-y-5 border shadow-xl rounded-xl dark:bg-slate-900 bg-white">
                    <h5 className="text-xl font-bold">History CPHP</h5> 
                    <Tabs defaultValue="reject" className="w-full">
                        <TabsList className="w-full flex flex-row">
                            <TabsTrigger value="reject" className="w-1/3">
                                <BookCheck className="mr-2 h-4 w-4" /> Reject
                            </TabsTrigger>
                            <TabsTrigger value="accept" className="w-1/3">
                                <ListChecks className="mr-2 h-4 w-4" /> Accept
                            </TabsTrigger>
                            <TabsTrigger value="revision" className="w-1/3">
                                <ListChecks className="mr-2 h-4 w-4" /> Revision
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="reject" className="mt-3">
                            <div>
                                <h6>Reject CPHP</h6>
                            </div>
                        </TabsContent>
                        <TabsContent value="accept" className="mt-3">
                            <div>
                                <h6>Accept CPHP</h6>
                            </div>
                        </TabsContent>
                        <TabsContent value="revision" className="mt-3">
                            <div>
                                <h6>Revision CPHP</h6>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div> 
            </main>
        </DashboardLayout>
    );
};

export default CPHP;