'use client';

import { useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import Header from './Header/Header';
import { TodoProvider } from '@/context/TodoContext';

export default function DashboardShell({ children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <TodoProvider>
            <div className="flex min-h-screen relative">

                {/* Overlay for mobile */}
                {sidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                        onClick={() => setSidebarOpen(false)}
                    />
                )}
                <Header onMenuClick={() => setSidebarOpen(true)} />
                <Sidebar
                    isOpen={sidebarOpen}
                    onClose={() => setSidebarOpen(false)}
                />
                <main className="flex-1 bg-gray-50">
                    {children}
                </main>

            </div>
        </TodoProvider>
    );
}
