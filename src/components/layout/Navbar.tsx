"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Cpu } from "lucide-react";

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-4 bg-black/50 backdrop-blur-lg border-b border-white/10" : "py-6 bg-transparent"
                }`}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <Cpu className="w-6 h-6 text-primary" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white">
                        AI Project <span className="text-primary">Architect</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link href="#features" className="text-sm font-medium text-text-secondary hover:text-white transition-colors">
                        Features
                    </Link>
                    <Link href="#about" className="text-sm font-medium text-text-secondary hover:text-white transition-colors">
                        About
                    </Link>
                    <Link href="#contact" className="text-sm font-medium text-text-secondary hover:text-white transition-colors">
                        Contact
                    </Link>
                    <Link href="/login">
                        <Button variant="secondary" size="sm">Log In</Button>
                    </Link>
                    <Link href="/signup">
                        <Button variant="primary" size="sm">Get Started</Button>
                    </Link>
                </div>

                {/* Mobile toggle would go here */}
            </div>
        </nav>
    );
};
