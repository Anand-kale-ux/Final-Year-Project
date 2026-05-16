import React from "react";
import Link from "next/link";
import { Cpu } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="bg-black border-t border-white/5 py-12">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-primary" />
                        <span className="text-lg font-bold text-white">AI Project Architect</span>
                    </div>

                    <div className="flex gap-8 text-sm text-text-secondary">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link>
                    </div>

                    <p className="text-sm text-text-muted">
                        &copy; {new Date().getFullYear()} AI Project Architect. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};
