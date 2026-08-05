/**
 * TOPCARE AI PLATFORM V2 — COMMUNITY HUB DATA SSOT
 * Path: assets/js/community/community.data.js
 * Status: APPROVED & LOCKED (GOLDEN BASELINE)
 * SRP: Immutable data definitions for Personality Plus Community Learning Catalog.
 */

import { deepFreezeDTO } from '../core/utils/dto.js';

export const COMMUNITY_DATA = deepFreezeDTO({
    hero: {
        badge: 'Modul Komunitas V2',
        title: 'Komunitas Personality Plus',
        subtitle: 'Belajar dan bertumbuh bersama memahami Personality Plus karya Florence Littauer serta Empat Temperamen.'
    },
    topics: [
        { id: 'personality-plus', icon: '📚', title: 'Personality Plus', desc: 'Pemahaman mendasar penerapan konsep Personality Plus dalam kehidupan sehari-hari.', tag: 'Materi Utama' },
        { id: 'koleris', icon: '🔥', title: 'Koleris', desc: 'Mendalami karakter kepemimpinan, orientasi pada pencapaian target, dan ketegasan tipe Koleris.', tag: 'Topik Populer' },
        { id: 'sanguinis', icon: '✨', title: 'Sanguinis', desc: 'Antusiasme, keluwesan sosial, serta strategi mengelola kedisiplinan dan fokus.', tag: 'Topik Populer' },
        { id: 'melankolis', icon: '📊', title: 'Melankolis', desc: 'Analisis mendalam, standar kualitas tinggi, dan pengelolaan perfeksionisme.', tag: 'Topik Populer' },
        { id: 'plegmatis', icon: '🌊', title: 'Plegmatis', desc: 'Kedamaian alami, diplomasi, serta dorongan motivasi proaktif tipe Plegmatis.', tag: 'Topik Populer' },
        { id: 'leadership', icon: '👑', title: 'Kepemimpinan', desc: 'Penerapan empat temperamen dalam mengelola tim dan pendelegasian tugas.', tag: 'Pengembangan' },
        { id: 'communication', icon: '💬', title: 'Komunikasi Adaptif', desc: 'Seni penyampaian pesan terstruktur sesuai dengan tipe kepribadian lawan bicara.', tag: 'Pengembangan' },
        { id: 'relationships', icon: '🤝', title: 'Hubungan & Family', desc: 'Membangun keharmonisan keluarga dan hubungan berbasis toleransi temperamen.', tag: 'Pengembangan' },
        { id: 'self-dev', icon: '🚀', title: 'Pengembangan Diri', desc: 'Strategi penyeimbangan kelemahan alamiah dan optimasi potensi diri.', tag: 'Pengembangan' }
    ],
    studyGroups: [
        { id: 'sg-beginner', icon: '🌱', name: 'Beginner Group', desc: 'Kelompok belajar dasar untuk anggota yang baru mengenal empat temperamen.', status: 'Segera Hadir' },
        { id: 'sg-intermediate', icon: '🌿', name: 'Intermediate Group', desc: 'Pendalaman analisis dinamika kepribadian kombinasi dalam interaksi sosial.', status: 'Segera Hadir' },
        { id: 'sg-leadership', icon: '💼', name: 'Leadership Circle', desc: 'Ruang pembelajaran bagi eksekutif, manajer, dan pemimpin tim berbasis temperamen.', status: 'Segera Hadir' },
        { id: 'sg-family', icon: '🏡', name: 'Family & Parenting', desc: 'Penerapan Personality Plus dalam pengasuhan anak dan keharmonisan rumah tangga.', status: 'Segera Hadir' },
        { id: 'sg-workplace', icon: '🏢', name: 'Workplace Dynamics', desc: 'Optimasi produktivitas dan kolaborasi tim di lingkungan profesional.', status: 'Segera Hadir' }
    ],
    guidelines: [
        { number: '01', title: 'Hormati Pendapat Anggota', desc: 'Setiap individu memiliki latar belakang dan proses belajar yang unik. Hargai setiap perbedaan pandangan.' },
        { number: '02', title: 'Jangan Melakukan Penilaian Pribadi', desc: 'Fokus pada karakteristik temperamen secara objektif, bukan memberikan pelabelan negatif kepada sesama.' },
        { number: '03', title: 'Fokus Pada Pembelajaran', desc: 'Gunakan ruang ini murni untuk edukasi, pertumbuhan diri, dan pemahaman konsep Personality Plus.' },
        { number: '04', title: 'Gunakan Bahasa yang Santun', desc: 'Pelihara suasana pembelajaran yang positif, ramah, bersahabat, dan konstruktif.' },
        { number: '05', title: 'Jaga Privasi Anggota', desc: 'Hormati privasi dan pengalaman pribadi yang dibagikan oleh anggota lain di dalam komunitas.' }
    ],
    comingSoon: [
        { icon: '🎥', title: 'Webinar Personality Plus', desc: 'Sesi pemaparan interaktif berkala membedah implementasi temperamen praktis.' },
        { icon: '📖', title: 'Bedah Buku Personality Plus', desc: 'Kupas tuntas setiap bab karya Florence Littauer bersama pemateri berpengalaman.' },
        { icon: '🧩', title: 'Studi Kasus Temperamen', desc: 'Analisis skenario dinamika kepribadian dalam penyelesaian masalah.' },
        { icon: '🎓', title: 'Sertifikasi Pembelajaran', desc: 'Program evaluasi dan apresiasi bagi pembelajar yang telah menyelesaikan seluruh modul.' }
    ]
});

export default COMMUNITY_DATA;