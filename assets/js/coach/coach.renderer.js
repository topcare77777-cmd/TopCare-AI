/**
 * TOPCARE AI PLATFORM V2 — UNIFIED COACH RENDERER
 * Path: assets/js/coach/coach.renderer.js
 * Status: APPROVED & LOCKED (BUILD 143 - DYNAMIC SMART CHAT RESPONDER)
 * SRP: Pure View Generator using Design System Classes.
 */

import COACH_IDENTITY from './coach.identity.js';
import CoachMemory from './coach.memory.js';
import { PERSONALITY_RECOMMENDATIONS_DATA } from './coach.recommendation.data.js';

export const CoachRenderer = {
    renderCard() {
        const memory = CoachMemory.getMemory() || {};

        if (!memory.hasAssessed) {
            return `
                <div class="tc-coach-card-container">
                    <div class="tc-coach-header">
                        <div class="tc-coach-avatar-box">
                            <img src="${COACH_IDENTITY.avatar}" alt="${COACH_IDENTITY.name}" class="tc-coach-avatar-img" onerror="this.src='${COACH_IDENTITY.fallbackAvatar}'">
                        </div>
                        <div class="tc-coach-identity-info">
                            <span class="tc-coach-badge">${COACH_IDENTITY.title}</span>
                            <h3 class="tc-coach-name">${COACH_IDENTITY.name}</h3>
                            <p class="tc-coach-welcome">${COACH_IDENTITY.welcomeMessage}</p>
                        </div>
                    </div>
                    <div class="tc-coach-cta-box">
                        <p class="tc-coach-welcome" style="margin-bottom: 1.25rem;">Selesaikan Personality Assessment untuk membuka pendampingan AI cerdas.</p>
                        <a href="#/personality" class="tc-btn-coach-primary">Mulai Personality Assessment →</a>
                    </div>
                </div>
            `;
        }

        const dominant = memory.dominantPersonality || "Sanguinis";
        const recs = PERSONALITY_RECOMMENDATIONS_DATA[dominant] || PERSONALITY_RECOMMENDATIONS_DATA.Sanguinis;

        const spokenGreeting = `Halo. Saya Coach TopCare AI. Berdasarkan tipe dominan ${dominant}, mari kita mulai diskusi interaktif hari ini.`;

        // INJEKSI SCRIPT LOGIKA CHAT DINAMIS & TTS
        setTimeout(() => {
            if (window.CoachVoiceService && typeof window.CoachVoiceService.speak === 'function') {
                window.CoachVoiceService.speak(spokenGreeting);
            }

            const chatForm = document.getElementById('coach-chat-form');
            if (chatForm && !window._chatFormBound) {
                window._chatFormBound = true;
                chatForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const input = document.getElementById('coach-chat-input');
                    const msg = input.value.trim();
                    if (!msg) return;

                    const history = document.getElementById('coach-chat-history');

                    // Render Pesan User
                    history.innerHTML += `
                        <div style="display: flex; justify-content: flex-end; margin-bottom: 16px;">
                            <div style="background: linear-gradient(135deg, #3B82F6, #2563EB); color: white; padding: 12px 16px; border-radius: 16px 16px 0 16px; max-width: 80%; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); font-size: 0.95rem; line-height: 1.5;">
                                ${msg}
                            </div>
                        </div>
                    `;
                    input.value = '';
                    history.scrollTop = history.scrollHeight;

                    // Indikator Mengetik
                    const typingId = 'typing-' + Date.now();
                    history.innerHTML += `
                        <div id="${typingId}" style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 16px;">
                            <img src="${COACH_IDENTITY.avatar}" style="width: 32px; height: 32px; border-radius: 50%; border: 2px solid #334155;">
                            <div style="background: #1E293B; color: #94A3B8; padding: 12px 16px; border-radius: 0 16px 16px 16px; font-size: 0.85rem; font-style: italic;">
                                Coach sedang memproses respons...
                            </div>
                        </div>
                    `;
                    history.scrollTop = history.scrollHeight;

                    // GENERATOR RESPON DINAMIS BERDASARKAN KATA KUNCI PESAN USER
                    setTimeout(() => {
                        document.getElementById(typingId).remove();

                        const lowerMsg = msg.toLowerCase();
                        let aiReply = "";

                        if (lowerMsg.includes("halo") || lowerMsg.includes("hi") || lowerMsg.includes("pagi") || lowerMsg.includes("siang")) {
                            aiReply = `Halo juga! Senang bisa mengobrol dengan Anda hari ini. Ada target belajar AI atau proyek kreatif yang ingin kita diskusikan?`;
                        } else if (lowerMsg.includes("mantap") || lowerMsg.includes("keren") || lowerMsg.includes("bagus") || lowerMsg.includes("terima kasih")) {
                            aiReply = `Haha, terima kasih banyak! Sebagai seorang ${dominant} yang ekspresif, energi positif seperti ini yang membuat sesi belajar kita makin seru! Ada hal lain yang ingin dieksplorasi?`;
                        } else if (lowerMsg.includes("belajar") || lowerMsg.includes("modul") || lowerMsg.includes("kursus")) {
                            aiReply = `Tentu! Untuk gaya belajar ${dominant}, modul seperti "${recs.studyStyle}" sangat cocok. Anda bisa langsung mengeklik tautan modul di atas untuk mulai menyelami materi AI Academy.`;
                        } else if (lowerMsg.includes("ai") || lowerMsg.includes("artificial intelligence") || lowerMsg.includes("prompt")) {
                            aiReply = `Dunia AI sangat luas dan dinamis! Cocok sekali dengan karakter ${dominant} yang menyukai hal-hal baru dan interaktif. Apakah Anda tertarik mendalami Prompt Engineering atau Visual Storytelling?`;
                        } else {
                            aiReply = `Poin yang menarik! Dari sudut pandang ${dominant}, kita bisa melihat bahwa eksplorasi ini punya potensi besar. Mari fokus pada pengembangan ide kreatif Anda di modul AI Academy berikutnya.`;
                        }

                        // Render Pesan AI Dinamis
                        history.innerHTML += `
                            <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 16px;">
                                <img src="${COACH_IDENTITY.avatar}" style="width: 32px; height: 32px; border-radius: 50%; border: 2px solid #3B82F6;">
                                <div style="background: #1E293B; color: #F8FAFC; padding: 12px 16px; border-radius: 0 16px 16px 16px; max-width: 80%; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2); font-size: 0.95rem; line-height: 1.6; border: 1px solid #334155;">
                                    ${aiReply}
                                </div>
                            </div>
                        `;
                        history.scrollTop = history.scrollHeight;

                        if (window.CoachVoiceService) window.CoachVoiceService.speak(aiReply);
                    }, 1000);
                });
            }
        }, 800);

        return `
            <div class="tc-coach-card-container">
                <div class="tc-coach-header">
                    <div class="tc-coach-avatar-box">
                        <img src="${COACH_IDENTITY.avatar}" alt="${COACH_IDENTITY.name}" class="tc-coach-avatar-img" onerror="this.src='${COACH_IDENTITY.fallbackAvatar}'">
                    </div>
                    <div class="tc-coach-identity-info">
                        <span class="tc-coach-badge active">Personal Companion Active</span>
                        <h3 class="tc-coach-name">Halo, ${memory.userName || 'Member TopCare'} 👋</h3>
                        <p class="tc-coach-welcome">Saya <strong>${COACH_IDENTITY.name}</strong>. Selamat, Anda telah menyelesaikan Personality Assessment!</p>
                    </div>
                </div>

                <div class="tc-coach-dashboard-grid">
                    <div class="tc-coach-stat-card">
                        <span class="tc-stat-label">Tipe Kepribadian</span>
                        <h4 class="tc-stat-value">${dominant}</h4>
                        <small class="tc-stat-sub">Insight terpersonalisasi aktif</small>
                    </div>
                    <div class="tc-coach-stat-card">
                        <span class="tc-stat-label">Progress AI Academy</span>
                        <h4 class="tc-stat-value">${memory.currentLevel || 'Level Dasar'}</h4>
                        <small class="tc-stat-sub">${memory.academyProgress || '15'}% Selesai</small>
                    </div>
                </div>

                <div class="tc-coach-insight-box">
                    <h5 class="tc-insight-title">💡 Insight Pendampingan Kepribadian</h5>
                    <p class="tc-insight-text">Berdasarkan tipe dominan <strong>${dominant}</strong>, gaya belajar AI ideal Anda adalah <em>"${recs.studyStyle}"</em>.</p>
                    <strong style="font-size: 0.85rem; color: #a78bfa;">Saya akan menjadi pendamping Anda untuk:</strong>
                    <ul class="tc-companion-scope">
                        <li>✓ Memahami kekuatan karakter (${recs.strengths ? recs.strengths[0] : 'Antusias & Kreatif'})</li>
                        <li>✓ Mengembangkan potensi & gaya komunikasi</li>
                        <li>✓ Memilih jalur belajar AI yang sesuai (${recs.recommendedPath || 'Prompt Engineering'})</li>
                        <li>✓ Memberikan rekomendasi modul AI Academy</li>
                    </ul>
                </div>

                <div class="tc-coach-learning-section">
                    <h5 class="tc-learning-title">📚 Rekomendasi Modul AI Academy Terpilih:</h5>
                    <div class="tc-learning-grid">
                        ${recs.academyModules ? recs.academyModules.map(m => `
                            <div class="tc-learning-card">
                                <div>
                                    <span class="tc-module-tag">${m.level}</span>
                                    <h6 class="tc-module-title">${m.title}</h6>
                                </div>
                                <a href="${m.link}" class="tc-module-link">Pelajari Modul →</a>
                            </div>
                        `).join('') : '<p>Memuat modul...</p>'}
                    </div>
                </div>

                <!-- PREMIUM CHAT UI INTERFACE -->
                <div class="tc-coach-chat-section" style="margin-top: 2.5rem; border-top: 1px solid #334155; padding-top: 2rem;">
                    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 1.5rem;">
                        <span style="font-size: 1.5rem;">💬</span>
                        <h4 style="margin: 0; color: #F8FAFC; font-size: 1.25rem; font-weight: 700;">Diskusi dengan Coach TopCare AI</h4>
                    </div>
                    
                    <div id="coach-chat-history" style="height: 320px; background: #0B1120; border-radius: 16px; padding: 1.5rem; overflow-y: auto; margin-bottom: 1rem; border: 1px solid #1E293B; box-shadow: inset 0 2px 4px rgba(0,0,0,0.3);">
                        <div style="display: flex; align-items: flex-start; gap: 12px; margin-bottom: 16px;">
                            <img src="${COACH_IDENTITY.avatar}" style="width: 32px; height: 32px; border-radius: 50%; border: 2px solid #3B82F6;">
                            <div style="background: #1E293B; color: #F8FAFC; padding: 12px 16px; border-radius: 0 16px 16px 16px; max-width: 80%; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2); font-size: 0.95rem; line-height: 1.6; border: 1px solid #334155;">
                                Halo! Saya sudah membaca profil <strong>${dominant}</strong> Anda. Ketikkan sapaan, pertanyaan tentang modul, atau topik AI apa pun, dan kita diskusikan bersama!
                            </div>
                        </div>
                    </div>

                    <form id="coach-chat-form" style="display: flex; gap: 12px; background: #0F172A; padding: 8px; border-radius: 12px; border: 1px solid #334155;">
                        <input type="text" id="coach-chat-input" placeholder="Ketik pesan Anda di sini..." autocomplete="off" style="flex: 1; padding: 12px 16px; border-radius: 8px; border: none; background: transparent; color: white; font-size: 1rem; outline: none;">
                        <button type="submit" style="background: #3B82F6; color: white; border: none; padding: 0 24px; border-radius: 8px; font-weight: 600; font-size: 0.95rem; cursor: pointer; transition: background 0.2s;">Kirim</button>
                    </form>
                </div>
            </div>
        `;
    }
};

export default CoachRenderer;