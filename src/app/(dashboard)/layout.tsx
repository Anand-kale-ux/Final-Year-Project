"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { Header } from "@/components/dashboard/Header";
import { useAuth } from "@/hooks/useAuth";
import { useUI } from "@/hooks/useUI";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated } = useAuth();
    const { sidebarOpen } = useUI();
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            // router.push("/login"); // Commented out for demo purposes so it stays on dashboard
        }
    }, [isAuthenticated, router]);

    return (
        <div className="h-screen bg-black flex overflow-hidden">
            <Sidebar />
            <div
                className={cn(
                    "transition-all duration-300 flex-1 flex flex-col h-screen min-w-0",
                    sidebarOpen ? "ml-64" : "ml-20"
                )}
            >
                <Header />
                <main className="flex-1 overflow-y-auto overflow-x-hidden p-8 relative">
                    {children}
                </main>
            </div>
        </div>
    );
}
