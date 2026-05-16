"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    PlusSquare,
    Files,
    GitCompare,
    Settings,
    LogOut,
    Cpu
} from "lucide-react";
import { useUI } from "@/hooks/useUI";
import { useAuth } from "@/hooks/useAuth";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
    { icon: PlusSquare, label: "Create Project", href: "/dashboard/create-project" },
    { icon: Files, label: "My Projects", href: "/dashboard/projects" },
    { icon: GitCompare, label: "Compare Projects", href: "/dashboard/compare" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export const Sidebar = () => {
    const pathname = usePathname();
    const { sidebarOpen } = useUI();
    const { logout } = useAuth();

    return (
        <aside
            className={cn(
                "fixed left-0 top-0 h-screen bg-dark-deep border-r border-white/5 transition-all duration-300 z-50 flex flex-col",
                sidebarOpen ? "w-64" : "w-20"
            )}
        >
            <div className="p-6">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors shrink-0">
                        <Cpu className="w-6 h-6 text-primary" />
                    </div>
                    {sidebarOpen && (
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="font-bold text-white whitespace-nowrap"
                        >
                            Architect <span className="text-primary">AI</span>
                        </motion.span>
                    )}
                </Link>
            </div>

            <nav className="flex-grow px-3 space-y-1 mt-4">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.href} href={item.href}>
                            <motion.div
                                whileHover={{ x: 4 }}
                                className={cn(
                                    "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group",
                                    isActive
                                        ? "bg-primary/10 text-primary border border-primary/20"
                                        : "text-text-secondary hover:text-white hover:bg-white/5"
                                )}
                            >
                                <item.icon className={cn("w-5 h-5 shrink-0", isActive && "text-primary")} />
                                {sidebarOpen && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="text-sm font-medium"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                                {isActive && sidebarOpen && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="ml-auto w-1 h-4 bg-primary rounded-full"
                                    />
                                )}
                            </motion.div>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-white/5">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-text-secondary hover:text-red-400 hover:bg-red-400/5 transition-all w-full group"
                >
                    <LogOut className="w-5 h-5 shrink-0" />
                    {sidebarOpen && <span className="text-sm font-medium">Log Out</span>}
                </button>
            </div>
        </aside>
    );
};
