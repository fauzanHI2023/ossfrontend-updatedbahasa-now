'use client';
import React from 'react';
import Sidebar from '../dashboard/Sidebar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({children}) => {
  return (
    <div
      className={`dark:bg-slate-950 bg-gradient-to-b to-[#f8fcff] from-sky-50 relative top-0 flex min-h-screen flex-row justify-center sm:px-12 sm:py-24 px-4 py-10`}
    >
      <Sidebar />
      <main className="sm:w-3/4 w-full">{children}</main>
    </div>
  );
};

export default DashboardLayout;
