"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { IdeaInput } from "@/components/dashboard/IdeaInput";
import { DifficultySelector } from "@/components/dashboard/DifficultySelector";
import { FeatureToggles } from "@/components/dashboard/FeatureToggles";
import { ProcessingOverlay } from "@/components/dashboard/ProcessingOverlay";
import { Button } from "@/components/ui/Button";
import { Rocket, AlertCircle } from "lucide-react";
import { useProject } from "@/hooks/useProject";
import { generateArchitecture } from "@/lib/aiEngine";

export default function CreateProjectPage() {
    const {
        isFormValid,
        setGenerationStatus,
        projectIdea,
        difficultyLevel,
        selectedFeatures,
        setGeneratedResult
    } = useProject();
    const [isProcessing, setIsProcessing] = useState(false);
    const [showError, setShowError] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        if (!isFormValid) {
            setShowError(true);
            return;
        }

        setShowError(false);
        setIsProcessing(true);
        setGenerationStatus("processing");

        try {
            const result = await generateArchitecture({
                idea: projectIdea,
                difficulty: difficultyLevel,
                features: selectedFeatures
            });
            setGeneratedResult(result);
            setGenerationStatus("completed");
            setIsProcessing(false);
            router.push("/dashboard/result");
        } catch (error) {
            console.error("Error generating architecture:", error);
            const errorMessage = error instanceof Error ? error.message : "AI generation failed. Please try again.";
            import("react-hot-toast").then(mod => mod.default.error(errorMessage));
            setIsProcessing(false);
            setGenerationStatus("idle");
        }
    };

    return (
        <>
            <ProcessingOverlay
                isProcessing={isProcessing}
            />

            <div className="max-w-4xl mx-auto pb-20">
                <div className="mb-10">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight"
                    >
                        Create New Project
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="text-text-secondary text-lg"
                    >
                        Describe your idea and let AI design your system blueprint natively.
                    </motion.p>
                </div>

                <div className="space-y-12">
                    {/* Section 1: Idea */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-white">1. Project Idea</h2>
                            {showError && !isFormValid && (
                                <span className="text-xs font-bold text-red-400 flex items-center bg-red-400/10 px-2 py-1 rounded-md">
                                    <AlertCircle className="w-3 h-3 mr-1" /> Idea required
                                </span>
                            )}
                        </div>
                        <IdeaInput />
                    </motion.section>

                    {/* Section 2: Difficulty */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-white">2. Technical Complexity</h2>
                            {showError && !isFormValid && (
                                <span className="text-xs font-bold text-red-400 flex items-center bg-red-400/10 px-2 py-1 rounded-md">
                                    <AlertCircle className="w-3 h-3 mr-1" /> Difficulty required
                                </span>
                            )}
                        </div>
                        <DifficultySelector />
                    </motion.section>

                    {/* Section 3: Extra Features */}
                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <h2 className="text-xl font-bold text-white mb-4">3. Premium Features</h2>
                        <FeatureToggles />
                    </motion.section>
                </div>

                {/* Submit Action */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-12 flex justify-end"
                >
                    <div className="w-full md:w-auto relative group">
                        {/* Glow on hover, or red glow if disabled/error */}
                        <div className={`absolute -inset-1 bg-gradient-to-r blur rounded-xl transition duration-500 opacity-20 group-hover:opacity-60 ${!isFormValid ? 'from-red-500 to-red-600' : 'from-primary to-accent'}`} />

                        <Button
                            size="lg"
                            onClick={handleSubmit}
                            className="w-full md:w-auto py-4 px-8 relative"
                            isLoading={isProcessing}
                            disabled={!isFormValid || isProcessing}
                        >
                            <Rocket className="w-5 h-5 mr-3" />
                            {isProcessing ? "Designing..." : "Generate Architecture"}
                        </Button>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
