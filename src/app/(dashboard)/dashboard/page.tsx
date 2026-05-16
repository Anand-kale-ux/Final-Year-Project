"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import {
    Plus,
    Search,
    Layout,
    ExternalLink,
    MoreHorizontal,
    Clock,
    Code2,
    Database,
    Cpu
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const recentProjects = [
    {
        name: "Architect_v2_Frontend",
        updated: "2 hours ago",
        stack: "Next.js, Tailwind, Zustand",
        status: "Generated",
        color: "from-purple-500/20 to-blue-500/20",
    },
    {
        name: "SaaS_Backend_API",
        updated: "5 hours ago",
        stack: "Node.js, Prisma, PostgreSQL",
        status: "Planning",
        color: "from-blue-500/20 to-cyan-500/20",
    },
    {
        name: "Ecom_Microservices",
        updated: "1 day ago",
        stack: "Go, gRPC, Redis",
        status: "Deploying",
        color: "from-cyan-500/20 to-emerald-500/20",
    },
];

export default function DashboardPage() {
    const { user } = useAuth();

    return (
        <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-3xl font-bold text-white mb-2"
                    >
                        Welcome back, {user?.name || "Architect"}
                    </motion.h1>
                    <p className="text-text-secondary">Here&apos;s what&apos;s happening with your projects today.</p>
                </div>

                <Link href="/dashboard/create-project">
                    <Button size="lg" className="shadow-2xl">
                        <Plus className="w-5 h-5 mr-2" />
                        Create New Project
                    </Button>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <Card className="col-span-1 lg:col-span-2">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-xl font-bold text-white">Recent Projects</h3>
                        <button className="text-sm text-primary hover:underline">View all</button>
                    </div>

                    <div className="space-y-4">
                        {recentProjects.map((project, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group flex flex-col sm:flex-row sm:items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/[0.07] transition-all"
                            >
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center shrink-0`}>
                                    <Layout className="w-6 h-6 text-white/50" />
                                </div>
                                <div className="flex-grow">
                                    <h4 className="text-white font-semibold group-hover:text-primary transition-colors">{project.name}</h4>
                                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                                        <span className="text-[10px] text-text-muted flex items-center gap-1">
                                            <Clock className="w-3 h-3" /> {project.updated}
                                        </span>
                                        <span className="text-[10px] text-text-muted flex items-center gap-1">
                                            <Code2 className="w-3 h-3" /> {project.stack}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="px-2 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] font-bold text-text-secondary">
                                        {project.status}
                                    </div>
                                    <button className="p-2 text-text-muted hover:text-white transition-colors">
                                        <ExternalLink className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 text-text-muted hover:text-white transition-colors">
                                        <MoreHorizontal className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </Card>

                <Card className="flex flex-col justify-between overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -z-10" />

                    <div>
                        <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
                        <div className="space-y-3">
                            {[
                                { label: "New Architecture", icon: Cpu, color: "text-purple-400" },
                                { label: "Database Modeler", icon: Database, color: "text-blue-400" },
                                { label: "Generate API Docs", icon: Search, color: "text-cyan-400" },
                            ].map((action, i) => (
                                <button
                                    key={i}
                                    className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-primary/30 transition-all text-left group"
                                >
                                    <action.icon className={`w-5 h-5 ${action.color}`} />
                                    <span className="text-sm font-medium text-text-secondary group-hover:text-white transition-colors">{action.label}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 pt-8 border-t border-white/5 text-center">
                        <p className="text-xs text-text-muted mb-4">Unlock premium features with Pro Plan</p>
                        <Button variant="outline" className="w-full">Upgrade Now</Button>
                    </div>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: "Total Projects", value: "24", change: "+4 this month" },
                    { label: "Tokens Used", value: "128k", change: "82% of limit" },
                    { label: "Generated Files", value: "1,402", change: "+120 today" },
                    { label: "Avg. Build Time", value: "1.2s", change: "-0.4s improvement" },
                ].map((stat, i) => (
                    <Card key={i} className="py-6 border-white/5 bg-white/5">
                        <p className="text-xs text-text-secondary uppercase tracking-widest mb-2">{stat.label}</p>
                        <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                        <p className="text-[10px] text-green-400 font-medium">{stat.change}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
}
