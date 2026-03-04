import React from 'react'
import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'

export const AppLayout: React.FC = () => {
  return (
    <div className="flex h-screen bg-[#FDFCFB] dark:bg-slate-950 overflow-hidden">
      <Sidebar />
      <main className="flex-1 ml-[240px] overflow-y-auto transition-all duration-300" id="main-content">
        <div className="min-h-screen p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
