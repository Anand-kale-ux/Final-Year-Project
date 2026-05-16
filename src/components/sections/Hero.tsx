"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Sparkles } from "lucide-react";

export const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-primary/20 to-transparent blur-[120px] -z-10" />
            <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-accent/20 blur-[100px] -z-10 animate-pulse" />

            <div className="container mx-auto px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8"
                >
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary-vibrant">Project Architect v2.0 is now live</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6"
                >
                    Turn Ideas into Full <br />
                    <span className="text-gradient">Software Architecture</span> in Seconds
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-10"
                >
                    AI-powered system that generates comprehensive architecture, clean code, and cloud-ready deployment plans instantly.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <Button size="lg" className="w-full sm:w-auto">Start Building Now</Button>
                    <Button variant="secondary" size="lg" className="w-full sm:w-auto">View Demo</Button>
                </motion.div>

                {/* Floating Animation Elements */}
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="hidden lg:block absolute left-20 top-40 w-16 h-16 bg-primary/10 rounded-2xl border border-primary/20 backdrop-blur-md"
                />
                <motion.div
                    animate={{
                        y: [0, 20, 0],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="hidden lg:block absolute right-20 top-60 w-12 h-12 bg-accent/10 rounded-full border border-accent/20 backdrop-blur-md"
                />
            </div>
        </section>
    );
};
