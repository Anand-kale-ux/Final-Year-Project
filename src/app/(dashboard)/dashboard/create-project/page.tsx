"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { motion } from "framer-motion";

import {
    AlertCircle,
    Rocket
} from "lucide-react";

import { useProject } from "@/context/ProjectContext";

import IdeaInput from "@/components/dashboard/create-project/IdeaInput";

import DifficultySelector from "@/components/dashboard/create-project/DifficultySelector";

import FeatureToggles from "@/components/dashboard/create-project/FeatureToggles";

import ProcessingOverlay from "@/components/dashboard/create-project/ProcessingOverlay";

import { generateArchitecture } from "@/lib/generateArchitecture";

export default function CreateProjectPage() {

    const {
        isFormValid,
        setGenerationStatus,
        projectIdea,
        difficultyLevel,
        selectedFeatures,
        setGeneratedResult
    } = useProject();

    const [isProcessing,
        setIsProcessing] =
        useState(false);

    const [showError,
        setShowError] =
        useState(false);

    const [feedbackText,
        setFeedbackText] =
        useState("");

    const [rating,
        setRating] =
        useState(5);

    const router = useRouter();

    // Submit Feedback
    const submitFeedback =
        async () => {

        try {

            const user = JSON.parse(
                localStorage.getItem(
                    "user"
                ) || "{}"
            );

            await fetch(
                "/api/feedback",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify({
                        userId:
                            user?._id,

                        userName:
                            user?.name,

                        projectPrompt:
                            projectIdea,

                        rating,

                        feedbackText,
                    }),
                }
            );

            alert(
                "Feedback Submitted"
            );

            setFeedbackText("");

            setRating(5);

        } catch (error) {

            console.log(error);
        }
    };

    // Generate Architecture
    const handleSubmit =
        async () => {

        if (!isFormValid) {

            setShowError(true);

            return;
        }

        setShowError(false);

        setIsProcessing(true);

        setGenerationStatus(
            "processing"
        );

        try {

            const result =
                await generateArchitecture({
                    idea: projectIdea,

                    difficulty:
                        difficultyLevel,

                    features:
                        selectedFeatures
                });

            setGeneratedResult(
                result
            );

            // Logged In User
            const user = JSON.parse(
                localStorage.getItem(
                    "user"
                ) || "{}"
            );

            // Save Project
            await fetch(
                "/api/project",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json",
                    },

                    body: JSON.stringify({
                        userId:
                            user?._id,

                        userName:
                            user?.name,

                        prompt:
                            projectIdea,

                        difficultyLevel,

                        selectedFeatures,

                        generatedResult:
                            result,

                        projectTitle:
                            projectIdea,

                        techStack: [
                            "Next.js",
                            "MongoDB",
                            "Node.js",
                        ],
                    }),
                }
            );

            setGenerationStatus(
                "completed"
            );

            setIsProcessing(false);

            router.push(
                "/dashboard/result"
            );

        } catch (error) {

            console.error(
                "Error generating architecture:",
                error
            );

            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "AI generation failed. Please try again.";

            import(
                "react-hot-toast"
            ).then((mod) =>
                mod.default.error(
                    errorMessage
                )
            );

            setIsProcessing(false);

            setGenerationStatus(
                "idle"
            );
        }
    };

    return (
        <>
            <ProcessingOverlay
                isProcessing={
                    isProcessing
                }
            />

            <div className="max-w-4xl mx-auto pb-20">

                {/* Heading */}
                <div className="mb-10">

                    <motion.h1
                        initial={{
                            opacity: 0,
                            y: -20
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight"
                    >
                        Create New Project
                    </motion.h1>

                    <motion.p
                        initial={{
                            opacity: 0
                        }}
                        animate={{
                            opacity: 1
                        }}
                        transition={{
                            delay: 0.1
                        }}
                        className="text-text-secondary text-lg"
                    >
                        Describe your idea and let AI design your system blueprint natively.
                    </motion.p>

                </div>

                <div className="space-y-12">

                    {/* Project Idea */}
                    <motion.section
                        initial={{
                            opacity: 0,
                            y: 20
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                    >

                        <div className="flex items-center justify-between mb-4">

                            <h2 className="text-xl font-bold text-white">
                                1. Project Idea
                            </h2>

                            {showError &&
                                !isFormValid && (
                                    <span className="text-xs font-bold text-red-400 flex items-center bg-red-400/10 px-2 py-1 rounded-md">
                                        <AlertCircle className="w-3 h-3 mr-1" />
                                        Idea required
                                    </span>
                                )}

                        </div>

                        <IdeaInput />

                    </motion.section>

                    {/* Difficulty */}
                    <motion.section
                        initial={{
                            opacity: 0,
                            y: 20
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                    >

                        <div className="flex items-center justify-between mb-4">

                            <h2 className="text-xl font-bold text-white">
                                2. Technical Complexity
                            </h2>

                        </div>

                        <DifficultySelector />

                    </motion.section>

                    {/* Features */}
                    <motion.section
                        initial={{
                            opacity: 0,
                            y: 20
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                    >

                        <h2 className="text-xl font-bold text-white mb-4">
                            3. Premium Features
                        </h2>

                        <FeatureToggles />

                    </motion.section>

                    {/* Premium Feedback Section */}
                    <motion.section
                        initial={{
                            opacity: 0,
                            y: 20
                        }}
                        animate={{
                            opacity: 1,
                            y: 0
                        }}
                        transition={{
                            delay: 0.4
                        }}
                        className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-[#0F172A] to-[#111827] p-8 shadow-[0_0_40px_rgba(0,255,255,0.08)]"
                    >

                        {/* Glow */}
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

                            {/* Textarea */}
                            <div className="mb-5">

                                <textarea
                                    placeholder="Tell us what you liked or what can be improved..."
                                    value={feedbackText}
                                    onChange={(e) =>
                                        setFeedbackText(
                                            e.target.value
                                        )
                                    }
                                    className="w-full h-36 bg-[#0B1120]/80 border border-gray-700 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/20 rounded-2xl p-5 text-white outline-none transition-all resize-none"
                                />

                            </div>

                            {/* Rating */}
                            <div className="mb-6">

                                <label className="block text-white font-medium mb-3">
                                    Rate Your Experience
                                </label>

                                <div className="flex gap-3">

                                    {[1, 2, 3, 4, 5].map((star) => (

                                        <button
                                            key={star}
                                            onClick={() =>
                                                setRating(star)
                                            }
                                            className={`w-12 h-12 rounded-xl text-lg font-bold transition-all ${
                                                rating >= star
                                                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg scale-105"
                                                    : "bg-[#1E293B] text-gray-400 hover:bg-[#263244]"
                                            }`}
                                        >
                                            ★
                                        </button>

                                    ))}

                                </div>

                            </div>

                            {/* Submit Feedback */}
                            <button
                                onClick={
                                    submitFeedback
                                }
                                className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(0,255,255,0.25)] transition-all duration-300 text-white py-4 rounded-2xl font-bold text-lg"
                            >
                                Submit Feedback
                            </button>

                        </div>

                    </motion.section>

                </div>

                {/* Generate Button */}
                <motion.div
                    initial={{
                        opacity: 0
                    }}
                    animate={{
                        opacity: 1
                    }}
                    className="mt-12 flex justify-end"
                >

                    <div className="w-full md:w-auto relative group">

                        <button
                            onClick={
                                handleSubmit
                            }
                            disabled={
                                !isFormValid ||
                                isProcessing
                            }
                            className="w-full md:w-auto py-4 px-8 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold flex items-center justify-center hover:scale-105 transition-all"
                        >

                            <Rocket className="w-5 h-5 mr-3" />

                            {isProcessing
                                ? "Designing..."
                                : "Generate Architecture"}

                        </button>

                    </div>

                </motion.div>

            </div>
        </>
    );
}