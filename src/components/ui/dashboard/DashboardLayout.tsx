'use client';
import React from 'react';
import Sidebar from '../dashboard/Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({children}) => {
  return (
    <div
      className={`dark:bg-slate-950 bg-[#eff3f6] relative top-0 flex min-h-screen flex-row justify-center px-12 py-24`}
    >
      <Sidebar />
      <main className="w-3/4">{children}</main>
    </div>
  );
};

export default DashboardLayout;
