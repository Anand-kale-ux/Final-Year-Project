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

            {/* Heading */}
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

            {/* Main Sections */}
            <div className="space-y-12">

                {/* Section 1 */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >

                    <div className="flex items-center justify-between mb-4">

                        <h2 className="text-xl font-bold text-white">
                            1. Project Idea
                        </h2>

                        {showError && !isFormValid && (

                            <span className="text-xs font-bold text-red-400 flex items-center bg-red-400/10 px-2 py-1 rounded-md">

                                <AlertCircle className="w-3 h-3 mr-1" />

                                Idea required

                            </span>

                        )}

                    </div>

                    <IdeaInput />

                </motion.section>

                {/* Section 2 */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >

                    <div className="flex items-center justify-between mb-4">

                        <h2 className="text-xl font-bold text-white">
                            2. Technical Complexity
                        </h2>

                        {showError && !isFormValid && (

                            <span className="text-xs font-bold text-red-400 flex items-center bg-red-400/10 px-2 py-1 rounded-md">

                                <AlertCircle className="w-3 h-3 mr-1" />

                                Difficulty required

                            </span>

                        )}

                    </div>

                    <DifficultySelector />

                </motion.section>

                {/* Section 3 */}
                <motion.section
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >

                    <h2 className="text-xl font-bold text-white mb-4">
                        3. Premium Features
                    </h2>

                    <FeatureToggles />

                </motion.section>

            </div>

            {/* Submit Button */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 flex justify-end"
            >

                <div className="w-full md:w-auto relative group">

                    {/* Glow Effect */}
                    <div
                        className={`absolute -inset-1 bg-gradient-to-r blur rounded-xl transition duration-500 opacity-20 group-hover:opacity-60 ${
                            !isFormValid
                                ? "from-red-500 to-red-600"
                                : "from-cyan-500 to-blue-600"
                        }`}
                    />

                    <Button
                        size="lg"
                        onClick={handleSubmit}
                        className="w-full md:w-auto py-4 px-8 relative"
                        isLoading={isProcessing}
                        disabled={!isFormValid || isProcessing}
                    >

                        <Rocket className="w-5 h-5 mr-3" />

                        {isProcessing
                            ? "Designing..."
                            : "Generate Architecture"}

                    </Button>

                </div>

            </motion.div>

            {/* Premium Feedback Section */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-14 relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-[#0F172A] to-[#111827] p-8 shadow-[0_0_40px_rgba(0,255,255,0.08)]"
            >

                {/* Glow Effects */}
                <div className="absolute top-0 left-0 w-40 h-40 bg-cyan-500/10 blur-3xl rounded-full" />

                <div className="absolute bottom-0 right-0 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full" />

                <div className="relative z-10">

                    <div className="flex items-center justify-between mb-6">

                        <div>

                            <h2 className="text-2xl font-bold text-white">
                                Share Your Feedback
                            </h2>

                            <p className="text-gray-400 mt-1 text-sm">
                                Help us improve your AI architecture experience.
                            </p>

                        </div>

                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">

                            <span className="text-2xl">
                                ⭐
                            </span>

                        </div>

                    </div>

                    {/* Feedback Input */}
                    <textarea
                        placeholder="Tell us what you liked or what can be improved..."
                        className="w-full h-36 bg-[#0B1120]/80 border border-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 rounded-2xl p-5 text-white outline-none transition-all resize-none mb-5"
                    />

                    {/* Rating */}
                    <div className="mb-6">

                        <label className="block text-white font-medium mb-3">
                            Rate Your Experience
                        </label>

                        <div className="flex gap-3">

                            {[1, 2, 3, 4, 5].map((star) => (

                                <button
                                    key={star}
                                    className="w-12 h-12 rounded-xl text-lg font-bold bg-[#1E293B] text-gray-400 hover:bg-cyan-500 hover:text-white transition-all"
                                >
                                    ★
                                </button>

                            ))}

                        </div>

                    </div>

                    {/* Submit Feedback */}
                    <button
                        className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(0,255,255,0.25)] transition-all duration-300 text-white py-4 rounded-2xl font-bold text-lg"
                    >
                        Submit Feedback
                    </button>

                </div>

            </motion.section>

        </div>
    </>
);
}