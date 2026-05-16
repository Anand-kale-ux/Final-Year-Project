"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Code2, Cpu, Download, Zap } from "lucide-react";

const features = [
    {
        title: "AI Architecture Generation",
        description: "Generate complete system designs including database schemas, API structures, and data flow diagrams in seconds.",
        icon: <Cpu className="w-6 h-6 text-primary" />,
    },
    {
        title: "Code Auto Generation",
        description: "Instant production-ready code generation based on your architecture. Clean, modular, and following best practices.",
        icon: <Code2 className="w-6 h-6 text-accent" />,
    },
    {
        title: "ZIP Download Ready",
        description: "Download your entire project as a ready-to-deploy ZIP file. No setup required, just extract and run.",
        icon: <Download className="w-6 h-6 text-primary" />,
    },
    {
        title: "Smart Tech Recommendations",
        description: "Our AI recommends the best tech stack (frontend, backend, DB) specifically tailored for your project's needs.",
        icon: <Zap className="w-6 h-6 text-accent" />,
    },
];

export const Features = () => {
    return (
        <section id="features" className="py-24 bg-dark">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        Everything you need for <span className="text-gradient">Instant Implementation</span>
                    </h2>
                    <p className="text-text-secondary max-w-2xl mx-auto">
                        From ideation to deployment-ready code, we handle the heavy lifting of software planning.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Card className="h-full">
                                <div className="p-3 bg-white/5 rounded-xl w-fit mb-6">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                <p className="text-text-secondary line-clamp-3">
                                    {feature.description}
                                </p>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
