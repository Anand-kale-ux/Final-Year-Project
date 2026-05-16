"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Cpu, Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useAuthStore } from "@/lib/store";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const router = useRouter();
    const setUser = useAuthStore((state) => state.setUser);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Simulate API call
        setTimeout(() => {
            if (email && password) {
                setUser({ id: "1", name: "Demo User", email });
                router.push("/dashboard");
            } else {
                setError("Please enter both email and password.");
            }
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-6 bg-black relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#8B5CF61A,transparent_50%)] -z-10" />

            <Card className="w-full max-w-md p-8 bg-white/5 border-white/10 shadow-2xl relative">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 mb-4 group justify-center">
                        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                            <Cpu className="w-6 h-6 text-primary" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-white">AI Project Architect</span>
                    </Link>
                    <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
                    <p className="text-text-secondary text-sm">Enter your credentials to access your workspace</p>
                </div>

                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm mb-6"
                    >
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative group">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-white placeholder:text-text-muted outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all font-medium"
                            required
                        />
                    </div>

                    <div className="relative group">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-primary transition-colors" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-10 py-3 text-white placeholder:text-text-muted outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all font-medium"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-white transition-colors"
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>

                    <Button
                        type="submit"
                        isLoading={isLoading}
                        className="w-full py-6"
                    >
                        Sign In
                    </Button>
                </form>

                <p className="mt-8 text-center text-sm text-text-secondary">
                    Don&apos;t have an account?{" "}
                    <Link href="/signup" className="text-primary font-bold hover:underline">
                        Create Account
                    </Link>
                </p>
            </Card>
        </div>
    );
}
