"use client";

import React, { useState } from "react";
import { Bars3Icon } from "@heroicons/react/20/solid";
import Sidebar from "@/components/sidebar/DesktopSidebar.jsx";
import TopBar from "@/components/topbar/TopBar.jsx";
import Profile from "../topbar/Profile";

function DashboardLayout({ session, children }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <>
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} session={JSON.parse(session)} />
            <div className="fixed top-0 z-30 flex h-16 w-full shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                <button
                    type="button"
                    className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                    onClick={() => setSidebarOpen((c) => !c)}
                >
                    <span className="sr-only">Open sidebar</span>
                    <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Separator */}
                <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

                <TopBar>
                    <Profile session={JSON.parse(session)} />
                </TopBar>
            </div>
            <div className="lg:pl-60">
                <main className="min-h-screen bg-slate-50 pb-10 pt-24">
                    <div className="px-4 sm:px-6">{children}</div>
                </main>
            </div>
        </>
    );
}

export default DashboardLayout;
