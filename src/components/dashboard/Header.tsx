"use client";

import React from "react";
import { Search, Bell, Menu, User } from "lucide-react";
import { useUI } from "@/hooks/useUI";
import { useAuth } from "@/hooks/useAuth";

export const Header = () => {
    const { toggleSidebar } = useUI();
    const { user } = useAuth();

    return (
        <header className="h-20 border-b border-white/5 bg-black/30 backdrop-blur-md px-8 flex items-center justify-between sticky top-0 z-40">
            <div className="flex items-center gap-4 flex-grow max-w-xl">
                <button
                    onClick={toggleSidebar}
                    className="p-2 text-text-secondary hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                    <Menu className="w-5 h-5" />
                </button>

                <div className="relative group w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Search projects, architectures, or files..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-2.5 text-sm outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all"
                    />
                </div>
            </div>

            <div className="flex items-center gap-6">
                <button className="relative p-2 text-text-secondary hover:text-white hover:bg-white/5 rounded-lg transition-colors group">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse" />
                </button>

                <div className="flex items-center gap-3 pl-6 border-l border-white/10 group cursor-pointer">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-semibold text-white leading-none">{user?.name || "Demo User"}</p>
                        <p className="text-[10px] text-text-muted mt-1 uppercase tracking-widest">Pro Member</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center font-bold text-white shadow-lg overflow-hidden border border-white/10">
                        {user?.name?.[0] || <User className="w-5 h-5" />}
                    </div>
                </div>
            </div>
        </header>
    );
};
