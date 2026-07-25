/**
 * @file personality-analytics.js
 * @description Enterprise report generator for automatic percentage calculation and personality analytics mapping.
 * @module Personality/Analytics
 */

export const PersonalityAnalytics = {
    generateReport(scores, resultsMeta) {
        const total = Object.values(scores).reduce((a, b) => a + b, 0) || 1;

        // Automatically rank and calculate percentages
        const ranking = Object.keys(scores)
            .map(type => ({
                type,
                score: scores[type],
                percentage: Math.round((scores[type] / total) * 100)
            }))
            .sort((a, b) => b.score - a.score);

        const primary = ranking[0] ? ranking[0].type : "Koleris";
        const secondary = ranking[1] ? ranking[1].type : "Sanguinis";

        const primaryMeta = (resultsMeta && resultsMeta[primary]) || {
            summary: "Karakter pemimpin yang tegas, berorientasi pada target, dan mandiri.",
            icon: "🔥",
            color: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)"
        };

        const secondaryMeta = (resultsMeta && resultsMeta[secondary]) || {
            summary: "Pendukung yang adaptif, ramah, dan penuh energi sosial."
        };

        const details = (resultsMeta && resultsMeta[primary]) || {};

        return {
            ranking,
            primary,
            secondary,
            primaryMeta,
            secondaryMeta,
            strength: details.strength || ["Berorientasi pada hasil", "Pengambil keputusan yang cepat", "Mandiri dan tangguh"],
            weakness: details.weakness || ["Terkadang terlalu mendominasi", "Kurang sabar pada detail kecil", "Cenderung keras kepala"],
            communication: details.communication || "Langsung, lugas, dan berorientasi pada efisiensi waktu.",
            learning: details.learning || "Praktis, langsung terjun mencoba, dan menyukai tantangan baru.",
            leadership: details.leadership || "Autoritatif, visioner, dan fokus pada pencapaian target.",
            compatibility: details.compatibility || "Plegmatis dan Melankolis sebagai penyeimbang.",
            stress: details.stress || "Menjadi lebih menuntut, agresif, atau menarik diri untuk mengontrol situasi.",
            development: details.development || "Belajar mendengarkan sudut pandang orang lain dan meningkatkan empati.",
            career: details.career || "Sangat cocok untuk peran manajerial, wirausaha, kepemimpinan strategis, dan eksekusi proyek besar.",
            historicalFigures: details.historicalFigures || ["Steve Jobs", "Margaret Thatcher", "Napoleon Bonaparte"],
            recommendedJobs: details.recommendedJobs || ["CEO / Founder", "Project Manager", "Business Consultant", "Sales Director"],
            jobsToAvoid: details.jobsToAvoid || ["Pekerjaan repetitif tanpa ruang keputusan", "Administrator pasif"],
            recommendedStudy: details.recommendedStudy || "Manajemen Bisnis, Ilmu Hukum, Teknik Industri, atau Kepemimpinan Strategis."
        };
    }
};