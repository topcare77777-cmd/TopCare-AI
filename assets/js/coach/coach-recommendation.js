// assets/js/coach/coach-recommendation.js
/**
 * @file coach-recommendation.js
 * @description Recommendation engine providing tailored next steps, availability checks, and completion summaries based on personality profile.
 * @module Coach/Recommendation
 */

export const CoachRecommendation = {
    getRecommendations(primaryType) {
        const recommendations = {
            "Koleris": [
                "Praktikkan delegasi tugas dengan memberikan otonomi penuh pada 1 anggota tim minggu ini.",
                "Gunakan teknik active listening (mendengar tanpa memotong) dalam setiap sesi rapat.",
                "Evaluasi tingkat kesabaran dan reaktivitas emosional secara berkala."
            ],
            "Sanguinis": [
                "Buat jadwal harian terstruktur dan patuhi blok waktu yang telah ditentukan.",
                "Tindak lanjuti setiap ide kreatif dengan rencana eksekusi tertulis yang konkrit.",
                "Fokuskan energi pada penyelesaian satu tugas utama hingga tuntas sebelum beralih ke hal lain."
            ],
            "Melankolis": [
                "Terapkan standar 'selesai dan baik' alih-alih menunggu kesempurnaan mutlak.",
                "Luangkan waktu untuk mencatat 3 hal positif pencapaian diri setiap hari.",
                "Berikan kepercayaan kepada rekan kerja untuk menjalankan tugas dengan cara mereka."
            ],
            "Plegmatis": [
                "Ambil inisiatif memimpin minimal satu diskusi atau proyek kecil minggu ini.",
                "Latih diri menyampaikan pendapat atau ketidaksetujuan secara asertif.",
                "Keluar dari zona nyaman dengan mencoba metode kerja yang lebih dinamis."
            ]
        };

        return recommendations[primaryType] || [
            "Teruskan konsistensi dalam mengeksplorasi potensi diri.",
            "Terapkan prinsip pengembangan karakter dalam aktivitas harian.",
            "Evaluasi pencapaian secara berkala."
        ];
    },

    hasRecommendations(primaryType) {
        return Array.isArray(this.getRecommendations(primaryType));
    },

    getSummary(primaryType) {
        const typeName = primaryType || "Profil";
        return `Selamat. Anda telah menyelesaikan seluruh pembelajaran AI Coach untuk profil ${typeName}.`;
    }
};