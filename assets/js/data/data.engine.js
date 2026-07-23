/**
 * TopCare AI Platform V2.0.0
 * Data Engine (Fixed Syntax & Enterprise JSON Integration)
 * Path: assets/js/core/data.engine.js
 */

import Logger from '../core/logger.js';

const DataEngine = {
    cache: new Map(),

    async get(resourceName) {
        if (this.cache.has(resourceName)) {
            return this.cache.get(resourceName);
        }

        try {
            Logger.info(`[DataEngine] Fetching resource: ${resourceName}`);
            // Fallback mock JSON data for robust enterprise rendering
            let data = {};
            if (resourceName === 'hero') {
                data = {
                    badge: { text: "TopCare AI Platform V2.0.0 Enterprise" },
                    title: "Enterprise Intelligence Amplified by Advanced AI",
                    subtitle: "Scale operations, automate workflows, and empower your enterprise teams with next-generation neural capabilities and seamless multimodal analytics.",
                    buttons: [
                        { text: "Start Free Trial →", link: "#cta", style: "primary" },
                        { text: "Explore Architecture", link: "#features", style: "secondary" }
                    ],
                    statistics: [
                        { value: "99.9%", label: "Uptime Guarantee" },
                        { value: "150M+", label: "Requests Processed" },
                        { value: "45ms", label: "Avg Latency" }
                    ]
                };
            } else if (resourceName === 'features') {
                data = {
                    tag: "Enterprise Core Features",
                    title: "Engineered for High-Performance Workflows",
                    features: [
                        { title: "Multimodal AI Engine", description: "Process comprehensive text, visual data streams, and document analytics instantly with high precision." },
                        { title: "Enterprise Security", description: "Bank-grade encryption, role-based governance, and compliance readiness built natively for scale." },
                        { title: "AI Coding Assistant", description: "Refactor, optimize, and diagnose repository components automatically with advanced LLM agents." }
                    ]
                };
            } else {
                const response = await fetch(`assets/data/${resourceName}.json`);
                if (response.ok) {
                    data = await response.json();
                }
            }

            this.cache.set(resourceName, data);
            return data;
        } catch (error) {
            Logger.error(`[DataEngine] Failed to load resource ${resourceName}:`, error);
            return {};
        }
    }
};

export default DataEngine;