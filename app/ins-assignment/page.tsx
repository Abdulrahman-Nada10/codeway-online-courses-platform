'use client';

import React, { useState } from 'react';
import { PageHeader } from './components/PageHeader';
import { SummaryCards } from './components/SummaryCards';
import { FilterBar } from './components/FilterBar';
import { AssignmentsTable } from './components/AssignmentsTable';
import { PaginationControls } from './components/PaginationControls';
import { assignments } from './components/data';
import Sidebar from "../components/ui/SidebarInstructor";
import Navbar from "../components/NavbarInstructor";

export default function AssignmentsPage() {
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    return (
        <>
            <Sidebar collapsed={isSidebarCollapsed} onCollapse={setIsSidebarCollapsed} />
            <div className={`min-h-screen bg-[#FAFAFA] flex flex-col transition-all duration-200 ease-in-out ${isSidebarCollapsed ? 'md:mr-[72px]' : 'md:mr-64'}`}>
                <Navbar />
                <main dir="rtl" className="flex-1 p-4 sm:p-6 lg:p-8 font-sans">
                    <PageHeader />
                    <SummaryCards />
                    <FilterBar />
                    <AssignmentsTable data={assignments} />
                    <PaginationControls />
                </main>
            </div>
        </>
    );
}
