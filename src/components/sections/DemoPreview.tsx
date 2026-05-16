"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Activity, Bell, Search, User } from "lucide-react";

export const DemoPreview = () => {
    return (
        <section className="py-24 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-accent/5 blur-[150px] -z-10" />

            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Powerful dashboard, <span className="text-gradient">Simple control</span>
                    </h2>
                    <p className="text-text-secondary max-w-2xl mx-auto">
                        A sneak peek into where the magic happens. Manage projects, monitor generation, and download exports.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="relative max-w-5xl mx-auto shadow-2xl rounded-3xl overflow-hidden border border-white/10"
                >
                    {/* Mock Dashboard UI */}
                    <div className="bg-dark/80 backdrop-blur-2xl">
                        {/* Header */}
                        <div className="border-b border-white/5 p-4 flex items-center justify-between">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            </div>
                            <div className="flex items-center gap-4 bg-white/5 px-4 py-1.5 rounded-lg border border-white/10">
                                <Search className="w-4 h-4 text-text-muted" />
                                <span className="text-sm text-text-muted">Search projects...</span>
                            </div>
                            <div className="flex gap-4">
                                <Bell className="w-5 h-5 text-text-secondary" />
                                <User className="w-5 h-5 text-text-secondary" />
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8">
                            <div className="grid grid-cols-3 gap-6">
                                <div className="col-span-2 space-y-6">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-2xl font-bold text-white">Project Dashboard</h3>
                                        <div className="px-3 py-1 bg-primary/20 text-primary text-xs rounded-full border border-primary/30">Active AI Sync</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Card hover={false} className="py-4 px-6 border-white/5 bg-white/5">
                                            <p className="text-xs text-text-secondary uppercase tracking-wider mb-1">Architecture Tasks</p>
                                            <p className="text-2xl font-bold text-white">128</p>
                                        </Card>
                                        <Card hover={false} className="py-4 px-6 border-white/5 bg-white/5">
                                            <p className="text-xs text-text-secondary uppercase tracking-wider mb-1">API Endpoints</p>
                                            <p className="text-2xl font-bold text-white">34</p>
                                        </Card>
                                    </div>
                                    <div className="h-40 bg-white/5 rounded-2xl border border-white/5 p-6 relative overflow-hidden">
                                        <Activity className="absolute bottom-0 left-0 w-full h-20 text-primary/20" />
                                        <p className="text-sm font-medium text-white mb-2">Resource Utilization</p>
                                        <div className="w-full h-2 bg-white/10 rounded-full">
                                            <motion.div
                                                className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: "75%" }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <p className="text-sm font-bold text-white uppercase tracking-widest">Recent Exports</p>
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="p-3 bg-white/5 border border-white/5 rounded-xl flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                                                <span className="text-accent text-xs font-bold font-mono">ZIP</span>
                                            </div>
                                            <div>
                                                <p className="text-xs font-medium text-white">Project_Alpha_{i}.zip</p>
                                                <p className="text-[10px] text-text-muted">2 mins ago</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
