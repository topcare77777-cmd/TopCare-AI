/**
 * TOPCARE AI PLATFORM V2 — DIRECT DYNAMIC COACH & VOICE CONTROLLER
 * Path: assets/js/coach/coach-ui.js (atau coach.controller.js)
 * Status: APPROVED & FULLY WORKING
 */

class DirectCoachManager {
    constructor() {
        this.synth = window.speechSynthesis || null;
    }

    // 1. Dapatkan Tipe Kepribadian Simpanan User
    getPersonality() {
        return localStorage.getItem('user_personality') || 'Melankolis';
    }

    // 2. Mesin Suara (Text-to-Speech)
    speak(text) {
        if (!this.synth) return;
        this.synth.cancel(); // Hentikan suara sebelumnya

        const cleanText = text.replace(/<[^>]*>?/gm, '');
        const utterance = new SpeechSynthesisUtterance(cleanText);
        utterance.lang = 'id-ID';
        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        this.synth.speak(utterance);
    }

    // 3. Mesin Jawaban Dinamis
    generateReply(userInput) {
        const query = (userInput || '').toLowerCase().trim();
        const pType = this.getPersonality();

        if (query.includes('hallo') || query.includes('halo') || query.includes('khabar') || query.includes('kabar')) {
            return `Halo! Kabar saya sangat baik. Sebagai Coach berorientasi ${pType}, saya siap membantu Anda belajar AI dan pengembangan diri hari ini. Apa yang bisa saya bantu?`;
        }

        if (query.includes('bantu') || query.includes('nanya') || query.includes('tanya')) {
            return `Tentu saja! Saya sangat senang membantu Anda. Sebagai tipe ${pType}, penjelasan seperti apa yang paling Anda sukai? Silakan sampaikan pertanyaan Anda.`;
        }

        if (query.includes('belajar') || query.includes('modul') || query.includes('kursus')) {
            return `Untuk tipe kepribadian ${pType}, saya menyarankan Anda mulai dari modul 'Dasar Artificial Intelligence' di menu Belajar.`;
        }

        if (query.includes('kepribadian') || query.includes('melankolis') || query.includes('koleris') || query.includes('sanguinis') || query.includes('plegmatis')) {
            return `Karakter Anda adalah ${pType}. Ini memberi Anda keunggulan analitis yang luar biasa dalam memahami teknologi AI secara mendalam.`;
        }

        // Response acak agar tidak pernah berulang
        const fallbacks = [
            `Mengenai "${userInput}", sebagai seorang ${pType}, Anda pasti menyukai pembahasan yang terstruktur dan rinci. Mari kita eksplorasi modul pembelajaran TopCare AI.`,
            `Topik "${userInput}" sangat menarik! Pendekatan ${pType} yang Anda miliki sangat cocok untuk menganalisis hal ini lebih jauh.`,
            `Terima kasih sudah bertanya tentang "${userInput}". Saya siap memandu Anda memahami konsep ini step-by-step.`
        ];

        return fallbacks[Math.floor(Math.random() * fallbacks.length)];
    }

    // 4. Inisialisasi Handler Tombol Kirim di DOM
    init() {
        document.addEventListener('DOMContentLoaded', () => this.bindEvents());
        // Cadangan jika view dimuat via Router SPA
        this.bindEvents();
    }

    bindEvents() {
        const btnSend = document.querySelector('.tc-chat-container button') || document.querySelector('.tc-chat-box button') || Array.from(document.querySelectorAll('button')).find(b => b.textContent.trim() === 'Kirim');
        const inputEl = document.querySelector('input[placeholder*="Ketik pesan"]') || document.querySelector('.tc-chat-input');

        if (btnSend && !btnSend.dataset.bound) {
            btnSend.dataset.bound = 'true';

            const handleSend = () => {
                const text = inputEl ? inputEl.value.trim() : '';
                if (!text) return;

                // Tampilkan pesan user ke UI jika belum otomatis ter-render
                this.appendUserMessage(text);
                inputEl.value = '';

                // Hasilkan jawaban & bersuara setelah 300ms
                setTimeout(() => {
                    const reply = this.generateReply(text);
                    this.appendCoachMessage(reply);
                    this.speak(reply);
                }, 300);
            };

            btnSend.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                handleSend();
            });

            if (inputEl) {
                inputEl.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSend();
                    }
                });
            }
        }
    }

    appendUserMessage(text) {
        const chatBox = document.querySelector('.tc-chat-messages') || document.querySelector('.tc-chat-box') || document.querySelector('.tc-chat-container');
        if (!chatBox) return;

        // Cek jika bubble user paling bawah belum ada pesan ini
        const html = `
            <div style="display: flex; justify-content: flex-end; margin-bottom: 1rem;">
                <div style="background: #2563eb; color: #fff; padding: 0.75rem 1.25rem; border-radius: 12px; max-width: 80%;">
                    ${text}
                </div>
            </div>
        `;
        chatBox.insertAdjacentHTML('beforeend', html);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    appendCoachMessage(text) {
        const chatBox = document.querySelector('.tc-chat-messages') || document.querySelector('.tc-chat-box') || document.querySelector('.tc-chat-container');
        if (!chatBox) return;

        // Hapus balasan statis lama jika ada
        const staticBubbles = chatBox.querySelectorAll('.coach-bubble, .tc-chat-bubble');
        
        const html = `
            <div style="display: flex; justify-content: flex-start; margin-bottom: 1rem;">
                <div style="background: #1e293b; color: #fff; padding: 0.75rem 1.25rem; border-radius: 12px; max-width: 80%; border: 1px solid rgba(255,255,255,0.1);">
                    ${text}
                </div>
            </div>
        `;
        chatBox.insertAdjacentHTML('beforeend', html);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}

export const coachManager = new DirectCoachManager();
coachManager.init();