"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useProject } from "@/hooks/useProject";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Tabs } from "@/components/ui/Tabs";
import { useRouter } from "next/navigation";
import { exportToPDF } from "@/lib/utils/exportPdf";
import toast from "react-hot-toast";
import { parseArchitecture } from "@/lib/parser";
import { ArchitectureFlow } from "@/components/architecture/ArchitectureFlow";
import { ArchitectureCard } from "@/components/architecture/ArchitectureCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { CodeViewer } from "@/components/code/CodeViewer";
import { generateProjectCode } from "@/lib/codeGenerator";
import { exportToMarkdown } from "@/lib/utils/exportMarkdown";
import { downloadProjectZip } from "@/lib/downloadZip";
import { generateDiagrams } from "@/lib/diagramGenerator";
import { DiagramViewer } from "@/components/diagram/DiagramViewer";
import {
    Database,
    Layout,
    Server,
    Download,
    Save,
    Rocket,
    AlertCircle,
    FolderPlus,
    RefreshCw,
    Code,
    FileText,
    GitBranch,
    Layers,
    ArrowRightLeft,
    Share2,
    Activity,
    Users
} from "lucide-react";

const TABS = ["Overview", "Architecture", "Database", "Features", "Code", "Diagrams"];

type DiagramTabType = "architecture" | "er" | "flow" | "component" | "sequence" | "usecase";

const DIAGRAM_TABS: { id: DiagramTabType; label: string; icon: React.ReactNode }[] = [
    { id: "architecture", label: "System Arch", icon: <Share2 className="w-4 h-4" /> },
    { id: "er", label: "ER Diagram", icon: <Database className="w-4 h-4" /> },
    { id: "flow", label: "Flowchart", icon: <Activity className="w-4 h-4" /> },
    { id: "component", label: "Components", icon: <Layers className="w-4 h-4" /> },
    { id: "sequence", label: "API Sequence", icon: <ArrowRightLeft className="w-4 h-4" /> },
    { id: "usecase", label: "Use Case", icon: <Users className="w-4 h-4" /> },
];

export default function ResultPage() {
    const {
        generatedResult, generationStatus, saveProject,
        generatedCode, codeGenerationStatus, setGeneratedCode, setCodeGenerationStatus,
        setSelectedFile, selectedFile
    } = useProject();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(TABS[0]);
    const [activeDiagramTab, setActiveDiagramTab] = useState<DiagramTabType>("architecture");
    const [isDownloadingZip, setIsDownloadingZip] = useState(false);

    // Loading State
    if (generationStatus === "processing") {
        return (
            <div className="max-w-6xl mx-auto pb-20 space-y-6 px-4 md:px-0">
                <Skeleton className="h-12 w-64 mb-10" />
                <Skeleton className="h-[250px] w-full" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
                    <Skeleton className="h-[350px] w-full" />
                    <Skeleton className="h-[350px] w-full" />
                    <Skeleton className="h-[350px] w-full" />
                </div>
            </div>
        );
    }

    // Error State
    if ((generationStatus as string) === "error") {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
                <div className="w-20 h-20 bg-rose-500/10 border border-rose-500/20 rounded-full flex flex-col items-center justify-center mb-6 shadow-[0_0_20px_rgba(244,63,94,0.15)]">
                    <AlertCircle className="w-10 h-10 text-rose-500" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3">Failed to load architecture</h2>
                <p className="text-text-secondary mb-8 max-w-sm">There was an issue generating the blueprint. Please try again.</p>
                <Button
                    onClick={() => router.push("/dashboard/create-project")}
                    variant="outline"
                    className="border-rose-500/30 text-rose-200 hover:bg-rose-500/10"
                >
                    <RefreshCw className="w-4 h-4 mr-2" /> Retry Generation
                </Button>
            </div>
        );
    }

    // Empty State
    if (!generatedResult) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
                <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-full flex flex-col items-center justify-center mb-6 shadow-lg">
                    <FolderPlus className="w-10 h-10 text-white/40" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">No architecture generated yet</h2>
                <p className="text-text-secondary mb-8 max-w-sm">Generate a project first to see your AI-designed system architecture blueprint.</p>
                <Button
                    onClick={() => router.push("/dashboard/create-project")}
                    className="bg-emerald-500 hover:bg-emerald-600 font-semibold text-black px-6"
                >
                    Create Project
                </Button>
            </div>
        );
    }

    // Success State
    const parsed = parseArchitecture(generatedResult);
    const diagrams = generateDiagrams(generatedResult);

    const handleSave = () => {
        saveProject({
            id: Date.now(),
            createdAt: new Date().toISOString(),
            ...generatedResult
        });
        toast.success("Project Saved Successfully!");
    };

    const handleGenerateProject = async () => {
        if (!generatedResult) return;
        setActiveTab("Code");
        setCodeGenerationStatus("generating");
        try {
            const code = await generateProjectCode(generatedResult);
            setGeneratedCode(code);
            const firstFile = Object.keys(code.files)[0];
            setSelectedFile(firstFile);
            setCodeGenerationStatus("completed");
            toast.success("Project codebase successfully generated!");
        } catch (error) {
            console.error("Code generation error:", error);
            setCodeGenerationStatus("error");
            toast.error("Failed to generate project code.");
        }
    };

    const handleDownloadZip = async () => {
        if (!generatedCode || !generatedCode.files) {
            toast.error("Please generate the project code first.");
            return;
        }
        setIsDownloadingZip(true);
        try {
            await downloadProjectZip(generatedCode.files, parsed.title);
        } catch {
            // Error handled inside downloadProjectZip
        } finally {
            setIsDownloadingZip(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto pb-20">
            {/* Header Actions */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4 px-4 md:px-0">
                <Tabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <Button
                        variant="outline"
                        className="flex-1 md:flex-none py-2 shrink-0 border-white/10 hidden md:flex items-center"
                        onClick={() => exportToPDF("pdf-content")}
                    >
                        <Download className="w-4 h-4 md:mr-2" /> <span className="hidden md:inline text-xs">PDF</span>
                    </Button>
                    <Button
                        variant="outline"
                        className="flex-1 md:flex-none py-2 shrink-0 border-white/10 hidden md:flex items-center"
                        onClick={() => exportToMarkdown(generatedResult)}
                    >
                        <FileText className="w-4 h-4 md:mr-2" /> <span className="hidden md:inline text-xs">MD</span>
                    </Button>

                    {codeGenerationStatus === "completed" ? (
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                className="px-2 py-2 border-white/10 hover:bg-white/5 text-white/40 hover:text-white transition-colors"
                                onClick={handleGenerateProject}
                                title="Regenerate Source Code"
                            >
                                <RefreshCw className={`w-4 h-4 ${codeGenerationStatus === "completed" ? "" : "animate-spin"}`} />
                            </Button>
                            <Button
                                className="flex-1 md:flex-none py-2 bg-emerald-600 hover:bg-emerald-500 border border-emerald-400/50 text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] group transition-all shrink-0 font-bold"
                                onClick={handleDownloadZip}
                                isLoading={isDownloadingZip}
                            >
                                <Download className="w-4 h-4 mr-2" /> Download ZIP
                            </Button>
                        </div>
                    ) : (
                        <Button
                            className="flex-1 md:flex-none py-2 bg-blue-600 hover:bg-blue-500 border border-blue-400/50 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] group transition-all shrink-0 font-bold"
                            onClick={handleGenerateProject}
                            isLoading={codeGenerationStatus === "generating"}
                        >
                            <Rocket className="w-4 h-4 mr-2 group-hover:scale-110 group-hover:-translate-y-1 transition-transform" /> <span>Generate Code</span>
                        </Button>
                    )}

                    <Button
                        className="flex-1 md:flex-none py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.1)] group transition-all shrink-0"
                        onClick={handleSave}
                    >
                        <Save className="w-4 h-4 md:mr-2 group-hover:scale-110 transition-transform" /> <span className="hidden lg:inline">Save</span>
                    </Button>
                </div>
            </div>

            <div id="pdf-content" className="p-1 rounded-3xl bg-transparent">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-10 px-4 md:px-0"
                >
                    <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-xs font-bold rounded-full mb-4 flex items-center w-max shadow-sm shadow-primary/20">
                        <Rocket className="w-3 h-3 mr-2" /> AI GENERATED BLUEPRINT
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60 mb-4 tracking-tight">
                        {parsed.title}
                    </h1>
                    <p className="text-lg text-text-secondary max-w-3xl leading-relaxed">
                        {parsed.description}
                    </p>
                </motion.div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 15, filter: 'blur(5px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -15, filter: 'blur(5px)' }}
                        transition={{ duration: 0.3 }}
                        className="px-4 md:px-0"
                    >
                        {/* OVERVIEW TAB */}
                        {activeTab === "Overview" && (
                            <section className="space-y-6">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                                    <Server className="w-5 h-5 text-indigo-400" /> Technology Stack Overview
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <ArchitectureCard title="Frontend" items={parsed.frontend} icon={Layout} color="purple" isEmptyMessage="No frontend basics assigned" />
                                    <ArchitectureCard title="Backend" items={parsed.backend} icon={Server} color="blue" isEmptyMessage="No backend specifics provided" />
                                    <ArchitectureCard title="Database" items={parsed.database} icon={Database} color="cyan" isEmptyMessage="No database assigned" />
                                </div>
                            </section>
                        )}

                        {/* ARCHITECTURE TAB */}
                        {activeTab === "Architecture" && (
                            <section>
                                <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                                    <Rocket className="w-5 h-5 text-emerald-400" /> System Architecture Flow
                                </h2>
                                <ArchitectureFlow flow={parsed.flow} />
                            </section>
                        )}

                        {/* DATABASE TAB */}
                        {activeTab === "Database" && (
                            <section>
                                <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                                    <Database className="w-5 h-5 text-blue-400" /> Database Entities
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {parsed.database.length > 0 ? parsed.database.map((table, i) => (
                                        <Card key={i} hover={true} className="border-blue-500/20 bg-black/40 flex items-center p-6 gap-4 group cursor-default">
                                            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                                                <Database className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <h3 className="font-semibold text-white text-lg tracking-tight">{table}</h3>
                                                <p className="text-sm text-text-muted mt-1 leading-snug">Data structure automatically resolved from diagram.</p>
                                            </div>
                                        </Card>
                                    )) : (
                                        <div className="col-span-full border border-dashed border-white/20 rounded-xl p-10 flex flex-col items-center justify-center text-center bg-white/5">
                                            <AlertCircle className="w-8 h-8 text-white/30 mb-3" />
                                            <p className="text-white/60">No structured database entities were identified.</p>
                                        </div>
                                    )}
                                </div>
                            </section>
                        )}

                        {/* FEATURES TAB */}
                        {activeTab === "Features" && (
                            <section>
                                <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                                    <Layout className="w-5 h-5 text-rose-400" /> Key Features Breakdown
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {parsed.features.length > 0 ? parsed.features.map((feature, i) => (
                                        <Card key={i} hover={true} className="border-rose-500/20 bg-black/40 flex items-start p-5 gap-4 group cursor-default h-full">
                                            <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center mt-0.5 shrink-0 shadow-[0_0_10px_rgba(244,63,94,0.3)]">
                                                <div className="w-2.5 h-2.5 bg-rose-400 rounded-full group-hover:scale-125 transition-transform" />
                                            </div>
                                            <span className="text-white text-sm leading-relaxed font-medium">{feature}</span>
                                        </Card>
                                    )) : (
                                        <div className="col-span-full border border-dashed border-white/20 rounded-xl p-10 flex flex-col items-center justify-center text-center bg-white/5">
                                            <AlertCircle className="w-8 h-8 text-white/30 mb-3" />
                                            <p className="text-white/60">No specific features were listed manually.</p>
                                        </div>
                                    )}
                                </div>
                            </section>
                        )}

                        {/* CODE TAB */}
                        {activeTab === "Code" && (
                            <section>
                                <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-6">
                                    <Code className="w-5 h-5 text-indigo-400" /> Auto-Generated Project Source
                                </h2>

                                {codeGenerationStatus === "idle" && !generatedCode && (
                                    <Card className="h-[500px] flex flex-col items-center justify-center border-dashed border-white/20 bg-black/40">
                                        <Code className="w-12 h-12 text-white/20 mb-4" />
                                        <h3 className="text-xl font-bold text-white mb-2">Ready to Build</h3>
                                        <p className="text-white/50 mb-8 text-center max-w-sm leading-relaxed">
                                            Click the Generate Full Project button above to instruct the AI to construct the complete multi-file repository structure.
                                        </p>
                                        <Button onClick={handleGenerateProject} className="bg-blue-600 hover:bg-blue-500 font-bold px-8 py-6 text-lg">
                                            Generate Full Project <Rocket className="w-5 h-5 ml-3" />
                                        </Button>
                                    </Card>
                                )}

                                {codeGenerationStatus === "generating" && (
                                    <Card className="h-[500px] flex flex-col items-center justify-center border-blue-500/30 bg-[#0d1117] relative overflow-hidden">
                                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/10 to-transparent animate-[shimmer_2s_infinite] -translate-x-full" style={{ backgroundImage: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.1), transparent)' }} />
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ repeat: Infinity, duration: 1.5, repeatType: 'reverse' }}
                                            className="w-20 h-20 rounded-full border-4 border-blue-500/20 border-t-blue-500 border-l-blue-500 animate-spin mb-8 shadow-[0_0_30px_rgba(59,130,246,0.3)] shadow-blue-500/50"
                                        />
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 mb-3"
                                        >
                                            Synthesizing Codebase...
                                        </motion.div>
                                        <p className="text-blue-200/60 font-medium">Drafting structurals • API Integrations • React components...</p>
                                    </Card>
                                )}

                                {codeGenerationStatus === "error" && (
                                    <Card className="h-[500px] flex flex-col items-center justify-center border-dashed border-rose-500/30 bg-rose-500/5">
                                        <AlertCircle className="w-12 h-12 text-rose-500 mb-4" />
                                        <h3 className="text-xl font-bold text-white mb-2">Generation Failed</h3>
                                        <p className="text-white/60 mb-6 text-center max-w-sm">Something went wrong while compiling the project structures. Please attempt retrieval again.</p>
                                        <Button variant="outline" onClick={handleGenerateProject} className="border-rose-500/30 text-rose-300 hover:bg-rose-500/10">
                                            <RefreshCw className="w-4 h-4 mr-2" /> Retry Generating
                                        </Button>
                                    </Card>
                                )}

                                {codeGenerationStatus === "completed" && generatedCode && (
                                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                                        <CodeViewer
                                            files={generatedCode.files}
                                            selectedFile={selectedFile}
                                            setSelectedFile={setSelectedFile}
                                        />
                                    </div>
                                )}
                            </section>
                        )}

                        {/* DIAGRAMS TAB */}
                        {activeTab === "Diagrams" && (
                            <section>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
                                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                        <GitBranch className="w-5 h-5 text-violet-400" /> System Diagrams
                                    </h2>
                                    <span className="text-xs text-white/40 bg-white/10 px-2 py-0.5 rounded-full font-medium w-max">AI Generated · Mermaid.js</span>
                                </div>

                                {/* Diagram Sub-Tabs */}
                                <div className="flex flex-wrap gap-2 mb-6 p-1 bg-white/5 border border-white/10 rounded-2xl w-full sm:w-max">
                                    {DIAGRAM_TABS.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveDiagramTab(tab.id)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${activeDiagramTab === tab.id
                                                ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(124,58,237,0.4)]"
                                                : "text-white/60 hover:text-white hover:bg-white/10"
                                                }`}
                                        >
                                            {tab.icon}
                                            {tab.label}
                                        </button>
                                    ))}
                                </div>

                                {/* Diagram Viewer */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeDiagramTab}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.25 }}
                                    >
                                        <DiagramViewer
                                            chart={diagrams[activeDiagramTab]}
                                            id={activeDiagramTab}
                                        />
                                    </motion.div>
                                </AnimatePresence>

                                {/* Description cards */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
                                    {DIAGRAM_TABS.map((tab) => (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveDiagramTab(tab.id)}
                                            className={`text-left p-4 rounded-xl border transition-all duration-200 group ${activeDiagramTab === tab.id
                                                ? "border-violet-500/40 bg-violet-500/10 shadow-[0_0_20px_rgba(124,58,237,0.15)]"
                                                : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                                                }`}
                                        >
                                            <div className={`flex items-center gap-2 mb-1 font-semibold text-sm ${activeDiagramTab === tab.id ? "text-violet-300" : "text-white/70 group-hover:text-white"}`}>
                                                {tab.icon}
                                                {tab.label}
                                            </div>
                                            <p className="text-xs text-white/40 leading-relaxed">
                                                {tab.id === "architecture" && "High-level system architecture based on your tech stack."}
                                                {tab.id === "er" && "Entity relationships for your database schema."}
                                                {tab.id === "flow" && "User journey and system process flow."}
                                                {tab.id === "component" && "Logical component breakdown and connections."}
                                                {tab.id === "sequence" && "API request/response lifecycle diagram."}
                                                {tab.id === "usecase" && "All actors (Guest, User, Admin, System) and their use cases with include/extend relationships."}
                                            </p>
                                        </button>
                                    ))}
                                </div>
                            </section>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
