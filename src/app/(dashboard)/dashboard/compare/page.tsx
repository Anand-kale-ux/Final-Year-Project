"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProject } from "@/hooks/useProject";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ComparisonView } from "@/components/compare/ComparisonView";
import { GitBranch, AlertCircle, Plus, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ComparePage() {
    const { savedProjects } = useProject();
    const router = useRouter();
    const [selectedIds, setSelectedIds] = useState<number[]>([]);

    const toggleSelection = (id: number) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(sid => sid !== id));
        } else if (selectedIds.length < 2) {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const projectA = savedProjects.find(p => p.id === selectedIds[0]);
    const projectB = savedProjects.find(p => p.id === selectedIds[1]);

    return (
        <div className="max-w-7xl mx-auto pb-20 px-4 md:px-0">
            <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight flex items-center gap-3">
                        <GitBranch className="w-10 h-10 text-emerald-400" /> Project Comparison
                    </h1>
                    <p className="text-text-secondary text-lg max-w-xl">
                        Select two architectures to analyze differences in tech stack, entities, and features side-by-side.
                    </p>
                </div>
                <Button
                    onClick={() => router.back()}
                    variant="ghost"
                    className="w-max"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                </Button>
            </header>

            {savedProjects.length < 2 ? (
                <Card className="p-12 flex flex-col items-center justify-center text-center bg-black/40 border-dashed border-white/10">
                    <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mb-6">
                        <AlertCircle className="w-10 h-10 text-white/20" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Insufficient Projects</h3>
                    <p className="text-white/40 mb-8 max-w-md">
                        You need at least two saved architectures to use the comparison system. Generate and save more designs to get started.
                    </p>
                    <Button onClick={() => router.push("/dashboard/create-project")}>
                        Create New Project
                    </Button>
                </Card>
            ) : (
                <div className="space-y-12">
                    {/* Selection UI */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {savedProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => toggleSelection(project.id)}
                                className={`cursor-pointer group relative`}
                            >
                                <Card className={`h-full border transition-all duration-300 ${selectedIds.includes(project.id)
                                        ? "border-emerald-500 bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                                        : "border-white/5 bg-white/[0.02] hover:border-white/20"
                                    }`}>
                                    <h4 className="font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">{project.title}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="text-[10px] text-white/40 bg-white/5 px-2 py-1 rounded">
                                            {project.techStack.frontend[0]}
                                        </span>
                                        <span className="text-[10px] text-white/40 bg-white/5 px-2 py-1 rounded">
                                            {project.database[0]}
                                        </span>
                                    </div>

                                    {selectedIds.includes(project.id) && (
                                        <div className="absolute top-4 right-4 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-lg">
                                            <span className="text-xs font-bold">{selectedIds.indexOf(project.id) + 1}</span>
                                        </div>
                                    )}
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        {selectedIds.length === 2 && projectA && projectB ? (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 30 }}
                                className="pt-12 border-t border-white/5"
                            >
                                <ComparisonView
                                    projectA={projectA}
                                    projectB={projectB}
                                />
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="h-[200px] flex items-center justify-center border border-dashed border-white/5 rounded-3xl"
                            >
                                <p className="text-white/20 text-sm font-medium">Select two projects to see comparison</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}
