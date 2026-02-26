import React from 'react'
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import { Outlet } from 'react-router-dom';

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
